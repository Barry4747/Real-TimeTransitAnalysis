import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.mongodb.client.MongoClients
import com.mongodb.client.model.Filters
import com.mongodb.client.model.ReplaceOptions
import io.github.cdimascio.dotenv.Dotenv
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.consumer.KafkaConsumer
import org.apache.kafka.common.serialization.StringDeserializer
import org.bson.Document
import java.time.Duration
import java.util.*

data class VehiclePosition(
    val city: String,
    val vehicle_id: String,
    val line: String,
    val lat: Double,
    val lon: Double,
    val timestamp: String
)

fun main() {
    val dotenv = Dotenv.load()

    val mongoUri = dotenv.get("MONGO_URI") ?: throw Exception("Brak MONGO_URI w .env")
    val dbName = dotenv.get("MONGO_DB_NAME") ?: "transit_db"
    val collectionName = dotenv.get("MONGO_COLLECTION") ?: "vehicles"
    val kafkaBroker = dotenv.get("KAFKA_BROKER") ?: "localhost:9092"
    val kafkaTopic = dotenv.get("KAFKA_TOPIC") ?: "raw-positions"
    val groupId = dotenv.get("KAFKA_GROUP_ID") ?: "transit-processor-group"

    val mongoClient = MongoClients.create(mongoUri)
    val database = mongoClient.getDatabase(dbName)
    val collection = database.getCollection(collectionName)

    val props = Properties()
    props[ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG] = kafkaBroker
    props[ConsumerConfig.GROUP_ID_CONFIG] = groupId
    props[ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG] = StringDeserializer::class.java.name
    props[ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG] = StringDeserializer::class.java.name
    props[ConsumerConfig.AUTO_OFFSET_RESET_CONFIG] = "earliest"

    val consumer = KafkaConsumer<String, String>(props)
    consumer.subscribe(listOf(kafkaTopic))

    val mapper = jacksonObjectMapper()

    println("Start Kotlina! Nasłuchuję na topicu: $kafkaTopic...")

    try {
        while (true) {
            val records = consumer.poll(Duration.ofMillis(1000))

            for (record in records) {
                try {
                    val position = mapper.readValue<VehiclePosition>(record.value())

                    val doc = Document()
                        .append("city", position.city)
                        .append("vehicle_id", position.vehicle_id)
                        .append("line", position.line)
                        .append("lat", position.lat)
                        .append("lon", position.lon)
                        .append("last_updated", position.timestamp)

                    val filter = Filters.and(
                        Filters.eq("vehicle_id", position.vehicle_id),
                        Filters.eq("city", position.city)
                    )

                    collection.replaceOne(filter, doc, ReplaceOptions().upsert(true))
                    println("Zapisano: ${position.city} - Linia ${position.line} (ID: ${position.vehicle_id})")

                } catch (e: Exception) {
                    println("Błąd parsowania: ${e.message}")
                }
            }
        }
    } finally {
        consumer.close()
        mongoClient.close()
    }
}
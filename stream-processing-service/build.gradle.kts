plugins {
    kotlin("jvm") version "2.1.10"
}

group = "org.example.barry"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    implementation("org.jetbrains.kotlin:kotlin-stdlib")

    // 1. Zmienione na kafka-clients (bo używamy zwykłego Consumera)
    implementation("org.apache.kafka:kafka-clients:3.7.0")

    // 2. Jackson do parsowania JSON-ów w Kotlinie
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.0")

    // 3. Synchroniczny sterownik MongoDB
    implementation("org.mongodb:mongodb-driver-sync:5.0.0")

    // 4. Brakująca biblioteka do czytania pliku .env!
    implementation("io.github.cdimascio:dotenv-java:3.0.0")

    // 5. SLF4J (prosty logger)
    implementation("org.slf4j:slf4j-simple:2.0.12")
}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(21)
}
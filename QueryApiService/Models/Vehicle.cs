using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace QueryApiService.Models;

public class Vehicle
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("city")]
    public string City { get; set; } = null!;

    [BsonElement("vehicle_id")]
    public string VehicleId { get; set; } = null!;

    [BsonElement("line")]
    public string Line { get; set; } = null!;

    [BsonElement("lat")]
    public double Lat { get; set; }

    [BsonElement("lon")]
    public double Lon { get; set; }

    [BsonElement("last_updated")]
    public string LastUpdated { get; set; } = null!;
}
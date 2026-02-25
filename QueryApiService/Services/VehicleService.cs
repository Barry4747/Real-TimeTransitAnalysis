using Microsoft.Extensions.Options;
using MongoDB.Driver;
using QueryApiService.Models;

namespace QueryApiService.Services;

public class VehicleService
{
    private readonly IMongoCollection<Vehicle> _vehiclesCollection;

    public VehicleService(IConfiguration configuration)
    {
        var mongoClient = new MongoClient(configuration["MongoDbSettings:ConnectionString"]);
        var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);
        _vehiclesCollection = mongoDatabase.GetCollection<Vehicle>(configuration["MongoDbSettings:CollectionName"]);
    }

    public async Task<List<Vehicle>> GetVehiclesByCityAsync(string city)
    {
        var tresholdTime = DateTime.Now.AddMinutes(-5).ToString("yyyy-MM-ddTHH:mm:ss");

        return await _vehiclesCollection
            .Find(x => x.City.ToLower() == city.ToLower() && x.LastUpdated.CompareTo(tresholdTime) >= 0)
            .ToListAsync();
    }
}
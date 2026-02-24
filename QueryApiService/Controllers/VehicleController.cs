using Microsoft.AspNetCore.Mvc;
using QueryApiService.Models;
using QueryApiService.Services;

namespace QueryApiService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiclesController : ControllerBase
{
    private readonly VehicleService _vehicleService;

    public VehiclesController(VehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }

    [HttpGet("{city}")]
    public async Task<ActionResult<List<Vehicle>>> Get(string city)
    {
        var vehicles = await _vehicleService.GetVehiclesByCityAsync(city);

        if (vehicles.Count == 0)
        {
            return NotFound(new { Message = $"No vehicles found for city: {city}" });
        }

        return Ok(vehicles);
    }
}
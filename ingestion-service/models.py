from dataclasses import dataclass, asdict
from datetime import datetime

@dataclass
class VehiclePosition:
    city: str
    vehicle_id: str
    line: str
    lat: float
    lon: float
    timestamp: str

    def to_dict(self):
        return asdict(self)
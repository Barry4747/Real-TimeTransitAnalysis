from abc import ABC, abstractmethod
from typing import List
from models import VehiclePosition

class CityProvider(ABC):
    @abstractmethod
    def fetch_data(self) -> List[VehiclePosition]:
        pass
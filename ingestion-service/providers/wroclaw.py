import requests
from datetime import datetime
from providers.base import CityProvider
from models import VehiclePosition

TRAM_LINES = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "14", "15", "16", "17", "20", "22", "23", "24", "31", "32", "33",
]

BUS_LINES = [
    "100", "101", "102", "103", "104", "105", "106", "107", "108", "109",
    "110", "111", "112", "113", "114", "115", "116", "118", "119",
    "120", "121", "122", "123", "124", "125", "126", "127", "128", "129",
    "130", "131", "132", "133", "134", "136", "140", "141", "142", "143",
    "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155",
    "200", "206", "240", "241", "242", "243", "244", "245", "246", "247",
    "248", "249", "250", "251", "253", "255", "257", "259",
    "319", "325", "331", "406", "602", "607", "609", "611",
    "700", "701", "702", "703", "704", "705", "707", "709",
    "714", "715", "722", "725", "742", "743", "749", "800", "809",
]


class WroclawProvider(CityProvider):
    def __init__(self):
        self.api_url = "https://mpk.wroc.pl/bus_position"

    def fetch_data(self) -> list[VehiclePosition]:
        try:
            params = []
            for line in BUS_LINES:
                params.append(("busList[bus][]", line))
            for line in TRAM_LINES:
                params.append(("busList[tram][]", line))

            response = requests.post(
                self.api_url,
                data=params,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                timeout=10,
            )
            data = response.json()

            standardized_data = []
            for item in data:
                pos = VehiclePosition(
                    city="Wroclaw",
                    vehicle_id=str(item.get("k", "unknown")),
                    line=str(item.get("name", "unknown")),
                    lat=float(item.get("x", 0.0)),
                    lon=float(item.get("y", 0.0)),
                    timestamp=datetime.now().isoformat(),
                )
                standardized_data.append(pos)
            return standardized_data
        except Exception as e:
            print(f"Błąd Wroclaw API: {e}")
            return []
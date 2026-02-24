import os
import time
import json
from dotenv import load_dotenv
from kafka import KafkaProducer
from providers.wroclaw import WroclawProvider

load_dotenv()

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9092")
KAFKA_TOPIC = os.getenv("KAFKA_TOPIC", "raw-positions")
FETCH_INTERVAL = int(os.getenv("FETCH_INTERVAL_SECONDS", 15))
ACTIVE_CITY = os.getenv("ACTIVE_CITY", "wroclaw").lower()

CITY_PROVIDERS = {
    "wroclaw": WroclawProvider
}

def get_provider():
    """Factory deciding which data provider to run"""
    if ACTIVE_CITY in CITY_PROVIDERS.keys():
        return CITY_PROVIDERS[ACTIVE_CITY]()
    else:
        raise ValueError(f"Unsupported city: {ACTIVE_CITY}")

def main():
    print(f"Start. City: {ACTIVE_CITY.upper()}. Connecting to Kafka...")
    
    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_BROKER],
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    
    provider = get_provider()
    print("Connected! Starting download...")

    while True:
        positions = provider.fetch_data()
        
        if positions:
            print(f"Downloaded {len(positions)} vehicles from {ACTIVE_CITY.upper()}. Sent to Kafka.")
            for pos in positions:
                producer.send(KAFKA_TOPIC, pos.to_dict())
            
            producer.flush()
        else:
            print("No data in this cycle.")

        time.sleep(FETCH_INTERVAL)

if __name__ == "__main__":
    main()
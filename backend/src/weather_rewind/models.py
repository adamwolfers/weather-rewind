from pydantic import BaseModel

class WeatherResponse(BaseModel):
    date: str
    latitude: float
    longitude: float
    temperature_high: float
    temperature_low: float
    conditions: str

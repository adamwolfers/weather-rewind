from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class WeatherResponse(BaseModel):
    date: str
    latitude: float
    longitude: float
    temperature_high: float
    temperature_low: float
    conditions: str

@router.get("/weather")
def get_weather() -> WeatherResponse:
    return WeatherResponse(
        date="2024-06-15",
        latitude=47.9,
        longitude=-122.7,
        temperature_high=72.0,
        temperature_low=58.0,
        conditions="Sunny",
    )

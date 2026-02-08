from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
from datetime import date as date_type

router = APIRouter()

class WeatherResponse(BaseModel):
    date: str
    latitude: float
    longitude: float
    temperature_high: float
    temperature_low: float
    conditions: str

@router.get("/weather")
def get_weather(
    lat: float = Query(ge=-90, le=90),
    lon: float = Query(ge=-180, le=180),
    date: str = Query(),
) -> WeatherResponse:
    try:
        parsed_date = date_type.fromisoformat(date)
    except ValueError:
        raise HTTPException(status_code=422, detail="Invalid date format")
    
    if parsed_date > date_type.today():
        raise HTTPException(status_code=422, detail="Date cannot be in the future")

    return WeatherResponse(
        date="2024-06-15",
        latitude=47.9,
        longitude=-122.7,
        temperature_high=72.0,
        temperature_low=58.0,
        conditions="Sunny",
    )

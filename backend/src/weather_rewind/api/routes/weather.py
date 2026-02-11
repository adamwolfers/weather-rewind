from fastapi import APIRouter, Query, HTTPException
from datetime import date as date_type
from weather_rewind.services.weather_service import fetch_weather
from weather_rewind.models import WeatherResponse

router = APIRouter()

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

    return fetch_weather(lat, lon, date)

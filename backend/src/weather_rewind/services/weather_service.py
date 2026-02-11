import httpx
from weather_rewind.models import WeatherResponse

WEATHER_CODES = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}

def fetch_weather(lat, lon, date):
    response = httpx.get(
        "https://archive-api.open-meteo.com/v1/archive",
        params={
            "latitude": lat,
            "longitude": lon,
            "start_date": date,
            "end_date": date,
            "daily": "temperature_2m_max,temperature_2m_min,weathercode",
        },
    )

    if response.status_code != 200:
        raise Exception("Open-Meteo API error")

    data = response.json()

    return WeatherResponse(
        date=data["daily"]["time"][0],
        latitude=data["latitude"],
        longitude=data["longitude"],
        temperature_high=data["daily"]["temperature_2m_max"][0],
        temperature_low=data["daily"]["temperature_2m_min"][0],
        conditions=WEATHER_CODES.get(data["daily"]["weathercode"][0], "Unknown")
    )

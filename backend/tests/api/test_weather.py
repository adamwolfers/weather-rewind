from unittest.mock import patch, Mock
from fastapi.testclient import TestClient
from weather_rewind.main import app
from weather_rewind.models import WeatherResponse

client = TestClient(app)

def test_weather_endpoint_returns_200():
    response = client.get("/api/weather?lat=47.9&lon=-122.7&date=2024-06-15")
    assert response.status_code == 200

def test_weather_endpoint_returns_expected_fields():
    response = client.get("/api/weather?lat=47.9&lon=-122.7&date=2024-06-15")
    data = response.json()
    assert "date" in data
    assert "latitude" in data
    assert "longitude" in data
    assert "temperature_high" in data
    assert "temperature_low" in data
    assert "conditions" in data

def test_weather_endpoint_returns_422_for_latitude_less_than_negative_90():
    response = client.get("/api/weather?lat=-100&lon=-122.7&date=2024-06-15")
    assert response.status_code == 422

def test_weather_endpoint_returns_422_for_longitude_less_than_negative_180():
    response = client.get("/api/weather?lat=47.9&lon=-200&date=2024-06-15")
    assert response.status_code == 422

def test_weather_endpoint_returns_422_for_invalid_date_format():
    response = client.get("/api/weather?lat=47.9&lon=-122.7&date=not-a-date")
    assert response.status_code == 422

def test_weather_endpoint_returns_422_for_future_date():
    response = client.get("/api/weather?lat=47.9&lon=-122.7&date=2099-01-01")
    assert response.status_code == 422

@patch("weather_rewind.api.routes.weather.fetch_weather")
def test_weather_endpoint_returns_data_from_service(mock_fetch_weather):
    mock_fetch_weather.return_value = WeatherResponse(
        date="2024-06-15",
        latitude=47.9,
        longitude=-122.7,
        temperature_high=22.5,
        temperature_low=14.2,
        conditions="Overcast",
    )

    response = client.get("/api/weather?lat=47.9&lon=-122.7&date=2024-06-15")
    data = response.json()

    assert data["temperature_high"] == 22.5
    assert data["conditions"] == "Overcast"

from fastapi.testclient import TestClient
from weather_rewind.main import app
import pytest

client = TestClient(app)

@pytest.mark.slow
def test_weather_endpoint_returns_real_weather_data():
    response = client.get("/api/weather?lat=47.8&lon=-122.5&date=2020-05-01")
    data = response.json()
    assert data["date"] == "2020-05-01"
    assert data["temperature_high"] == 17.2
    assert data["temperature_low"] == 7.5
    assert data["conditions"] == "Light drizzle"

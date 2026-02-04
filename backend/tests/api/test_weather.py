from fastapi.testclient import TestClient
from weather_rewind.main import app

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

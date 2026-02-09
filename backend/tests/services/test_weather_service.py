from unittest.mock import patch, Mock
from weather_rewind.services.weather_service import fetch_weather
import pytest

@patch("weather_rewind.services.weather_service.httpx.get")
def test_fetch_weather_returns_weather_data(mock_get):
    mock_get.return_value = Mock(
        status_code=200,
        json=lambda: {
            "latitude": 47.9,
            "longitude": -122.7,
            "daily": {
                "time": ["2024-06-15"],
                "temperature_2m_max": [22.5],
                "temperature_2m_min": [14.2],
                "weathercode": [3],
            }
        },
    )

    result = fetch_weather(47.9, -122.7, "2024-06-15")
    assert result.date == "2024-06-15"
    assert result.latitude == 47.9
    assert result.longitude == -122.7
    assert result.temperature_high == 22.5
    assert result.temperature_low == 14.2
    assert result.conditions == "Overcast"

@patch("weather_rewind.services.weather_service.httpx.get")
def test_fetch_weather_api_error(mock_get):
    mock_get.return_value = Mock(
        status_code=500
    )

    with pytest.raises(Exception):
        fetch_weather(47.9, -122.7, "2024-06-15")

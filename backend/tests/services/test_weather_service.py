from unittest.mock import patch, Mock
from weather_rewind.services.weather_service import fetch_weather
import pytest

@patch("weather_rewind.services.weather_service.httpx.get")
def test_fetch_weather_returns_weather_data(mock_get):
    mock_get.return_value = Mock(
        status_code=200,
        json=lambda: {
            "latitude": 55.1,
            "longitude": -153.4,
            "daily": {
                "time": ["2023-07-02"],
                "temperature_2m_max": [28.1],
                "temperature_2m_min": [15.3],
                "weathercode": [45],
            }
        },
    )

    result = fetch_weather(55.1, -153.4, "2023-07-02")
    assert result.date == "2023-07-02"
    assert result.latitude == 55.1
    assert result.longitude == -153.4
    assert result.temperature_high == 28.1
    assert result.temperature_low == 15.3
    assert result.conditions == "Fog"

@patch("weather_rewind.services.weather_service.httpx.get")
def test_fetch_weather_api_error(mock_get):
    mock_get.return_value = Mock(
        status_code=500
    )

    with pytest.raises(Exception):
        fetch_weather(47.9, -122.7, "2024-06-15")

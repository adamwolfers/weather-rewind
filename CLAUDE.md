# Weather Rewind

## Project Overview

A web app that displays historical weather data for any location and date.

**MVP Scope:** User enters location + past date → sees weather for that day. No accounts, no forecast comparison yet.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Vitest + React Testing Library |
| Backend | Python 3.12+, FastAPI, Pydantic, SQLAlchemy |
| Database | PostgreSQL |
| External API | Open-Meteo (historical weather + geocoding, free, no API key) |

## Development Approach

- **TDD:** Red → Green → Refactor on every feature
- **Thin vertical slices:** Each milestone delivers working functionality through all layers
- **Commit hygiene:** Small, frequent commits after each GREEN state using conventional commits (`feat:`, `test:`, `fix:`, `refactor:`, `docs:`)

## Coding Collaboration

- Adam writes all code
- Claude assists when stuck, for design discussions, or code review
- Emphasis on learning through doing rather than generating code

## Current Status

Planning complete. Starting Slice 0 (project setup).

## Key Files

- `weather-rewind-plan.md` - Detailed project plan with incremental milestones and checklists

## Slice Overview

0. Project setup (repos, scaffolding, local database)
1. Hardcoded weather endpoint (first vertical slice through all layers)
2. Location and date input (user interaction)
3. Real weather data from Open-Meteo + first deploy
4. Database caching layer
5. Location search by name (geocoding)
6. Polish and portfolio-ready

## API Endpoints (Planned)

- `GET /api/weather?lat={lat}&lon={lon}&date={date}` - Fetch historical weather
- `GET /api/geocode?q={query}` - Search locations by name

## Domain Models (Planned)

**WeatherResponse:**
- date: str
- latitude: float
- longitude: float
- temperature_high: float
- temperature_low: float
- conditions: str

## External Resources

- [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vitest Documentation](https://vitest.dev/)

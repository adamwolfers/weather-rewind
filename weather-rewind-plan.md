# Weather Rewind: TDD Project Plan

**MVP Scope:** User enters a location and past date → sees weather for that day.

## Guiding Principles

1. **Thin vertical slices**: Each milestone delivers working functionality through all layers (test → backend → frontend → integration).
2. **TDD rhythm**: Red (write failing test) → Green (minimal code to pass) → Refactor.
3. **Deploy early**: Get a live URL by end of Slice 3, iterate in production.
4. **YAGNI**: Resist building infrastructure you don't need yet.

---

## Decisions
- Use MIT license
- Monorepo structure
- Trunk-based workflow (branch strategy)

---

## Slice 0: Project Setup
*Time estimate: 2-3 hours*

### 0.1 Repository Setup
- [x] Create GitHub repo `weather-rewind`
- [x] Initialize with README, .gitignore (Python + Node), MIT license
- [x] Decide on structure: monorepo with `/backend` and `/frontend` directories
- [x] Create initial branch strategy (main + feature branches)

### 0.2 Backend Scaffold
- [x] Create `/backend` directory
- [x] Set up Python virtual environment
- [x] Create `pyproject.toml` with dependencies: fastapi, uvicorn, pytest, httpx, pydantic
- [x] Create directory structure:
    ```
    backend/
    ├── src/
    │   └── weather_rewind/
    │       ├── __init__.py
    │       ├── main.py
    │       └── api/
    │           └── __init__.py
    ├── tests/
    │   └── __init__.py
    └── pyproject.toml
    ```
- [x] Verify: `pytest` runs (0 tests collected, no errors)
- [x] Verify: `uvicorn weather_rewind.main:app --reload` starts (can 404, that's fine)

### 0.3 Frontend Scaffold
- [x] Create Vite project: `npm create vite@latest frontend -- --template react-ts`
- [x] Install Tailwind CSS and configure
- [x] Install Vitest + React Testing Library + jsdom
- [x] Create a dummy `App.test.tsx` that passes
- [x] Verify: `npm run dev` shows default page
- [x] Verify: `npm test` passes

### 0.4 Local Database
- [x] Install PostgreSQL locally (or use Docker)
- [x] Create database: `weather_rewind_dev`
- [x] Create test database: `weather_rewind_test`
- [x] Verify: can connect via `psql`

**✓ Slice 0 Complete When:** Both apps run locally, tests pass (even if trivial), Postgres accessible.

---

## Slice 1: Hardcoded Weather Endpoint
*Time estimate: 3-4 hours*

The thinnest possible vertical slice: a backend endpoint that returns fake weather data, connected to a frontend that displays it.

### 1.1 Backend: Failing Test First
- [ ] Create `tests/api/test_weather.py`
- [ ] Write test: `GET /api/weather?lat=47.9&lon=-122.7&date=2024-06-15` returns 200
- [ ] Write test: response JSON contains expected fields (temperature, conditions, date, location)
- [ ] Run tests, confirm RED (404 or not implemented)

### 1.2 Backend: Make It Green
- [ ] Create `api/routes/weather.py` with router
- [ ] Define Pydantic response model: `WeatherResponse`
    - date: str
    - latitude: float
    - longitude: float  
    - temperature_high: float
    - temperature_low: float
    - conditions: str
- [ ] Implement `GET /api/weather` that returns hardcoded `WeatherResponse`
- [ ] Register router in `main.py`
- [ ] Run tests, confirm GREEN

### 1.3 Backend: Refactor
- [ ] Review code for clarity
- [ ] Add type hints if missing
- [ ] Extract constants if needed
- [ ] Tests still GREEN

### 1.4 Frontend: Failing Test First
- [ ] Create `src/components/WeatherDisplay.test.tsx`
- [ ] Write test: component renders temperature when given weather data
- [ ] Write test: component renders conditions
- [ ] Run tests, confirm RED

### 1.5 Frontend: Make It Green
- [ ] Define TypeScript interface `WeatherData` matching backend response
- [ ] Create `WeatherDisplay.tsx` component
- [ ] Accept `WeatherData` as prop, render temperature and conditions
- [ ] Style minimally with Tailwind (card with padding, readable text)
- [ ] Run tests, confirm GREEN

### 1.6 Frontend: Integration
- [ ] Create `src/api/weather.ts` with `fetchWeather(lat, lon, date)` function
- [ ] Update `App.tsx` to:
    - Call `fetchWeather` on mount with hardcoded values
    - Pass result to `WeatherDisplay`
- [ ] Configure Vite proxy to forward `/api` to backend
- [ ] Manual test: start both servers, see hardcoded weather in browser

**✓ Slice 1 Complete When:** Browser shows hardcoded weather data fetched from your backend.

---

## Slice 2: Location and Date Input
*Time estimate: 4-5 hours*

User can enter coordinates and a date; UI updates accordingly.

### 2.1 Frontend: Date Picker (TDD)
- [ ] Test: DatePicker calls onChange with selected date
- [ ] Test: DatePicker disables future dates
- [ ] Implement `DatePicker.tsx` (native HTML date input is fine for MVP)
- [ ] Tests GREEN

### 2.2 Frontend: Location Input (TDD)
- [ ] Test: LocationInput calls onChange with lat/lon values
- [ ] Test: LocationInput shows validation error for invalid coordinates
- [ ] Implement `LocationInput.tsx` (two number inputs for lat/lon for now)
- [ ] Tests GREEN

### 2.3 Frontend: Wire Up the Form
- [ ] Test: App fetches new weather when user submits location + date
- [ ] Update `App.tsx`:
    - Add state for lat, lon, date
    - Add form with LocationInput, DatePicker, Submit button
    - Fetch weather on submit
- [ ] Tests GREEN

### 2.4 Backend: Validate Query Params (TDD)
- [ ] Test: invalid latitude (out of range) returns 422
- [ ] Test: invalid date format returns 422  
- [ ] Test: future date returns 422
- [ ] Add Pydantic validation to query parameters
- [ ] Tests GREEN

### 2.5 End-to-End Manual Test
- [ ] Enter different coordinates and dates
- [ ] Verify validation errors appear appropriately
- [ ] Verify weather display updates (still hardcoded data, but flow works)

**✓ Slice 2 Complete When:** User can input any valid lat/lon + past date, form validates, UI responds.

---

## Slice 3: Real Weather Data
*Time estimate: 4-5 hours*

Replace hardcoded data with real historical weather from Open-Meteo.

### 3.1 Backend: Weather Service (TDD)
- [ ] Create `services/weather_service.py`
- [ ] Test: `fetch_weather(lat, lon, date)` returns WeatherData for valid input
- [ ] Test: service handles Open-Meteo API error gracefully
- [ ] Implement service using `httpx` to call Open-Meteo
- [ ] Tests GREEN (use mocking/fixtures for external API)

### 3.2 Backend: Integrate Service into Endpoint
- [ ] Update `/api/weather` to use `weather_service`
- [ ] Update existing endpoint tests (mock the service)
- [ ] Add integration test that hits real Open-Meteo (mark as slow/optional)
- [ ] Tests GREEN

### 3.3 Frontend: Loading and Error States (TDD)
- [ ] Test: WeatherDisplay shows loading spinner when `isLoading=true`
- [ ] Test: WeatherDisplay shows error message when `error` prop set
- [ ] Implement loading and error states in component
- [ ] Update App to track loading/error state during fetch
- [ ] Tests GREEN

### 3.4 Deploy MVP (First Deploy!)
- [ ] Create `Dockerfile` for backend
- [ ] Deploy backend to Railway or Fly.io
- [ ] Deploy frontend to Vercel or Cloudflare Pages
- [ ] Configure frontend env var for API URL
- [ ] Verify: live URL works end-to-end

**✓ Slice 3 Complete When:** Live URL shows real historical weather for any location/date.

---

## Slice 4: Database Caching
*Time estimate: 4-5 hours*

Cache weather responses to reduce API calls and improve performance.

### 4.1 Backend: Database Models
- [ ] Add SQLAlchemy or raw SQL approach (your choice)
- [ ] Design `weather_cache` table:
    - id, latitude, longitude, date, response_json, created_at
    - Unique constraint on (latitude, longitude, date)
- [ ] Create migration script
- [ ] Run migration on dev database

### 4.2 Backend: Cache Repository (TDD)
- [ ] Create `repositories/weather_cache.py`
- [ ] Test: `get_cached(lat, lon, date)` returns None for cache miss
- [ ] Test: `get_cached(lat, lon, date)` returns data for cache hit
- [ ] Test: `save(lat, lon, date, data)` persists correctly
- [ ] Implement repository
- [ ] Tests GREEN (use test database)

### 4.3 Backend: Integrate Caching into Service
- [ ] Test: cache hit skips external API call
- [ ] Test: cache miss calls external API and saves result
- [ ] Update `weather_service` to check cache first
- [ ] Tests GREEN

### 4.4 Deploy and Verify
- [ ] Set up production PostgreSQL (Supabase, Railway, or Neon)
- [ ] Run migrations on prod
- [ ] Deploy updated backend
- [ ] Verify: first request is slower, subsequent requests are fast

**✓ Slice 4 Complete When:** Repeated queries for same location/date are served from cache.

---

## Slice 5: Location Search by Name
*Time estimate: 3-4 hours*

Replace lat/lon inputs with city name search.

### 5.1 Backend: Geocoding Endpoint (TDD)
- [ ] Test: `GET /api/geocode?q=Seattle` returns lat/lon and display name
- [ ] Test: no results returns empty array
- [ ] Implement using Open-Meteo Geocoding API (free, no key)
- [ ] Tests GREEN

### 5.2 Frontend: Location Autocomplete (TDD)
- [ ] Test: typing in location input calls geocode API (debounced)
- [ ] Test: selecting a result populates lat/lon state
- [ ] Replace coordinate inputs with searchable location input
- [ ] Style dropdown results with Tailwind
- [ ] Tests GREEN

### 5.3 End-to-End Flow
- [ ] Manual test: search "Port Ludlow, WA", select, pick date, see weather
- [ ] Deploy and verify in production

**✓ Slice 5 Complete When:** User searches by city name instead of coordinates.

---

## Slice 6: Polish and Portfolio-Ready
*Time estimate: 3-4 hours*

### 6.1 Visual Polish
- [ ] Add weather condition icons (use Lucide or similar)
- [ ] Improve typography and spacing
- [ ] Add subtle hover/transition effects
- [ ] Responsive design check (mobile, tablet, desktop)

### 6.2 UX Enhancements
- [ ] "Random date" button for fun exploration
- [ ] Shareable URL with location/date in query params
- [ ] Keyboard navigation support

### 6.3 Documentation
- [ ] Write comprehensive README:
    - Project overview and screenshots
    - Architecture diagram
    - Local development setup
    - Tech choices and rationale
    - Future roadmap (forecast comparison, mobile app)
- [ ] Add inline code comments where logic is complex
- [ ] Record a 2-minute demo video (optional but impressive)

### 6.4 Final Review
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Lighthouse audit: aim for 90+ on Performance, Accessibility
- [ ] Test on multiple browsers

**✓ Slice 6 Complete When:** You'd be proud to show this in an interview.

---

## Future Slices (Post-MVP)

These are deliberately out of scope for the 4-week MVP but documented for future work:

- **Slice 7:** Forecast vs. Actual comparison
- **Slice 8:** User accounts and saved locations
- **Slice 9:** AWS migration with Terraform (IaC learning)
- **Slice 10:** Mobile app with React Native
- **Slice 11:** CI/CD pipeline with GitHub Actions

---

## Quick Reference: TDD Rhythm

```
1. RED    - Write a failing test that defines what you want
2. GREEN  - Write the minimum code to make it pass
3. REFACTOR - Clean up while keeping tests green
4. COMMIT - Small, frequent commits with clear messages
```

## Quick Reference: Commit Hygiene

- Commit after each GREEN state
- Use conventional commits: `feat:`, `test:`, `fix:`, `refactor:`, `docs:`
- Example: `test: add weather endpoint returns 200`
- Example: `feat: implement weather endpoint with hardcoded response`

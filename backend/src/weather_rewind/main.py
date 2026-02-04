from fastapi import FastAPI
from weather_rewind.api.routes.weather import router as weather_router

app = FastAPI()

app.include_router(weather_router, prefix="/api")

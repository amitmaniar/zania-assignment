# settings.py
from starlette.config import Config
from databases import DatabaseURL

config = Config(".env")

DATABASE_URL = config(
    "DATABASE_URL", cast=DatabaseURL, default="sqlite:///zania.db"
)

DEBUG = config("DEBUG", cast=bool, default=False)

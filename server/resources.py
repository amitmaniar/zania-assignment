# resources.py

import sqlalchemy

from databases import Database
from . import settings

database = Database(settings.DATABASE_URL)

metadata = sqlalchemy.MetaData()

records = sqlalchemy.Table(
    "records",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("position", sqlalchemy.Integer),
)

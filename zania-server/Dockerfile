# Build stage
FROM python:3.13.0-alpine

# Set working directory
WORKDIR /zania-server

# Copy project files
COPY . ./server/

RUN apt update

RUN apt install sqlite3

RUN pip install starlette uvicorn databases sqlalchemy aiosqlite webargs-starlette

RUN sh ./server/init_database.sh

# Copy environment file
COPY .env .

EXPOSE 8000

CMD ["uvicorn", "server.app:app", "--host", "0.0.0.0", "--port", "8000"]
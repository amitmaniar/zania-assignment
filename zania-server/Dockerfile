# Build stage
FROM python:3.13.0-alpine

# Set working directory
WORKDIR /zania-server

# Copy project files
COPY . ./server/

RUN apk update && apk upgrade

# Installing sqlite
RUN apk add --no-cache sqlite

# Installing required packages for python
RUN pip install starlette uvicorn databases sqlalchemy aiosqlite webargs-starlette

# Initializing DB with default records
RUN sh ./server/init_database.sh

# Copy environment file
COPY .env .

EXPOSE 8000

CMD ["uvicorn", "server.app:app", "--host", "0.0.0.0", "--port", "8000"]
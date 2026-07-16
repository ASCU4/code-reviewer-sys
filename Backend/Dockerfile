FROM python:3.12-slim

# Install git
RUN apt-get update && apt-get install -y git \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY require.txt .

RUN pip install --no-cache-dir -r require.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
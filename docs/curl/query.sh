#!/bin/bash

curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "text": "How to connect a DHT sensor to ESP32?"
  }'

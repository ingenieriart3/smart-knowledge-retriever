#!/bin/bash

curl -X POST http://localhost:3000/api/embed \
  -H "Content-Type: application/json" \
  -d '{
    "id": "note-test-curl",
    "text": "This is a test note to validate the embed API from cURL.",
    "metadata": {
      "title": "Test Note via cURL",
      "tags": ["test", "curl"],
      "source": "manual",
      "created_at": "2025-07-29T18:00:00Z"
    }
  }'

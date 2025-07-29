# #!/bin/bash

# echo "🧠 Starting Smart Knowledge Retriever (dev mode)..."

# cp .env.example .env 2>/dev/null

# docker compose up --build

#!/bin/bash

set -e

echo "🧠 Smart Knowledge Retriever – Dev Mode"

case "$1" in
  backend)
    echo "🔁 Rebuilding backend only..."
    docker compose build backend
    docker compose up backend -d
    ;;

  app)
    echo "🔁 Rebuilding frontend-react (app)..."
    docker compose build frontend-react
    docker compose up frontend-react -d
    ;;

  landing)
    echo "🔁 Rebuilding frontend-svelte (landing)..."
    docker compose build frontend-svelte
    docker compose up frontend-svelte -d
    ;;

  clean)
    echo "🧹 Stopping and removing containers..."
    docker compose down -v
    ;;

  *)
    echo "🚀 Building and starting full stack..."
    docker compose up --build -d
    ;;
esac

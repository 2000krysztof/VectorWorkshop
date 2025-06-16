curl -X POST \
  http://localhost:3000/api/embedding/embed \
  -H 'Content-Type: application/json' \
  -d '{ "prompt": "This is a test sentence for embedding in the correct route." }'

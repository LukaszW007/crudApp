# CRUD operations
---

## Read notes
`$ curl -i http://localhost:3000/notes/`

## Create new note
`$ curl -i -d '{"text":"nowa notatka"}' -H "Content-Type: application/json" -X POST http://localhost:3000/notes`

## Read selected note
`$ curl -i http://localhost:3000/notes/{id}`

## Update note
`$ curl -i -d '{"text":"whoaaa!"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/notes/{id}`

## Delete note
`$ curl -i -X DELETE http://localhost:3000/notes/{id}`

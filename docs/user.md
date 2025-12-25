# User API Spec

## Register User API

Endpoint : POST/api/users

Request Body : 

```json
{
  "username" : "Dokja",
  "password" : "kingofkinglessworld",
  "name" : "Kim Dokja"
}
```

Response Body Success :
```json
{
  "data" : {
    "username" : "Dokja",
    "name" : "Kim Dokja"
  }
}
```

Response Body Error :
```json
{
  "errors" : "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :
```json
{
  "username" : "Dokja",
  "password" : "kingofkinglessworld"
}
```
Response Body Success :
```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```
Response Body Error :
```json
{
  "errors" : "Username or password wrong",
}
```
## Update User API

Endpoint : PATCH /api/users/current

Headers :

Authorization : TOKEN

Request Body :
```json
{
  "name" : "Kim Dokja", // optional
  "password" : "kingofkinglessworld" // optional
}
```
Response Body Success :
```json
{
  "data" : {
    "username" : "Dokja",
    "name" : "kingofkinglessworld"
  }
}
```
Response Body Error :
```json
{
  "errors" : "Name length max 100"
}
```

## Get User API
Endpoint : GET /api/users/current

Headers :

Authorization : TOKEN

Response Body Success:
```JSON
{
  "data" : {
    "username" : "Dokja",
    "name" : "Kim Dokja"
  }
}
```
Response Body Error :
```json
{
  "errors" : "Unauthorized"
}
```
## Logout User API
Endpoint : DELETE /api/users/logout

Headers :

Authorization : TOKEN

Response Body Success :
```json
{
  "data" : "OK"
}
```
Response Body Error :
```json
{
  "errors" : "Unauthorized"
}
```
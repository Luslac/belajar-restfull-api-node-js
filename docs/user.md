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

## Login User With Google API
Autentikasi menggunakan Google OAuth 2.0. Flow terdiri dari 3 tahap:
1. Initiate login → redirect ke Google.
2. Google callback → dapat JWT token.
3. Get user data menggunakan token.


A. Initiate Google Login


Endpoint: GET /api/users/auth/google

Request Body: None (Kosong)

Response:

- Status Code: 302 Found (Redirect)

- Action: Browser akan diarahkan otomatis ke accounts.google.com.

B. Google Callback (System Only)

Endpoint: GET /api/users/auth/google/callback

Response:

- Status Code: 302 Found (Redirect)

- Redirect Target: http://localhost:5000/api/users/current?token={JWT_TOKEN} 
- Ambil Token dari query 'token'


C. Get Current User 

Endpoint: GET /api/users/current

Header:

Authorization:
Bearer <token_dari_step_sebelumnya>

Response Body (JSON):
```json
{
  "data": {
    "username": "google_budi123",
    "name": "Budi Santoso"
  }
}
```
Error Responses:

401 Unauthorized (No token):
```json
{
  "errors": "Unauthorized"
}
```

401 Unauthorized (Invalid/expired token):
```json
{
  "errors": "Unauthorized"
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
  "data" : "OK",
  "details": {
    "username"
    "name"
  }
}
```
Response Body Error :
```json
{
  "errors" : "Unauthorized"
}
```
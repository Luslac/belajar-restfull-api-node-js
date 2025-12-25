# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Request Body :
```json
{
  "street" : "Shadow Dungeon Floor 100",
  "city" : "Seoul",
  "province" : "Seoul Special City",
  "country" : "South Korea",
  "postal_code" : "06000"
}
```

Response Body Success :
```json
{
  "data" : {
    "id" : 1,
    "street" : "Shadow Dungeon Floor 100",
    "city" : "Seoul",
    "province" : "Seoul Special City",
    "country" : "South Korea",
    "postal_code" : "06000"
  }
}
```

Response Body Error :
```json
{
  "errors" : "Country is required" 
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body :
```json
{
  "street" : "Henituse Territory Main Castle",
  "city" : "Puzzle City",
  "province" : "Roan Kingdom",
  "country" : "Western Continent",
  "postal_code" : "10001"
}
```

Response Body Success :
```json
{
  "data" : {
    "id" : 1,
    "street" : "Henituse Territory Main Castle",
    "city" : "Puzzle City",
    "province" : "Roan Kingdom",
    "country" : "Western Continent",
    "postal_code" : "10001"
  }
}
```

Response Body Error :
```json
{
  "errors" : "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Response Body Success :
```json
{
  "data" : {
    "id" : 1,
    "street" : "Xyrus Academy Dormitory Block A",
    "city" : "Xyrus",
    "province" : "Sapin Kingdom",
    "country" : "Dicathen",
    "postal_code" : "50001"
  }
}
```

Response Body Error :
```json
{
  "errors" : "contact is not found"
}
```

## List Addresses API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Response Body Success :
```json 
{
  "data" : [
    {
      "id" : 1,
      "street" : "Shadow Dungeon Floor 100",
      "city" : "Seoul",
      "province" : "Seoul Special City",
      "country" : "South Korea",
      "postal_code" : "06000"
    },
    {
      "id" : 2,
      "street" : "Hunters Guild Association HQ",
      "city" : "Seoul",
      "province" : "Seoul Special City",
      "country" : "South Korea",
      "postal_code" : "04500"
    },
    {
      "id" : 3,
      "street" : "Jeju Island S-Rank Gate",
      "city" : "Jeju",
      "province" : "Jeju Special Self-Governing",
      "country" : "South Korea",
      "postal_code" : "63000"
    }
  ]
}
```

Response Body Error :
```json
{
  "errors" : "contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Response Body Success :
```json
{
  "data" : "OK"
}
```

Response Body Error :
```json
{
  "errors" : "address is not found"
}
```
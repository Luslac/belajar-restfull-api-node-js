# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers : 
- Authorization : token

Request Body :
```json
{
  "first_name" : "Sung",
  "last_name" : "Jinwoo",
  "email" : "shadow.monarch@hunter.com",
  "phone" : "08123456789"
}
```

Response Body Success : 
```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Sung",
    "last_name" : "Jinwoo",
    "email" : "shadow.monarch@hunter.com",
    "phone" : "08123456789"
  }
}
```

Response Body Error :
```json
{
  "errors" : "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :
- Authorization : token

Request Body :
```json
{
  "first_name" : "Kim",
  "last_name" : "Dokja",
  "email" : "omniscient.reader@scenario.com",
  "phone" : "08198765432"
}
```

Response Body Success :
```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Kim",
    "last_name" : "Dokja",
    "email" : "omniscient.reader@scenario.com",
    "phone" : "08198765432"
  }
}
```

Response Body Error :
```json
{
  "errors" : "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :
- Authorization : token

Response Body Success :
```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Cale",
    "last_name" : "Henituse",
    "email" : "trash.noble@roan.com",
    "phone" : "08111222333"
  }
}
```

Response Body Error :
```json
{
  "errors" : "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :
- Authorization : token

Query params :
- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :
```json
{
  "data" : [
    {
      "id" : 1,
      "first_name" : "Sung",
      "last_name" : "Jinwoo",
      "email" : "shadow@hunter.com",
      "phone" : "08123456789"
    },
    {
      "id" : 2,
      "first_name" : "Kim",
      "last_name" : "Dokja",
      "email" : "omniscient@scenario.com",
      "phone" : "08198765432"
    },
    {
      "id" : 3,
      "first_name" : "Cale",
      "last_name" : "Henituse",
      "email" : "trash@roan.com",
      "phone" : "08111222333"
    },
    {
      "id" : 4,
      "first_name" : "Arthur",
      "last_name" : "Leywin",
      "email" : "grey@dicathen.com",
      "phone" : "08155566677"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

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
  "errors" : "Contact is not found"
}
```
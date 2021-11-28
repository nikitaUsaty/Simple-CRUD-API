# Simple-CRUD-API

## Run Server

```bash
 npm i
 npm run start:dev
```

Server should start on port 5050

**http://localhost:5050/person**

## How It Works

- **GET** **http://localhost:5050/person** or **http://localhost:5050/person/${personId}** should return status code 200 and all persons(or an empty array if threre are no persons)
- **GET** **http://localhost:5050/person/${personId}**
  should return status code 200 person with corresponding personId
  should return status code 400 with error message if personId is invalid (or not uuid)
  should return status code 404 with error message if if there's no person with corresponding personId

- **POST** **http://localhost:5050** should return status code 200 and create a record about new person and store it in database (fields name, age and hobbies are \*\*required\*\*)
  if there're no required fields server should return status code 400 and corresponding message

- **PUT** **http://localhost:5050/person/${personId}** should update record about existing person and return status code 200
  should return status code 400 with error message if personId is invalid (or not uuid)
  should return status code 404 with error message if if there's no person with corresponding personId

- **DELETE** **http://localhost:5050/person/${personId}** should delete record about existing person from database
  should return status code 400 with error message if personId is invalid (or not uuid)
  should return status code 404 with error message if if there's no person with corresponding personId

## Run Tests

```bash
npm run test
```

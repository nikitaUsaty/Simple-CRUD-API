# simple-crud-api

## run server

1. npm i
2. npm run start:dev
3. server should run on port 3000

## how it works

- **GET** /users or /users/${personId} should return status code 200 and all persons(or an empty array if threre are no persons)
- **GET** /users/${personId}
  should return status code 200 users with corresponding personId
  should return status code 400 with error message if personId is invalid (or not uuid)
  should return status code 404 with error message if if there's no users with corresponding personId

- **POST** /users should return status code 200 and create a record about new users and store it in database (fields name, age and hobbies are **required**)
  if there're no required fields server should return status code 400 and corresponding message

- **PUT** /users/${personId} should update record about existing users and return status code 200
  should return status code 400 with error message if personId is invalid (or not uuid)
  should return status code 404 with error message if if there's no users with corresponding personId

- **DELETE** /users/${personId} should delete record about existing users from database
  should return status code 400 with error message if personId is invalid (or not uuid)
  should return status code 404 with error message if if there's no users with corresponding personId

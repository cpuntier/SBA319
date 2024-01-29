# SBA 319 MongoDB Database Application

### In this assignment I was able to :
- Create a server application with Node, Express, and MongoDB.
- Create a CRUD API using Express and MongoDB.
- Create MongoDB indexes.
- Use MongoDB indexing to make efficient queries.
- Create MongoDB validation rules.
- Use MongoDB validation to ensure data consistency.

---
Below I will detail the api's available routes and their corresponding CRUD operations

### /characters 
- lists all characters in the db via GET request.
- allows for adding new characters via POST request.

### /characters/:name
- lists all characters with that name.Names are case sensitive via GET request
- allows for deletion of character with this specific name via DELETE request
- allows for updating of character with this specific name via PATCH request

### /characters/test
- used solely for displaying functionality of the validator
- making a post request to this will throw an error attempting to add a document into the db that fails validation

### /comments
- lists all comments in the db via GET request.
- allows for adding new comments via POST request.

### /comments/:id
- lists  comment with that id via GET request
- allows for deletion of comment with this specific id via DELETE request
- allows for updating of comment  with this specific id via PATCH request

### /users 
- lists all users in the db via GET request.
- allows for adding new users via POST request.

### /users/:id
- lists  user with that id via GET request
- allows for deletion of user with this specific id via DELETE request
- allows for updating of user  with this specific id via PATCH request

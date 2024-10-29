# API Documentation

## Admins

### Admin Login

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/login`
- **Content-Type**: `application/json`

#### HTTP Request Example:

POST /api/v1/admin/login HTTP/1.1
Host: api.yourdomain.com
Content-Type: application/json

{
    "email": "admin@gmail.com",
    "password": "admin"
}



#### Expected HTTP Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMjAyMTc2LCJleHAiOjE3MzAyODg1NzZ9.5W35AWcg1vFqraaMaS-Q95xwd326rWbms2jZQEroCNk",
    "success": true
}




### Explanation of the Request and Response

- **Request Body**: JSON payload containing `email` and `password`.

- **Response**: JSON object with a success message, an authentication token, and a success status.

### Create Admin

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/create`
- **Authorization**: Bearer token required

#### HTTP Request Example:
POST /api/v1/admin/create HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMjAzMDA0LCJleHAiOjE3MzAyODk0MDR9.pu9tZZrNmp8dppM1tvPe0sc0ac-gtzgX3-vGZRow7c8 Content-Type: application/json

{ "email": "admin2@gmail.com", "name": "admin2" }


#### Expected HTTP Response:

HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Credentials are sent to your employee mail kindly check", "success": true }
### Explanation of the Request and Response

- **Request Body**: JSON payload containing `email` and `name`.

- **Response**: JSON object with a success message indicating that credentials have been sent to the specified email and a success status.

### Forgot Password

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/forgot-password`

#### HTTP Request Example:

POST /api/v1/admin/forgot-password HTTP/1.1 Host: api.yourdomain.com Content-Type: application/json

{ "email": "admin@gmail.com" }

#### Expected HTTP Response:

HTTP/1.1 200 OK Content-Type: application/json

{ "message": "New password sent to your email", "success": true }

### Explanation of the Request and Response

- **Request Body**: JSON payload containing `email`.

- **Response**: JSON object with a success message indicating that a new password has been sent to the specified email and a success status.

### Reset Password

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/reset-password`
- **Authorization**: Bearer token required

#### HTTP Request Example:

POST /api/v1/admin/reset-password HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer <your_token_here> Content-Type: application/json

{ "email": "admin@gmail.com", "newPassword": "admin" }

#### Expected HTTP Response:

HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Password updated successfully", "success": true }

### Explanation of the Request and Response

- **Request Body**: JSON payload containing:
  - `email`: The email of the admin whose password needs to be reset.
  - `newPassword`: The new password to set.

- **Response**: JSON object with a success message indicating that the password has been updated successfully and a success status.


### Fetch Approval Requests

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/admin/approve-charity-requests`
- **Authorization**: Bearer token required

#### HTTP Request Example:

GET /api/v1/admin/approve-charity-requests HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer <your_token_here>

#### Expected HTTP Response:

HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Charities waiting for approval", "approval": [ { "id": 1, "charityId": 1, "status": "pending", "comments": null, "createdAt": "2024-10-29T09:52:39.000Z", "updatedAt": "2024-10-29T09:52:39.000Z" } ] }

### Explanation of the Request and Response

- **Response**: JSON object containing:
  - `message`: A message indicating the request's outcome.
  - `approval`: An array of charity requests awaiting approval, where each charity request includes:
    - `id`: The ID of the request.
    - `charityId`: The ID of the charity.
    - `status`: The current status of the request (e.g., "pending").
    - `comments`: Any comments associated with the request (can be `null`).
    - `createdAt`: The timestamp when the request was created.
    - `updatedAt`: The timestamp when the request was last updated.


### Approve or Reject Charity

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/approveRejectCharity`
- **Authorization**: Bearer token required

#### HTTP Request Example:

POST /api/v1/admin/approveRejectCharity HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer <your_token_here> Content-Type: application/json

{ "status": "approved" }


#### Expected HTTP Response:
HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Charity approved successfully", "charity": { "id": 1, "name": "Charity1", "description": "charity for children", "email": "charity1@gmail.com", "password": "$2b$10$kzqzymY5/kediuFd.fsP0u/EPwv1OaueciJmlufmtn6KX3xEnUIzy", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025", "category": null, "location": null, "isApproved": true, "createdAt": "2024-10-29T09:52:38.000Z", "updatedAt": "2024-10-29T09:53:11.735Z" } }

### Explanation of the Request and Response

- **Request Body**: JSON payload containing:
  - `status`: The new status for the charity, either "approved" or "rejected".

- **Response**: JSON object containing:
  - `message`: A message indicating the outcome of the operation (e.g., "Charity approved successfully").
  - `charity`: An object containing details about the charity, including:
    - `id`: The ID of the charity.
    - `name`: The name of the charity.
    - `description`: A brief description of the charity.
    - `email`: The email associated with the charity.
    - `password`: The hashed password of the charity (should be handled securely).
    - `mission`: The mission statement of the charity.
    - `goals`: The goals set by the charity.
    - `category`: The category of the charity (can be `null`).
    - `location`: The location of the charity (can be `null`).
    - `isApproved`: A boolean indicating if the charity is approved.
    - `createdAt`: The timestamp when the charity was created.
    - `updatedAt`: The timestamp when the charity's details were last updated.


## Charity Registration

### Register a Charity

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/charity/register`

#### HTTP Request Example:

POST /api/v1/charity/register HTTP/1.1 Host: api.yourdomain.com Content-Type: application/json

{ "name": "Charity1", "email": "charity1@gmail.com", "password": "Charity2", "description": "charity for children", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025" }

#### Expected HTTP Response:

HTTP/1.1 201 Created Content-Type: application/json

{ "message": "Charity registered and pending admin approval.", "charity": { "isApproved": false, "id": 1, "name": "Charity1", "description": "charity for children", "email": "charity1@gmail.com", "password": "$2b$10$kzqzymY5/kediuFd.fsP0u/EPwv1OaueciJmlufmtn6KX3xEnUIzy", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025", "updatedAt": "2024-10-29T09:52:38.651Z", "createdAt": "2024-10-29T09:52:38.651Z" } }
### Explanation of the Request and Response

- **Request Body**: JSON payload containing:
  - `name`: The name of the charity.
  - `email`: The email address of the charity.
  - `password`: The password for the charity account.
  - `description`: A brief description of the charity.
  - `mission`: The mission statement of the charity.
  - `goals`: The goals set by the charity.

- **Response**: JSON object containing:
  - `message`: A message indicating the outcome of the registration (e.g., "Charity registered and pending admin approval.").
  - `charity`: An object containing details about the registered charity, including:
    - `isApproved`: A boolean indicating if the charity is approved (default is `false`).
    - `id`: The ID of the newly registered charity.
    - `name`: The name of the charity.
    - `description`: A brief description of the charity.
    - `email`: The email associated with the charity.
    - `password`: The hashed password of the charity (should be handled securely).
    - `mission`: The mission statement of the charity.
    - `goals`: The goals set by the charity.
    - `updatedAt`: The timestamp when the charity's details were last updated.
    - `createdAt`: The timestamp when the charity was created.


## Charity Login

### Login a Charity

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/charity/login`

#### HTTP Request Example:

POST /api/v1/charity/login HTTP/1.1 Host: api.yourdomain.com Content-Type: application/json

{ "email": "charity1@gmail.com", "password": "Charity2" }

#### Expected HTTP Response:

HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Login successful", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNoYXJpdHkiLCJpYXQiOjE3MzAyMDYxMjksImV4cCI6MTczMDI5MjUyOX0.KJlyV27IgOOb9OwA-23kp6rtspq4sLbD4K13zX1Cvno" }


### Explanation of the Request and Response

- **Request Body**: JSON payload containing:
  - `email`: The email address of the charity.
  - `password`: The password associated with the charity account.

- **Response**: JSON object containing:
  - `message`: A message indicating the outcome of the login attempt (e.g., "Login successful").
  - `token`: A JWT (JSON Web Token) that the charity can use for authenticated requests.

### Example Usage

When a charity wants to log in, they send a POST request with their email and password. If the login is successful, they receive a token that can be used for subsequent requests that require authentication.

## Update Charity

### Update Charity Information

- **HTTP Method**: `PUT`
- **Endpoint**: `/api/v1/charity/update`

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### HTTP Request Example:

PUT /api/v1/charity/update HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNoYXJpdHkiLCJpYXQiOjE3MzAyMDYxMjksImV4cCI6MTczMDI5MjUyOX0.KJlyV27IgOOb9OwA-23kp6rtspq4sLbD4K13zX1Cvno Content-Type: application/json

{ "category": "children", "location": "Chennai" }


#### Expected HTTP Response:

HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Charity updated successfully", "charity": { "id": 1, "name": "Charity1", "description": "charity for children", "email": "charity1@gmail.com", "password": "$2b$10$kzqzymY5/kediuFd.fsP0u/EPwv1OaueciJmlufmtn6KX3xEnUIzy", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025", "category": "children", "location": "Chennai", "isApproved": true, "createdAt": "2024-10-29T09:52:38.000Z", "updatedAt": "2024-10-29T12:51:00.237Z" } }


### Explanation of the Request and Response

- **Request Body**: JSON payload containing:
  - `category`: The category of the charity (e.g., "children").
  - `location`: The location of the charity (e.g., "Chennai").

- **Response**: JSON object containing:
  - `message`: A message indicating the outcome of the update (e.g., "Charity updated successfully").
  - `charity`: The updated charity object, which includes all relevant fields.

### Example Usage

When a charity wants to update their information, they send a PUT request with their updated category and location. Upon successful update, the response includes the updated charity details along with a success message.


## Get Charities by Location

### Retrieve Charities

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/charity/get`

#### Query Parameters

- **location** (required): The location to filter charities (e.g., `Chennai`).

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### HTTP Request Example:

GET /api/v1/charity/get?location=Chennai HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNoYXJpdHkiLCJpYXQiOjE3MzAyMDYxMjksImV4cCI6MTczMDI5MjUyOX0.KJlyV27IgOOb9OwA-23kp6rtspq4sLbD4K13zX1Cvno

#### Expected HTTP Response:
HTTP/1.1 200 OK Content-Type: application/json

{ "charities": [ { "id": 1, "name": "Charity1", "description": "charity for children", "email": "charity1@gmail.com", "password": "$2b$10$kzqzymY5/kediuFd.fsP0u/EPwv1OaueciJmlufmtn6KX3xEnUIzy", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025", "category": "children", "location": "Chennai", "isApproved": true, "createdAt": "2024-10-29T09:52:38.000Z", "updatedAt": "2024-10-29T12:51:00.000Z" } ] }


### Explanation of the Request and Response

- **Query Parameters**: 
  - `location`: The location for which you want to retrieve the list of charities (e.g., "Chennai").

- **Response**: JSON object containing:
  - `charities`: An array of charity objects that match the specified location. Each charity object contains:
    - `id`: The unique identifier of the charity.
    - `name`: The name of the charity.
    - `description`: A brief description of the charity's mission.
    - `email`: The email address associated with the charity.
    - `mission`: The charity's mission statement.
    - `goals`: The goals the charity aims to achieve.
    - `category`: The category under which the charity operates.
    - `location`: The location of the charity.
    - `isApproved`: Indicates if the charity is approved by the admin.
    - `createdAt`: The timestamp when the charity was created.
    - `updatedAt`: The timestamp when the charity was last updated.

### Example Usage

When a user wants to find charities located in Chennai, they send a GET request with the location query parameter. The response includes a list of charities that match the specified location, including their details.


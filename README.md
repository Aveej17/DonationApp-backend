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
```json
{
    "email": "admin@gmail.com",
    "password": "admin"
}
```


#### Expected HTTP Response:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMjAyMTc2LCJleHAiOjE3MzAyODg1NzZ9.5W35AWcg1vFqraaMaS-Q95xwd326rWbms2jZQEroCNk",
    "success": true
}
```




### Explanation of the Request and Response

- **Request Body**: JSON payload containing `email` and `password`.

- **Response**: JSON object with a success message, an authentication token, and a success status.

### Create Admin

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/create`
- **Authorization**: Bearer token required

#### HTTP Request Example:
```json
POST /api/v1/admin/create HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMjAzMDA0LCJleHAiOjE3MzAyODk0MDR9.pu9tZZrNmp8dppM1tvPe0sc0ac-gtzgX3-vGZRow7c8 Content-Type: application/json

{ "email": "admin2@gmail.com", "name": "admin2" }
```

#### Expected HTTP Response:

HTTP/1.1 200 OK Content-Type: application/json
```json
{ "message": "Credentials are sent to your employee mail kindly check", "success": true }
```

### Explanation of the Request and Response

- **Request Body**: JSON payload containing `email` and `name`.

- **Response**: JSON object with a success message indicating that credentials have been sent to the specified email and a success status.

### Forgot Password

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/forgot-password`

#### HTTP Request Example:
```json
POST /api/v1/admin/forgot-password HTTP/1.1 Host: api.yourdomain.com Content-Type: application/json

{ "email": "admin@gmail.com" }
```
#### Expected HTTP Response:
```json
HTTP/1.1 200 OK Content-Type: application/json

{ "message": "New password sent to your email", "success": true }
```
### Explanation of the Request and Response

- **Request Body**: JSON payload containing `email`.

- **Response**: JSON object with a success message indicating that a new password has been sent to the specified email and a success status.

### Reset Password

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/reset-password`
- **Authorization**: Bearer token required

#### HTTP Request Example:
```json
POST /api/v1/admin/reset-password HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer <your_token_here> Content-Type: application/json

{ "email": "admin@gmail.com", "newPassword": "admin" }
```
#### Expected HTTP Response:
```json
HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Password updated successfully", "success": true }
```
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
```json
HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Charities waiting for approval", "approval": [ { "id": 1, "charityId": 1, "status": "pending", "comments": null, "createdAt": "2024-10-29T09:52:39.000Z", "updatedAt": "2024-10-29T09:52:39.000Z" } ] }
```
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
```json
POST /api/v1/admin/approveRejectCharity HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer <your_token_here> Content-Type: application/json

{ "status": "approved" }
```

#### Expected HTTP Response:
```json
HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Charity approved successfully", "charity": { "id": 1, "name": "Charity1", "description": "charity for children", "email": "charity1@gmail.com", "password": "$2b$10$kzqzymY5/kediuFd.fsP0u/EPwv1OaueciJmlufmtn6KX3xEnUIzy", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025", "category": null, "location": null, "isApproved": true, "createdAt": "2024-10-29T09:52:38.000Z", "updatedAt": "2024-10-29T09:53:11.735Z" } }
```
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
```json
POST /api/v1/charity/register HTTP/1.1 Host: api.yourdomain.com Content-Type: application/json

{ "name": "Charity1", "email": "charity1@gmail.com", "password": "Charity2", "description": "charity for children", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025" }
```
#### Expected HTTP Response:
```json
HTTP/1.1 201 Created Content-Type: application/json

{ "message": "Charity registered and pending admin approval.", "charity": { "isApproved": false, "id": 1, "name": "Charity1", "description": "charity for children", "email": "charity1@gmail.com", "password": "$2b$10$kzqzymY5/kediuFd.fsP0u/EPwv1OaueciJmlufmtn6KX3xEnUIzy", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025", "updatedAt": "2024-10-29T09:52:38.651Z", "createdAt": "2024-10-29T09:52:38.651Z" } }
```
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
```json
POST /api/v1/charity/login HTTP/1.1 Host: api.yourdomain.com Content-Type: application/json

{ "email": "charity1@gmail.com", "password": "Charity2" }
```
#### Expected HTTP Response:
```json
HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Login successful", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNoYXJpdHkiLCJpYXQiOjE3MzAyMDYxMjksImV4cCI6MTczMDI5MjUyOX0.KJlyV27IgOOb9OwA-23kp6rtspq4sLbD4K13zX1Cvno" }
```

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
```json
PUT /api/v1/charity/update HTTP/1.1 Host: api.yourdomain.com Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNoYXJpdHkiLCJpYXQiOjE3MzAyMDYxMjksImV4cCI6MTczMDI5MjUyOX0.KJlyV27IgOOb9OwA-23kp6rtspq4sLbD4K13zX1Cvno Content-Type: application/json

{ "category": "children", "location": "Chennai" }
```

#### Expected HTTP Response:
```json
HTTP/1.1 200 OK Content-Type: application/json

{ "message": "Charity updated successfully", "charity": { "id": 1, "name": "Charity1", "description": "charity for children", "email": "charity1@gmail.com", "password": "$2b$10$kzqzymY5/kediuFd.fsP0u/EPwv1OaueciJmlufmtn6KX3xEnUIzy", "mission": "Achieve No Child labour", "goals": "Educate 10000 children in 2025", "category": "children", "location": "Chennai", "isApproved": true, "createdAt": "2024-10-29T09:52:38.000Z", "updatedAt": "2024-10-29T12:51:00.237Z" } }
```

### Explanation of the Request and Response

- **Request Body**: JSON payload containing:
  - `category`: The category of the charity (e.g., "children").
  - `location`: The location of the charity (e.g., "Chennai").

- **Response**: JSON object containing:
  - `message`: A message indicating the outcome of the update (e.g., "Charity updated successfully").
  - `charity`: The updated charity object, which includes all relevant fields.

### Example Usage

When a charity wants to update their information, they send a PUT request with their updated category and location. Upon successful update, the response includes the updated charity details along with a success message.




## Create Donation

### Donation

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/donation/create`

#### Authentication

- **Header**: `Authorization: Bearer <token>`


#### HTTP Request Example
```json
POST /api/v1/donation/create HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNoYXJpdHkiLCJpYXQiOjE3MzAyMDYxMjksImV4cCI6MTczMDI5MjUyOX0.KJlyV27IgOOb9OwA-23kp6rtspq4sLbD4K13zX1Cvno
Content-Type: application/json

{
    "amount": 100,
    "charityId": 1
}
```
##### Expected HTTP Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "key_id": "rzp_test_QvbON6FIPij43r",
    "orderId": "order_PErSQoen9OIWL1",
    "amount": 10000,
    "currency": "INR",
    "userId": 3,
    "charityId": 1
}
```

##### Explanation of the Request and Response

Request Body:

amount: The amount of the donation (e.g., 100).
charityId: The ID of the charity to which the donation is being made.
Response: JSON object containing:

key_id: The key ID for the payment gateway.
orderId: The unique order ID generated for the donation.
amount: The amount of the donation (in paise, hence multiplied by 100).
currency: The currency in which the donation is made (e.g., "INR").
userId: The ID of the user making the donation.
charityId: The ID of the charity receiving the donation.

## Get Donation History

### Donation History

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/donation/history`

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### Expected HTTP Response
```json
http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true,
    "donations": [
        {
            "id": 1,
            "userId": 3,
            "charityId": 1,
            "amount": 100,
            "paymentId": "pay_PErpIL2aUOsfKI",
            "status": "confirmed",
            "createdAt": "2024-10-29T13:18:18.000Z",
            "updatedAt": "2024-10-29T13:18:18.000Z"
        }
    ]
}
```

## Download Donation Receipt

### Download Donation Receipt

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/donation/downloadReceipts/{donationId}`

#### Path Parameters

- **donationId** (required): The unique identifier of the donation (e.g., `3`).

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### Expected HTTP Response
```json
http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true,
    "fileUrl": "https://s3.amazonaws.com/receipts/receipt_3.pdf"
}

```
## Get Projects

### Retrieve Charity Projects

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/charity/projects`

#### Query Parameters

- **charityId** (required): The unique identifier of the charity for which to retrieve projects (e.g., `1`).

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### Expected HTTP Response
```json
http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Projects retrieved successfully",
    "projects": [
        {
            "id": 1,
            "name": "project1",
            "description": "simple description",
            "donationGoal": "2000000.00",
            "amountRaised": "1000000.00",
            "charityId": 1,
            "createdAt": "2024-10-29T13:32:54.000Z",
            "updatedAt": "2024-10-29T13:32:54.000Z"
        }
    ]
}

```
## Add Project

### Create a New Charity Project

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/charity/add-project`

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### Request Body

```json
{
    "name": "project1",
    "description": "simple description",
    "donationGoal": 2000000,
    "amountRaised": 1000000
}
```

#### Expected HTTP Response
HTTP/1.1 201 Created
Content-Type: application/json
```json
{
    "message": "Project added successfully",
    "project": {
        "id": 1,
        "name": "project1",
        "description": "simple description",
        "donationGoal": 2000000,
        "amountRaised": 1000000,
        "charityId": 1,
        "updatedAt": "2024-10-29T13:32:54.199Z",
        "createdAt": "2024-10-29T13:32:54.199Z"
    }
}
```

## Update Project

### Update an Existing Charity Project

- **HTTP Method**: `PUT`
- **Endpoint**: `/api/v1/charity/update-project/{projectId}`

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### Request Body

```json
{
    "name": "New Project Name",
    "description": "Updated description for the project.",
    "donationGoal": 15000.00,
    "amountRaised": 5000.00
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Project updated successfully",
    "project": {
        "id": 1,
        "name": "New Project Name",
        "description": "Updated description for the project.",
        "donationGoal": 15000,
        "amountRaised": 5000,
        "charityId": 1,
        "createdAt": "2024-10-29T13:32:54.000Z",
        "updatedAt": "2024-10-29T13:53:22.480Z"
    }
}
```

## User Signup

### Create a New User Account

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/user/signup`

#### Request Body

```json
{
    "name": "Jeeva1",
    "email": "Jeeva1@gmail.com",
    "password": "Jeeva1"
}


HTTP/1.1 201 Created
Content-Type: application/json

{
    "message": "User Account Created",
    "success": true
}
```

## User Login

### Authenticate a User

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/user/login`

#### Request Body

```json
{
    "email": "Jeeva1@gmail.com",
    "password": "Jeeva1"
}


HTTP/1.1 200 OK
Content-Type: application/json

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InVzZXIiLCJpYXQiOjE3MzAyMDc4NDYsImV4cCI6MTczMDI5NDI0Nn0.mm-5O_81_nEISt6aPkzrS5bwTIaBAx2haJZLC4xgNkE",
    "success": true
}
```

## Reset Password

### Request a Password Reset

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/user/resetPassword`

#### Request Body

```json
{
    "email": "Jeeva1@gmail.com"
}


HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "updated Password sent to your mail kindly check",
    "success": true
}
```

## Get User Profile

### Retrieve User Profile Information

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/user/profile`

#### Authentication

- **Header**: `Authorization: Bearer <token>`

#### Expected HTTP Response

HTTP/1.1 200 OK
Content-Type: application/json

```json
{
    "profile": {
        "id": 1,
        "userId": 2,
        "address": "101,2nd street, vnr, slm",
        "city": "salem",
        "postalCode": "632325",
        "country": "India",
        "dateOfBirth": "1999-01-17",
        "gender": "male",
        "profilePicture": "https://donateappbuckets.s3.amazonaws.com/users/2.jpg",
        "createdAt": "2024-10-29T09:57:46.000Z",
        "updatedAt": "2024-10-29T09:57:46.000Z"
    },
    "success": true
}
```

## Update User Profile

### Endpoint
- **HTTP Method**: `POST`
- **URL**: `/api/v1/user/profile`

### Authentication
- **Header**: `Authorization: Bearer <token>`

### Request Body
- **Content-Type**: `multipart/form-data`
- **Form Data Parameters**:
  - `address` (string): User's address
  - `city` (string): City
  - `postalCode` (string): Postal code
  - `country` (string): Country
  - `dateOfBirth` (date): Date of birth in `YYYY-MM-DD` format
  - `gender` (string): Gender (e.g., `male`, `female`, `other`)
  - `profilePicture` (file): Image file for the profile picture (`req.file`)

### Sample Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Profile updated successfully",
    "success": true
}
```

## Change User Password

### Endpoint
- **HTTP Method**: `POST`
- **URL**: `/api/v1/user/changePassword`

### Authentication
- **Header**: `Authorization: Bearer <token>`

### Request Body
- **Content-Type**: `application/json`
- **Parameters**:
  - `oldPassword` (string): The current password of the user.
  - `newPassword` (string): The new password to be set.

### Sample Request

```json
{
    "oldPassword": "Jeeva1",
    "newPassword": "Jeeva2"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Password Changed Successfully",
    "success": true
}
```

## Get All Users

### Endpoint
- **HTTP Method**: `GET`
- **URL**: `/api/v1/user/getAll`

### Authentication
- **Header**: `Authorization: Bearer <token>`
- **Role Required**: `admin`

### Expected HTTP Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true,
    "users": [
        {
            "id": 3,
            "name": "Jeeva1",
            "email": "Jeeva1@gmail.com",
            "password": "$2b$10$2DFm3PdMu9KaSGc4ygwSWOIRQr3AFB/FxmkaU/Irbrv2TYMJJae7a",
            "createdAt": "2024-10-29T12:56:08.000Z",
            "updatedAt": "2024-10-29T13:56:56.000Z"
        },
        {
            "id": 4,
            "name": "Jeeva2",
            "email": "Jeeva2@gmail.com",
            "password": "$2b$10$87pWTVhYiucsLgKz.nwcOO3n.AEF34fXoI4q9LH.SzZB0iF62OLgq",
            "createdAt": "2024-10-29T14:06:17.000Z",
            "updatedAt": "2024-10-29T14:14:03.000Z"
        }
    ]
}
```

## Delete User

### Endpoint
- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/user/delete/{userId}`

### Authentication
- **Header**: `Authorization: Bearer <token>`
- **Role Required**: `admin`

### Path Parameters
- `userId` (integer): The ID of the user to be deleted.

### Expected HTTP Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true,
    "message": "User deleted successfully"
}
```


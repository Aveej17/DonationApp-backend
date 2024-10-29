# API Documentation

## Admins

### Admin Login

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/login`
- **Content-Type**: `application/json`

#### HTTP Request Example:

- **Request Body**: JSON payload containing `email` and `password`.

### Explanation of the Request and Response

- **Response**: JSON object with a success message, an authentication token, and a success status.

### Create Admin

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/create`
- **Authorization**: Bearer token required

#### HTTP Request Example:

- **Request Body**: JSON payload containing `email` and `name`.

### Explanation of the Request and Response

- **Response**: JSON object with a success message indicating that credentials have been sent to the specified email and a success status.

### Forgot Password

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/forgot-password`

#### HTTP Request Example:

- **Request Body**: JSON payload containing `email`.

### Explanation of the Request and Response

- **Response**: JSON object with a success message indicating that a new password has been sent to the specified email and a success status.

### Reset Password

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/admin/reset-password`
- **Authorization**: Bearer token required

#### HTTP Request Example:
- **Request Body**: JSON payload containing:
  - `email`: The email of the admin whose password needs to be reset.
  - `newPassword`: The new password to set.

### Explanation of the Request and Response
- **Response**: JSON object with a success message indicating that the password has been updated successfully and a success status.


### Fetch Approval Requests

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/admin/approve-charity-requests`
- **Authorization**: Bearer token required

#### HTTP Request Example:

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
- **Request Body**: JSON payload containing:
  - `status`: The new status for the charity, either "approved" or "rejected".

### Explanation of the Request and Response

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

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

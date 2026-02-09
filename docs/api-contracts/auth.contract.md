# Authentication API Contract

## 1. Login
**Endpoint**: `POST /api/auth/login`
**Description**: Authenticates a user and returns a token.

### Request Body
```json
{
  "email": "restaurant@example.com",
  "password": "password123"
}
```

### Response (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "Green Valley Restaurant",
    "role": "RESTAURANT"
  }
}
```

### Example 401 Invalid Credentials
```json
{
  "status": 401,
  "errorCode": "INVALID_CREDENTIALS",
  "message": "Email or password is incorrect",
  "timestamp": "2025-02-03T10:15:30Z"
}
```

## 2. Register
**Endpoint**: `POST /api/auth/register`
**Description**: Registers a new user (Restaurant or NGO).

### Request Body
```json
{
  "name": "Green Valley Restaurant",
  "email": "contact@greenvalley.com",
  "password": "securePassword!",
  "role": "RESTAURANT", // or "NGO"
  "phone": "9876543210",
  "address": "123 Green St, Food City"
}
```

### Response (201 Created)
```json
{
  "message": "User registered successfully",
  "userId": "123"
}
```

## 3. Get Current User
**Endpoint**: `GET /api/auth/me`
**Headers**: `Authorization: Bearer <token>`
**Description**: Returns the profile of the currently logged-in user.

### Response (200 OK)
```json
{
  "id": 123,
  "name": "Green Valley Restaurant",
  "email": "contact@greenvalley.com",
  "role": "RESTAURANT",
  "avatar": "https://example.com/avatar.jpg"
}
```

## 4. Logout
**Endpoint**: `POST /api/auth/logout`
**Description**: Invalidates the user session (client-side usually handles token removal).

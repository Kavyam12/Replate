# Error Handling Contract

## Standard Error Response
All API errors return a standard JSON structure as defined by `ApiErrorResponse` in the backend.

### Structure
```json
{
  "status": 400,
  "errorCode": "VALIDATION_FAILED",
  "message": "Validation failed",
  "fieldErrors": {
    "email": "Invalid email format",
    "phone": "Phone number is required"
  },
  "timestamp": "2025-02-03T10:15:30"
}
```

## Common Error Status Codes

| Status | Description |
|--------|-------------|
| 400 | Bad Request (Validation errors, invalid input) |
| 401 | Unauthorized (Invalid or missing token) |
| 403 | Forbidden (User doesn't have permission) |
| 404 | Not Found (Resource does not exist) |
| 500 | Internal Server Error |

### Example 400 Bad Request
```json
{
  "status": 400,
  "errorCode": "EMAIL_ALREADY_EXISTS",
  "message": "Email already exists",
  "timestamp": "2025-02-03T10:15:30"
}
```

### Example 401 Invalid Token
```json
{
  "status": 401,
  "errorCode": "INVALID_TOKEN",
  "message": "JWT token is invalid or expired",
  "timestamp": "2025-02-03T10:15:30"
}
```


### Example 403 Access Denied
```json
{
  "status": 403,
  "errorCode": "ACCESS_DENIED",
  "message": "You do not have permission to access this resource",
  "timestamp": "2025-02-03T10:15:30"
}
```
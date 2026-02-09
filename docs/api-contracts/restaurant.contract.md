# Restaurant Profile API Contract

## 1. Get Restaurant Profile
**Endpoint**: `GET /api/donor/me`
**Description**: Get the full public and private profile of the restaurant.

### Response (200 OK)
```json
{
  "name": "Green Valley Restaurant",
  "ownerName": "Kavyam",
  "email": "contact@greenvalley.com",
  "phone": "6372998007",
  "address": "Kamkole, Woxsen University",
  "avatar": "https://example.com/avatar.jpg"
}
```

## 2. Update Restaurant Profile
**Endpoint**: `PUT /api/donor/me`
**Description**: Update restaurant details.

### Request Body
```json
{
  "ownerName": "Kavyam Kumar",
  "phone": "9998887776"
}
```

## 3. Update Settings
**Endpoint**: `PATCH /api/donor/me`
**Description**: Update preference toggles.

### Request Body
```json
{
  "emailNotifications": false,
  "autoAcceptOrders": true
}
```

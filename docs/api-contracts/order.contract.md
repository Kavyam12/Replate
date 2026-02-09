# Order API Contract

## 1. Get All Orders
**Endpoint**: `GET /api/donor/orders`
**Description**: Get a list of orders (Active and History).

### Query Parameters
- `type` (optional): "active", "history"

### Response (200 OK)
```json
[
  {
    "id": "ORD-2025-100",
    "orderDate": "2025-01-01T10:00:00Z",
    "foodItem": "Caesar Salad",
    "quantity": 20,
    "quantityUnit" : "bowls",
    "buyer": "Community Food Bank",
    "totalPrice": 140,
    "status": "COMPLETED"
  }
]
```

## 2. Get Order Details
**Endpoint**: `GET /api/donor/orders/:id`
**Description**: Get detailed information about a specific order.

## 3. Update Order Status
**Endpoint**: `PATCH /api/donor/orders/:id/status`
**Description**: Update the status of an order (e.g., to "READY_FOR_PICKUP").

### Request Body
```json
{
  "status": "READY_FOR_PICKUP"
}
```

### Response (200 OK)
```json
{
  "id": "ORD-2025-100",
  "status": "READY_FOR_PICKUP",
  "updatedAt": "2025-02-03T12:00:00Z"
}
```

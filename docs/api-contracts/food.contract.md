# Food Listing API Contract

## 1. List Food Items
**Endpoint**: `GET /api/donor/food-listings`
**Description**: Get a list of food items listed by the logged-in restaurant.

### Query Parameters
- `status` (optional): "AVAILABLE", "SOLD", "EXPIRED"

### Response (200 OK)
```json
[
  {
    "id": 101,
    "name": "Spicy Tuna Roll",
    "quantity": 5,
    "quantityUnit": "kg",
    "price": 120,
    "deadline": "2025-01-02T20:00:00Z",
    "status": "AVAILABLE",
    "imageUrl": "https://example.com/food1.jpg"
  }
]
```

## 2. Create Food Listing
**Endpoint**: `POST /api/food`
**Description**: List a new surplus food item.

### Request Body
```json
{
  "name": "Chicken Biryani",
  "quantity": 10,
  "quantityUnit": "portions",
  "price": 450,
  "deadline": "2025-02-05T14:00:00Z",
  "description": "Freshly made biryani, excess from lunch service."
}
```

### Response (201 Created)
```json
{
  "id": 102,
  "message": "Food listed successfully"
}
```

## 3. Update Food Listing
**Endpoint**: `PUT /api/donor/food-listings/:id`
**Description**: Update details of a listed food item.

### Request Body
```json
{
  "quantity": 8,
  "quantityUnit": "portions",
  "price": 400
}
```

## 4. Delete Food Listing
**Endpoint**: `DELETE /api/donor/food-listings/:id`
**Description**: Remove a food listing.

### Response (200 OK)
```json
{
  "message": "Listing deleted successfully"
}
```

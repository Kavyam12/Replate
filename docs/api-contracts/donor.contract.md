# Donor (Restaurant) API Contract

**Note**: In the frontend application, the "Donor" dashboard corresponds to the **RESTAURANT** role (Supplier of surplus food).

## 1. Get Dashboard Statistics
**Endpoint**: `GET /api/donor/stats`
**Role**: `RESTAURANT`
**Description**: Get summary statistics for the donor dashboard.

### Response (200 OK)
```json
[
  {
  "foodListedToday": 24,
  "ordersCompletedToday": 12,
  "revenueGeneratedToday": 3420
}
]
```

## 2. Get Recent Food Listings
**Endpoint**: `GET /api/donor/recent-food`
**Role**: `RESTAURANT`
**Description**: Get a list of recently listed food items for the dashboard widget.

### Response (200 OK)
```json
[
  {
    "id": 101,
    "name": "Spicy Tuna Roll",
    "quantity": 5,
    "quantityUnit": "kg",
    "price": 120,
    "currency": "INR",
    "deadline": "2025-01-02 20:00",
    "status": "AVAILABLE",
    "image": "https://example.com/image.jpg"
  }
]
```

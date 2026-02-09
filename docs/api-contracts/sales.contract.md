# Sales Analytics API Contract

## 1. Get Sales Statistics
**Endpoint**: `GET /api/donor/sales/stats`
**Description**: Get key performance indicators for the dashboard cards.

### Response (200 OK)
```json
{
  "weeklyRevenue": {
    "value": 3420,
    "trend": 12, // percentage
    "trendDirection": "up"
  },
  "monthlyRevenue": {
    "value": 14680,
    "trend": 8,
    "trendDirection": "up"
  },
  "totalRevenue": {
    "value": 3420
  }
}
```

## 2. Get Revenue Chart Data
**Endpoint**: `GET /api/donor/sales/chart`
**Description**: Get daily revenue breakdown for the chart.

### Query Parameters
- `period`: "weekly", "monthly"

### Response (200 OK)
```json
[
  { "day": "Mon", "value": 420 },
  { "day": "Tue", "value": 580 },
  { "day": "Wed", "value": 490 },
  { "day": "Thu", "value": 650 },
  { "day": "Fri", "value": 720 },
  { "day": "Sat", "value": 560 }
]
```

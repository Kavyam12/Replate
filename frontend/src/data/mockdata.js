export const mockStatCards = [
  { id: 1, title: 'Food Listed Today', value: '24', icon: 'Box', color: '#e8f5e9', textColor: '#2e7d32' },
  { id: 2, title: 'Orders Completed', value: '18', icon: 'ShoppingCart', color: '#e3f2fd', textColor: '#1565c0' },
  { id: 3, title: 'Revenue Generated', value: '₹3420', icon: 'DollarSign', color: '#fff8e1', textColor: '#f57f17' },
  { id: 4, title: 'Pending Pickups', value: '6', icon: 'Clock', color: '#fce4ec', textColor: '#c2185b' },
];

export const mockRecentFood = [
  {
    id: 1,
    name: 'Spicy Tuna Roll (12 pieces)',
    quantity: '5 kg',
    price: '₹120',
    deadline: '2025-01-02 20:00',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150&h=150&fit=crop'
  },
  {
    id: 2,
    name: 'Vegetable Lasagna',
    quantity: '8 portions',
    price: '₹200',
    deadline: '2025-01-02 21:00',
    status: 'Reserved',
    image: 'https://images.unsplash.com/photo-1574868291093-f359e181391a?w=150&h=150&fit=crop'
  },
  {
    id: 3,
    name: 'Grilled Chicken Breast',
    quantity: '10 pieces',
    price: '₹180',
    deadline: '2025-01-02 22:00',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=150&h=150&fit=crop'
  }
];



export const mockOrders = [
  {
    id: 1,
    orderId: "ORD-2025-001",
    foodItem: "Spicy Tuna Roll (12 pieces)",
    quantity: "3 kg",
    buyer: "Community Food Bank",
    status: "In Progress"
  },
  {
    id: 2,
    orderId: "ORD-2025-002",
    foodItem: "Vegetable Lasagna",
    quantity: "5 portions",
    buyer: "Hope Kitchen NGO",
    status: "Ready for Pickup"
  },
  {
    id: 3,
    orderId: "ORD-2025-003",
    foodItem: "Grilled Chicken Breast",
    quantity: "6 pieces",
    buyer: "Shelter Meals Foundation",
    status: "In Progress"
  },
  {
    id: 4,
    orderId: "ORD-2025-004",
    foodItem: "Paneer Butter Masala",
    quantity: "4 kg",
    buyer: "Annapurna Trust",
    status: "Ready for Pickup"
  },
  {
    id: 5,
    orderId: "ORD-2025-005",
    foodItem: "Veg Fried Rice",
    quantity: "10 portions",
    buyer: "City Hunger Relief",
    status: "In Progress"
  },
  {
    id: 6,
    orderId: "ORD-2025-006",
    foodItem: "Dal Tadka",
    quantity: "6 litres",
    buyer: "Helping Hands NGO",
    status: "Completed"
  }
];

export const mockOrderHistory = [
  {
    id: "ORD-2001",
    orderDate: "2026-02-02T09:45:00Z",
    restaurantName: "Green Leaf Restaurant",
    ngoName: "Helping Hands NGO",
    items: [
      { name: "Veg Rice", quantity: 12 },
      { name: "Sambar", quantity: 6 }
    ],
    totalAmount: 1350,
    status: "CONFIRMED",
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    pickupDeadline: "2026-02-02T13:00:00Z",
    volunteer: "Amit Sharma"
  },
  {
    id: "ORD-2002",
    orderDate: "2026-02-01T18:20:00Z",
    restaurantName: "Spice Hub",
    ngoName: "Food For All",
    items: [
      { name: "Chapati", quantity: 25 },
      { name: "Paneer Curry", quantity: 5 }
    ],
    totalAmount: 1800,
    status: "PICKED_UP",
    paymentStatus: "PAID",
    paymentMethod: "Card",
    pickupDeadline: "2026-02-01T20:00:00Z",
    volunteer: "Neha Verma"
  },
  {
    id: "ORD-2003",
    orderDate: "2026-01-31T14:05:00Z",
    restaurantName: "Urban Tandoor",
    ngoName: "Serve Smile Foundation",
    items: [
      { name: "Veg Biryani", quantity: 15 }
    ],
    totalAmount: 1500,
    status: "DELIVERED",
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    pickupDeadline: "2026-01-31T17:00:00Z",
    volunteer: "Virat Kohli"
  },
  {
    id: "ORD-2004",
    orderDate: "2026-01-30T11:30:00Z",
    restaurantName: "Annapurna Bhojanalaya",
    ngoName: "Care & Share",
    items: [
      { name: "Khichdi", quantity: 20 }
    ],
    totalAmount: 1000,
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    paymentMethod: "UPI",
    pickupDeadline: "2026-01-30T14:00:00Z",
    volunteer: "Elon Musk"
  },
  {
    id: "ORD-2005",
    orderDate: "2026-01-29T16:50:00Z",
    restaurantName: "Daily Dabba",
    ngoName: "Helping Hands NGO",
    items: [
      { name: "Curd Rice", quantity: 10 },
      { name: "Pickle", quantity: 10 }
    ],
    totalAmount: 750,
    status: "FAILED",
    paymentStatus: "FAILED",
    paymentMethod: "UPI",
    pickupDeadline: "2026-01-29T18:30:00Z",
    volunteer: "Jeffrey Epstein"
  },
  {
    id: "ORD-2006",
    orderDate: "2026-01-28T10:15:00Z",
    restaurantName: "Green Bowl Cafe",
    ngoName: "Hope Kitchen",
    items: [
      { name: "Salad Bowl", quantity: 8 },
      { name: "Fruit Mix", quantity: 5 }
    ],
    totalAmount: 900,
    status: "PLACED",
    paymentStatus: "PENDING",
    paymentMethod: "—",
    pickupDeadline: "2026-01-28T13:00:00Z",
    volunteer: "Donald Trump"
  }
];

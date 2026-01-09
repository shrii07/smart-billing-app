# Smart Billing - API Documentation

Complete REST API documentation with examples and request/response formats.

---

## 🔗 API Base URL

```
Development:  http://localhost:5000/api
Production:   https://your-backend.herokuapp.com/api
```

---

## 📋 Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Server health check |
| GET | / | API info and endpoints |
| POST | /bills | Create new bill |
| GET | /bills | Get all bills |
| GET | /bills/:id | Get single bill |
| PUT | /bills/:id | Update bill |
| DELETE | /bills/:id | Delete bill |

---

## 🏥 Health Check

### GET /health

Check if server is running and responsive.

**Request**
```http
GET http://localhost:5000/api/health
Content-Type: application/json
```

**Response** (200 OK)
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-09T10:30:00.000Z"
}
```

---

## ℹ️ API Info

### GET /

Get API information and available endpoints.

**Request**
```http
GET http://localhost:5000/api
Content-Type: application/json
```

**Response** (200 OK)
```json
{
  "message": "Smart Billing API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "bills": "/api/bills"
  }
}
```

---

## 💰 Bills Endpoints

### POST /bills

Create a new bill with items.

**Request**
```http
POST http://localhost:5000/api/bills
Content-Type: application/json

{
  "customerName": "John Doe",
  "items": [
    {
      "productName": "Web Design",
      "quantity": 1,
      "price": 500
    },
    {
      "productName": "Development",
      "quantity": 20,
      "price": 100
    }
  ],
  "taxPercentage": 10,
  "notes": "Thank you for your business!"
}
```

**Response** (201 Created)
```json
{
  "success": true,
  "message": "Bill created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "billNumber": "BILL-1673456789-1",
    "customerName": "John Doe",
    "items": [
      {
        "productName": "Web Design",
        "quantity": 1,
        "price": 500,
        "total": 500
      },
      {
        "productName": "Development",
        "quantity": 20,
        "price": 100,
        "total": 2000
      }
    ],
    "subTotal": 2500,
    "tax": 250,
    "taxPercentage": 10,
    "grandTotal": 2750,
    "notes": "Thank you for your business!",
    "createdAt": "2024-01-09T10:30:00.000Z",
    "updatedAt": "2024-01-09T10:30:00.000Z",
    "__v": 0
  }
}
```

**Error Response** (400 Bad Request)
```json
{
  "success": false,
  "message": "Please provide customer name and at least one item"
}
```

**Validation Rules**
- `customerName`: Required, max 100 characters
- `items`: Required, minimum 1 item
- `items[].productName`: Required, max length
- `items[].quantity`: Required, minimum 1
- `items[].price`: Required, minimum 0
- `taxPercentage`: Optional, 0-100
- `notes`: Optional, max 500 characters

---

### GET /bills

Retrieve all bills.

**Request**
```http
GET http://localhost:5000/api/bills
Content-Type: application/json
```

**Response** (200 OK)
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "billNumber": "BILL-1673456789-1",
      "customerName": "John Doe",
      "items": [
        {
          "productName": "Web Design",
          "quantity": 1,
          "price": 500,
          "total": 500
        }
      ],
      "subTotal": 500,
      "tax": 50,
      "taxPercentage": 10,
      "grandTotal": 550,
      "notes": "Thank you",
      "createdAt": "2024-01-09T10:30:00.000Z",
      "updatedAt": "2024-01-09T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "billNumber": "BILL-1673456790-2",
      "customerName": "Jane Smith",
      "items": [...],
      "subTotal": 1000,
      "tax": 100,
      "taxPercentage": 10,
      "grandTotal": 1100,
      "notes": "",
      "createdAt": "2024-01-08T09:15:00.000Z",
      "updatedAt": "2024-01-08T09:15:00.000Z"
    }
  ]
}
```

**Query Parameters**
None currently, but ready for:
- `page` - Pagination (future)
- `limit` - Results per page (future)
- `sort` - Sort by field (future)

---

### GET /bills/:id

Get a specific bill by ID.

**Request**
```http
GET http://localhost:5000/api/bills/507f1f77bcf86cd799439011
Content-Type: application/json
```

**Response** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "billNumber": "BILL-1673456789-1",
    "customerName": "John Doe",
    "items": [
      {
        "productName": "Web Design",
        "quantity": 1,
        "price": 500,
        "total": 500
      }
    ],
    "subTotal": 500,
    "tax": 50,
    "taxPercentage": 10,
    "grandTotal": 550,
    "notes": "Thank you",
    "createdAt": "2024-01-09T10:30:00.000Z",
    "updatedAt": "2024-01-09T10:30:00.000Z"
  }
}
```

**Error Response** (404 Not Found)
```json
{
  "success": false,
  "message": "Bill not found"
}
```

**URL Parameters**
- `id`: MongoDB ObjectId (24-character hex string)

---

### PUT /bills/:id

Update an existing bill.

**Request**
```http
PUT http://localhost:5000/api/bills/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "customerName": "John Doe Updated",
  "items": [
    {
      "productName": "Web Design",
      "quantity": 2,
      "price": 500
    }
  ],
  "taxPercentage": 15,
  "notes": "Updated note"
}
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "Bill updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "billNumber": "BILL-1673456789-1",
    "customerName": "John Doe Updated",
    "items": [
      {
        "productName": "Web Design",
        "quantity": 2,
        "price": 500,
        "total": 1000
      }
    ],
    "subTotal": 1000,
    "tax": 150,
    "taxPercentage": 15,
    "grandTotal": 1150,
    "notes": "Updated note",
    "createdAt": "2024-01-09T10:30:00.000Z",
    "updatedAt": "2024-01-09T10:35:00.000Z"
  }
}
```

**Error Response** (404 Not Found)
```json
{
  "success": false,
  "message": "Bill not found"
}
```

**Notes**
- All fields are recalculated on update
- Bill number cannot be changed
- Creation date cannot be changed

---

### DELETE /bills/:id

Delete a bill.

**Request**
```http
DELETE http://localhost:5000/api/bills/507f1f77bcf86cd799439011
Content-Type: application/json
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "Bill deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "billNumber": "BILL-1673456789-1",
    "customerName": "John Doe",
    "items": [...],
    "subTotal": 500,
    "tax": 50,
    "taxPercentage": 10,
    "grandTotal": 550,
    "notes": "Thank you",
    "createdAt": "2024-01-09T10:30:00.000Z",
    "updatedAt": "2024-01-09T10:30:00.000Z"
  }
}
```

**Error Response** (404 Not Found)
```json
{
  "success": false,
  "message": "Bill not found"
}
```

---

## 📊 Data Types

### Bill Object
```typescript
{
  _id: ObjectId,                    // MongoDB ID
  billNumber: string,               // Unique bill number
  customerName: string,             // 1-100 characters
  items: Item[],                    // At least 1 item
  subTotal: number,                 // Sum of item totals
  tax: number,                      // Calculated tax amount
  taxPercentage: number,            // 0-100
  grandTotal: number,               // subTotal + tax
  notes?: string,                   // Optional, max 500 chars
  createdAt: Date,                  // ISO 8601 timestamp
  updatedAt: Date,                  // ISO 8601 timestamp
  __v: number                       // Version control
}
```

### Item Object
```typescript
{
  productName: string,              // Product/service name
  quantity: number,                 // >= 1
  price: number,                    // >= 0
  total: number                     // quantity * price
}
```

---

## 🔍 Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET, PUT, DELETE success |
| 201 | Created | POST success |
| 400 | Bad Request | Missing required fields |
| 404 | Not Found | Bill doesn't exist |
| 500 | Server Error | Database error |

---

## 🛠️ Testing with cURL

### Create Bill
```bash
curl -X POST http://localhost:5000/api/bills \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "items": [
      {
        "productName": "Service",
        "quantity": 1,
        "price": 500
      }
    ],
    "taxPercentage": 10
  }'
```

### Get All Bills
```bash
curl http://localhost:5000/api/bills
```

### Get Single Bill
```bash
curl http://localhost:5000/api/bills/507f1f77bcf86cd799439011
```

### Update Bill
```bash
curl -X PUT http://localhost:5000/api/bills/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Doe",
    "items": [
      {
        "productName": "Service",
        "quantity": 2,
        "price": 500
      }
    ],
    "taxPercentage": 15
  }'
```

### Delete Bill
```bash
curl -X DELETE http://localhost:5000/api/bills/507f1f77bcf86cd799439011
```

---

## 🧪 Testing with Postman

1. **Import Collection**
   - Create new collection "Smart Billing"

2. **Create Variables**
   ```
   base_url: http://localhost:5000/api
   bill_id: (set after creating a bill)
   ```

3. **Create Requests**
   - POST {{base_url}}/bills
   - GET {{base_url}}/bills
   - GET {{base_url}}/bills/{{bill_id}}
   - PUT {{base_url}}/bills/{{bill_id}}
   - DELETE {{base_url}}/bills/{{bill_id}}

---

## ⚙️ CORS Headers

The API includes CORS headers for cross-origin requests:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 🔐 Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Errors**

| Message | Cause | Fix |
|---------|-------|-----|
| "Please provide customer name..." | Missing required fields | Fill all fields |
| "Bill not found" | Invalid ID | Check bill ID |
| "Internal server error" | Database error | Check MongoDB |
| "ECONNREFUSED" | Backend not running | Start backend server |

---

## 📝 Request/Response Examples

### Create Multiple Items Bill

**Request**
```json
{
  "customerName": "ABC Corporation",
  "items": [
    {
      "productName": "Consulting - 10 hours",
      "quantity": 1,
      "price": 1500
    },
    {
      "productName": "Software License",
      "quantity": 2,
      "price": 500
    },
    {
      "productName": "Support - Monthly",
      "quantity": 1,
      "price": 200
    }
  ],
  "taxPercentage": 18,
  "notes": "Invoice #INV-001. Payment due within 30 days. Thank you!"
}
```

**Response Calculations**
```
Item 1: 1 × $1,500 = $1,500
Item 2: 2 × $500   = $1,000
Item 3: 1 × $200   = $200
────────────────────────────
Subtotal:           $2,700
Tax (18%):          $486
────────────────────────────
Grand Total:        $3,186
```

---

## 🚀 Best Practices

### Error Handling
```javascript
try {
  const response = await fetch('/api/bills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(billData)
  });
  
  const data = await response.json();
  
  if (!data.success) {
    console.error(data.message);
    // Show user-friendly error
  }
} catch (error) {
  console.error('Network error:', error);
  // Handle network errors
}
```

### Data Validation
```javascript
function validateBill(billData) {
  if (!billData.customerName?.trim()) {
    throw new Error('Customer name required');
  }
  
  if (!Array.isArray(billData.items) || billData.items.length === 0) {
    throw new Error('At least one item required');
  }
  
  billData.items.forEach((item, index) => {
    if (!item.productName?.trim()) {
      throw new Error(`Item ${index + 1}: Product name required`);
    }
    if (item.quantity < 1) {
      throw new Error(`Item ${index + 1}: Quantity must be >= 1`);
    }
    if (item.price < 0) {
      throw new Error(`Item ${index + 1}: Price must be >= 0`);
    }
  });
}
```

---

## 📚 API Changelog

**Version 1.0.0** (Current)
- ✅ Create, read, update, delete bills
- ✅ Item management
- ✅ Tax calculation
- ✅ Auto bill numbering
- ✅ Timestamps

**Future Features**
- 🔄 User authentication
- 🔄 Pagination
- 🔄 Search and filtering
- 🔄 Bulk operations
- 🔄 Export to PDF/CSV

---

**Last Updated**: January 2024  
**API Version**: 1.0.0  
**Status**: ✅ Stable

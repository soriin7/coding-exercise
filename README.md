<h1>Allocation Function</h1></br>
This function is designed to allocate incoming supply to outstanding customer orders based on a first come first served basis. It prioritizes orders based on their creation dates and allocates stock from incoming purchase orders accordingly.</br></br>

<h3>Usage</h3></br>
To use this script, you need to provide two arrays of objects: salesOrders and purchaseOrders, each containing order information. The algorithm will then calculate the delivery dates for each sales order based on the available stock from the purchase orders.</br></br>

```javascript
const salesOrders = [
  {
    'id': 'S1',
    'created': '2020-01-02',
    'quantity': 10
  }
];

const purchaseOrders = [
  {
    'id': 'P1',
    'receiving': '2020-01-02',
    'quantity': 5
  },
  {
    'id': 'P2',
    'receiving': '2020-01-03',
    'quantity': 5
  },
  {
    'id': 'P3',
    'receiving': '2020-01-04',
    'quantity': 5
  },
  {
    'id': 'P4',
    'receiving': '2020-01-05',
    'quantity': 5
  }
];

console.log(allocate(salesOrders, purchaseOrders));
```

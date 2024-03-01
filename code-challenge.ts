const allocate = (salesOrders, purchaseOrders) => {
  const salesOrdersSorted = salesOrders
    .sort((a, b) => new Date(a.created).valueOf() - new Date(b.created).valueOf());
  const purchaseOrdersSorted = purchaseOrders
    .sort((a, b) => new Date(a.receiving).valueOf() - new Date(b.receiving).valueOf());

  let stock = 0;
  let currentIndex = 0;
  let pendingDelivery = 0;

  const result = salesOrdersSorted.map((sale, i) => {
    const { id, quantity: saleQuantity, created } = sale;
    let delivery = 'N/A';

    while (stock < saleQuantity && currentIndex < purchaseOrdersSorted.length) {
      stock += purchaseOrdersSorted[currentIndex].quantity;
      currentIndex++;
    }
    pendingDelivery += stock - saleQuantity;

    if (stock >= saleQuantity && pendingDelivery >= 0) {
      const shippingDate = purchaseOrdersSorted[currentIndex - 1].receiving;
      const possibleDeliveryDate = new Date(Math.max(new Date(created).valueOf(), new Date(shippingDate).valueOf()));
      delivery = new Date(possibleDeliveryDate
        .setDate((possibleDeliveryDate.getDate() + 7) + 1))
        .toLocaleDateString('en-CA')
      stock -= Number(saleQuantity);
    }
    return { id, delivery }
  })
  return result;
}

//Tests used to validate the code
// const salesOrders = [{
//   'id': 'S1',
//   'created': '2020-01-02',
//   'quantity': 6
// }, {
//   'id': 'S2',
//   'created': '2020-11-05',
//   'quantity': 2
// }, {
//   'id': 'S3',
//   'created': '2019-12-04',
//   'quantity': 3
// }, {
//   'id': 'S4',
//   'created': '2020-01-20',
//   'quantity': 2
// }, {
//   'id': 'S5',
//   'created': '2019-12-15',
//   'quantity': 9
// }];

// const purchaseOrders = [{
//   'id': 'P1',
//   'receiving': '2020-01-04',
//   'quantity': 4
// }, {
//   'id': 'P2',
//   'receiving': '2020-01-05',
//   'quantity': 3
// }, {
//   'id': 'P3',
//   'receiving': '2020-02-01',
//   'quantity': 5
// }, {
//   'id': 'P4',
//   'receiving': '2020-03-05',
//   'quantity': 1
// }, {
//   'id': 'P5',
//   'receiving': '2020-02-20',
//   'quantity': 7
// }];

// const salesOrders = [{
//   'id': 'S1',
//   'created': '2020-01-02',
//   'quantity': 2
// }, {
//   'id': 'S2',
//   'created': '2020-11-05',
//   'quantity': 2
// }, {
//   'id': 'S3',
//   'created': '2019-12-04',
//   'quantity': 3
// }];

// const purchaseOrders = [{
//   'id': 'P1',
//   'receiving': '2020-01-04',
//   'quantity': 4
// }, {
//   'id': 'P2',
//   'receiving': '2020-01-05',
//   'quantity': 3
// }, {
//   'id': 'P3',
//   'receiving': '2020-02-01',
//   'quantity': 5
// }];

// const salesOrders = [{
//   'id': 'S1',
//   'created': '2020-01-02',
//   'quantity': 100
// }];

// const purchaseOrders = [{
//   'id': 'P1',
//   'receiving': '2020-01-04',
//   'quantity': 50
// }, {
//   'id': 'P2',
//   'receiving': '2020-01-05',
//   'quantity': 75
// }];

// const salesOrders = [{
//   'id': 'S1',
//   'created': '2020-01-02',
//   'quantity': 200
// }, {
//   'id': 'S2',
//   'created': '2020-11-05',
//   'quantity': 300
// }];

// const purchaseOrders = [{
//   'id': 'P1',
//   'receiving': '2020-01-04',
//   'quantity': 150
// }, {
//   'id': 'P2',
//   'receiving': '2020-01-05',
//   'quantity': 100
// }, {
//   'id': 'P3',
//   'receiving': '2020-02-01',
//   'quantity': 200
// }];

// const salesOrders = [{
//   'id': 'S1',
//   'created': '2020-01-02',
//   'quantity': 5
// }];

// const purchaseOrders = [{
//   'id': 'P1',
//   'receiving': '2020-01-02',
//   'quantity': 3
// }, {
//   'id': 'P2',
//   'receiving': '2020-01-02',
//   'quantity': 2
// }, {
//   'id': 'P3',
//   'receiving': '2020-01-03',
//   'quantity': 3
// }];

const salesOrders = [{
  'id': 'S1',
  'created': '2020-01-02',
  'quantity': 10
}];

const purchaseOrders = [{
  'id': 'P1',
  'receiving': '2020-01-02',
  'quantity': 5
}, {
  'id': 'P2',
  'receiving': '2020-01-03',
  'quantity': 5
}, {
  'id': 'P3',
  'receiving': '2020-01-04',
  'quantity': 5
}, {
  'id': 'P4',
  'receiving': '2020-01-05',
  'quantity': 5
}];

console.log(allocate(salesOrders, purchaseOrders));


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
// const purchasesOrders = [{
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
var salesOrders = [{
        'id': 'S1',
        'created': '2020-01-02',
        'quantity': 6
    }, {
        'id': 'S2',
        'created': '2020-11-05',
        'quantity': 2
    }, {
        'id': 'S3',
        'created': '2019-12-04',
        'quantity': 3
    }];
var purchasesOrders = [{
        'id': 'P1',
        'receiving': '2020-01-04',
        'quantity': 4
    }, {
        'id': 'P2',
        'receiving': '2020-01-05',
        'quantity': 3
    }, {
        'id': 'P3',
        'receiving': '2020-02-01',
        'quantity': 5
    }];
var allocate = function (salesOrders, purchasesOrders) {
    var salesOrdersSorted = salesOrders
        .sort(function (a, b) { return new Date(a.created).valueOf() - new Date(b.created).valueOf(); });
    var purchasesOrdersSorted = purchasesOrders
        .sort(function (a, b) { return new Date(a.receiving).valueOf() - new Date(b.receiving).valueOf(); });
    var stock = 0;
    var currentIndex = 0;
    var result = salesOrdersSorted.map(function (sale) {
        var id = sale.id, saleQuantity = sale.quantity, created = sale.created;
        var delivery = 'Out of stock';
        while (stock < saleQuantity && currentIndex < purchasesOrdersSorted.length) {
            stock += purchasesOrdersSorted[currentIndex].quantity;
            currentIndex++;
        }
        if (stock >= saleQuantity) {
            delivery = purchasesOrdersSorted[currentIndex - 1].receiving;
            var possibleDeliveryDate = new Date(Math.max(new Date(created).valueOf(), new Date(delivery).valueOf()));
            delivery = new Date(possibleDeliveryDate
                .setDate((possibleDeliveryDate.getDate() + 7) + 1))
                .toLocaleDateString('en-CA');
            stock -= Number(saleQuantity);
        }
        return { id: id, delivery: delivery };
    });
    return result;
};
console.log(allocate([], []));

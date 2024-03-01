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

console.log(allocate(salesOrders, purchaseOrders));

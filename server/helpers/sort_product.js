module.exports.productMaxSalesCompare = (element1, element2) => {
  if (element1.sold.total_amount < element2.sold.total_amount) {
    return 1;
  } else if (element1.sold.total_amount > element2.sold.total_amount) {
    return -1;
  }

  return 0;
};

module.exports.productLatestCompare = (element1, element2) => {
  if (
    element1.product.lastUpdatedDTM.getTime() <
    element2.product.lastUpdatedDTM.getTime()
  ) {
    return 1;
  } else if (
    element1.product.lastUpdatedDTM.getTime() >
    element2.product.lastUpdatedDTM.getTime()
  ) {
    return -1;
  }

  return 0;
};

module.exports.productMaxRatingCompare = (element1, element2) => {
  if (element1.product.rating < element2.product.rating) {
    return 1;
  } else if (element1.product.rating > element2.product.rating) {
    return -1;
  }

  return 0;
};

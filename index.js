const arrayOfGoods = require('./goods.json');

function isPriceValid(price) {
  return price[0] === '$' && !Number.isNaN(+price.replace(',', '.').replace('$', ''));
}

function handleGoods(goods) {
  const filteredArray = goods.filter((good) => {
    const isItemString = typeof good.item === 'string';
    const isTypeString = typeof good.type === 'string';
    const isWeightProduct = typeof good.weight === 'number' && isPriceValid(good.pricePerKilo);
    const isQuantityProduct = typeof good.quantity === 'number' && isPriceValid(good.pricePerItem);

    return isItemString && isTypeString && (isWeightProduct || isQuantityProduct);
  });

  const sortedGoods = [...filteredArray].sort((first, second) => (first.item > second.item ? 1 : -1));

  const totalWatermelons = filteredArray
    .filter((good) => {
      const watermelon = good.item === 'watermelon';
      return watermelon;
    })
    .map((good) => good.quantity)
    .reduce((acc, val) => acc + val, 0);

  console.log('Watermelons -', totalWatermelons);

  const totalApplesWeight = filteredArray
    .filter((good) => {
      const apple = good.item === 'apple';
      return apple;
    })
    .map((good) => good.weight)
    .reduce((acc, val) => acc + val, 0);

  console.log('Apples - ', totalApplesWeight);

  function costOfGood(good) {
    return (good.pricePerKilo || good.pricePerItem).replace(',', '.').replace('$', '') * (good.weight || good.quantity);
  }

  filteredArray.forEach((good) => {
    console.log(good.item, 'price is', costOfGood(good), '$');
  });

  const cheapestOrange = filteredArray
    .filter((good) => good.item === 'orange')
    .sort((item1, item2) => {
      const costOfFirst = costOfGood(item1);
      const costOfSecond = costOfGood(item2);
      return costOfFirst - costOfSecond;
    })[0].type;

  console.log(cheapestOrange, 'is the cheapest orange');

  const costOfGoods = [...filteredArray].sort((item1, item2) => {
    const costOfFirst = costOfGood(item1);
    const costOfSecond = costOfGood(item2);
    return costOfFirst - costOfSecond;
  });

  return {
    filteredArray,
    sortedGoods,
    costOfGoods,
  };
}

const result = handleGoods(arrayOfGoods);
console.log(result);

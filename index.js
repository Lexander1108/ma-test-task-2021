const goods = require('./goods.json');

function handleGoods (goods) {
    const filteredArray = goods.filter(function(good){
        const isItemString = typeof good.item === 'string';
        return isItemString;
    })

    const sortedGoods = [...filteredArray].sort(function(first, second){
        return first.item > second.item ? 1 : -1;
    })

    const totalWatermelons = filteredArray.filter(function(good){
        const watermelon = good.item === 'watermelon';
        return watermelon;
    })
        .map(function(good){
            return good.quantity;
        })
        .reduce(function(acc, val){
            return acc + val;
        },0);
    
    console.log('Watermelons -',  totalWatermelons);

    const totalApplesWeight = filteredArray.filter(function(good){
        const apple = good.item === 'apple';
        return apple;
    })
        .map(function(good){
            return good.weight;
        })
        .reduce(function(acc, val){
            return acc + val;
        })
    
    console.log('Apples - ', totalApplesWeight);

    function costOfGood (good){
        return (good.pricePerKilo || good.pricePerItem).replace(',', '.').replace('$', '') * (good.weight || good.quantity);
        
    }

    const price = filteredArray.forEach(function(good){
        console.log(good.item, 'price is', costOfGood(good), '$') 
    })

    const cheapestOrange = filteredArray.filter(function(good){
        if (good.item === 'orange') {
            return true;
        }
    }).sort(function(item1, item2){
        const costOfFirst = costOfGood(item1);
        const costOfSecond = costOfGood(item2);
        return costOfFirst - costOfSecond;
    })[0].type;

    console.log(cheapestOrange, 'is the cheapest orange');
    
    const costOfGoods = [...filteredArray].sort(function(item1, item2){
        const costOfFirst = costOfGood(item1);
        const costOfSecond = costOfGood(item2);
        return costOfFirst - costOfSecond;
            
    })

    return {
        filteredArray,
        sortedGoods,
        costOfGoods,
    }
}

const result = handleGoods(goods);
console.log(result);
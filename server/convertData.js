/**
 * Converts JSON data representing cryptocurrency trading information into a formatted object.
 * 
 * @param {Object} jsonData - JSON data containing cryptocurrency trading information.
 * @returns {Object} - Formatted object containing parsed trading information.
 */
function convertData(jsonData) {
  const data = {
      eventType: jsonData.e,
      eventTimestamp: new Date(jsonData.E),
      tradingPair: jsonData.s,
      priceChange: parseFloat(jsonData.p),
      priceChangePercentage: parseFloat(jsonData.P),
      weightedAveragePrice: parseFloat(jsonData.w),
      previousClosePrice: parseFloat(jsonData.x),
      currentPrice: parseFloat(jsonData.c),
      lastTradeQuantity: parseFloat(jsonData.Q),
      bestBidPrice: parseFloat(jsonData.b),
      bestBidQuantity: parseFloat(jsonData.B),
      bestAskPrice: parseFloat(jsonData.a),
      bestAskQuantity: parseFloat(jsonData.A),
      openingPrice: parseFloat(jsonData.o),
      highestPrice24h: parseFloat(jsonData.h),
      lowestPrice24h: parseFloat(jsonData.l),
      totalTradedVolume: parseFloat(jsonData.v),
      totalTradedQuoteVolume: parseFloat(jsonData.q),
      firstTradeTimestamp: jsonData.O,
      lastTradeTimestamp: parseFloat(jsonData.C),
      firstTradeID: parseFloat(jsonData.F),
      lastTradeID: parseFloat(jsonData.L),
      totalNumberOfTrades24h: parseFloat(jsonData.n),
  };

  return data;
}

// Example usage:
const jsonData = {
"_id": { "$oid": "654a09d097cbcc246b6df7e4" },
"e": "24hrTicker",
"E": { "$date": "2023-11-07T09:56:31.265Z" },
"s": "ETHBTC",
"p": "0.00012000",
"P": "0.223",
"w": "0.05416870",
"x": "0.05379000",
"c": "0.05391000",
"Q": "0.31680000",
"b": "0.05390000",
"B": "24.26690000",
"a": "0.05391000",
"A": "2.14930000",
"o": "0.05379000",
"h": "0.05441000",
"l": "0.05373000",
"v": "24867.58510000",
"q": "1347.04484256",
"O": 1699264591264,
"C": "1699350991264",
"F": "425089612",
"L": "425137322",
"n": "47711",
"__v": 0
};

module.exports = {convertData}

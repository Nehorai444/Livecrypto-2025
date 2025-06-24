/**
 * This script connects to a MongoDB database using Mongoose, loads environment variables,
 * and defines Mongoose models for two collections: staticCoinTable and coins.
 * It also periodically deletes the documents in the "coins" collection every 300,000 milliseconds (5 minutes).
 * 
 * Environment Variables:
 * - MONGODB_USERNAME: The username for MongoDB authentication.
 * - MONGODB_PASSWORD: The password for MongoDB authentication.
 * 
 * Requirements:
 * - mongoose: npm package for MongoDB object modeling designed to work in an asynchronous environment.
 * - dotenv: npm package that loads environment variables from a .env file into process.env.
 * - logging: Custom logging module with a logger object defined. (Not provided in this script)
 * 
 * @module mongoose-db
 * @requires mongoose
 * @requires dotenv
 * @requires logging
 */

const { logger } = require("./logging");
const db = require('mongoose');

require('dotenv').config();

// Connect to MongoDB using Mongoose
db.connect(process.env.MONGODB_URI).then(() => {
  logger.info('DB is on');
}).catch(err => console.log(err));

// Mongoose Schema for the staticCoinTable collection
const staticCoinScheme = new db.Schema({
  tradingPair: String,
  coinId: Number
});

// Mongoose Model for the staticCoinTable collection
const staticCoinModel = new db.model("staticCoinTable", staticCoinScheme);
// Mongoose Schema for the coins collection
const coinScheme = new db.Schema({
  eventType: String,
  coinId: Number,
  eventTimestamp: Date,
  tradingPair: String,
  priceChange: Number,
  priceChangePercentage: Number,
  weightedAveragePrice: Number,
  previousClosePrice: Number,
  currentPrice: Number,
  lastTradeQuantity: Number,
  bestBidPrice: Number,
  bestBidQuantity: Number,
  bestAskPrice: Number,
  bestAskQuantity: Number,
  openingPrice: Number,
  highestPrice24h: Number,
  lowestPrice24h: Number,
  totalTradedVolume: Number,
  totalTradedQuoteVolume: Number,
  firstTradeTimestamp: Number,
  lastTradeTimestamp: Number,
  firstTradeID: Number,
  lastTradeID: Number,
  totalNumberOfTrades24h: Number,
});

// Mongoose Model for the coins collection
const coinModel = new db.model("coins", coinScheme);

async function clearCoinsCollection() {
  try {
    // Get the current time and calculate the time 5 minutes ago
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Delete all coins older than the last 5 minutes
    const result = await coinModel.deleteMany({
      eventTimestamp: { $lt: fiveMinutesAgo }
    });

    logger.info(`Coins collection cleared, deleted ${result.deletedCount} records older than 5 minutes`);
  } catch (error) {
    logger.error('Error clearing coins collection:', error);
  }
}

// Schedule to clear the "coins" collection every 300,000 milliseconds (5 minutes)
setInterval(clearCoinsCollection, 300000);

/**
 * Module exports the Mongoose models for the staticCoinTable and coins collections.
 * 
 * @exports mongoose-db
 */
module.exports = { coinModel, staticCoinModel };

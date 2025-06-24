/**
 * Component for displaying detailed information about a specific cryptocurrency.
 * 
 * This component renders details such as trading pair, close price, open price,
 * high price, low price, total traded base asset volume, and total traded quote asset volume.
 * It also provides inputs for selecting start and end dates for data retrieval, and a button
 * to trigger the data search. Upon successful search, it displays a graph component with the retrieved data.
 * 
 * @module Coin
 * @param {Object} props - Props passed to the component.
 * @param {Object} val - Object containing details of the cryptocurrency.
 * @param {number} index - Index of the cryptocurrency in the list.
 * @requires react
 * @requires react-i18next
 * @requires Graph
 * @requires Loader
 * @requires ApiRequest
 */
import React, { useState } from 'react';
import Graph from './shelves/Graph';
import { ApiRequest } from '../library/Utilities';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';
import '../Index.css';


export default function Coin(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { t, i18n } = useTranslation();
    const {val, flag, index, setDataCoin, setFlag} = props.value;
    // Function to format the price
    function getFormatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    }

    function onClick() {
        // Check if the start date and end date are not empty
        if (!startDate || !endDate) return;

        setIsLoading(true);

        // Call the search function from the ApiRequest library
        ApiRequest.search(startDate, endDate, val.tradingPair)
            .then(res => {
                if (res.status === 1) {
                    setDataCoin(res.data); // Set the dataCoin state to the data from the server
                    setIsLoading(false);
                    setFlag(!flag);
                } else {
                    setError(res.errors[0]);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const isRTL = i18n.language === 'he';

    return (       
          <div
      className={`bg-gray-800 text-white p-5 rounded-lg shadow-md space-y-3 ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      <h3 className="text-lg font-bold text-yellow-400">
        {t('tradeTitle')} {index + 1}:
      </h3>

      <div>
        <p>
          <span className="font-semibold text-blue-300">{t('symbol')}:</span> {val.tradingPair}
        </p>
        <p>
          <span className="font-semibold text-blue-300">{t('closePrice')}:</span> {getFormatPrice(val.currentPrice)}
        </p>
        <p>
          <span className="font-semibold text-blue-300">{t('openPrice')}:</span> {getFormatPrice(val.openingPrice)}
        </p>
        <p>
          <span className="font-semibold text-blue-300">{t('highPrice')}:</span> {getFormatPrice(val.highestPrice24h)}
        </p>
        <p>
          <span className="font-semibold text-blue-300">{t('lowPrice')}:</span> {getFormatPrice(val.lowestPrice24h)}
        </p>
        <p>
          <span className="font-semibold text-blue-300">{t('totalTradedBaseAssetVolume')}:</span>{' '}
          {getFormatPrice(val.totalTradedVolume)}
        </p>
        <p>
          <span className="font-semibold text-blue-300">{t('totalTradedQuoteAssetVolume')}:</span>{' '}
          {getFormatPrice(val.totalTradedQuoteVolume)}
        </p>
      </div>

      {/* Date Inputs */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="startDate" className="block mb-1 font-semibold text-gray-300">
            {t('startDateLabel')}:
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            onChange={(e) => {
              const localDate = new Date(e.target.value);
              setStartDate(localDate);
            }}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block mb-1 font-semibold text-gray-300">
            {t('endDateLabel')}:
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            onChange={(e) => {
              const localDate = new Date(e.target.value);
              setEndDate(localDate);
            }}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Action & Feedback */}
      <div className="mt-4 space-y-2">
        {!flag && (
          <button
            id="searchButton"
            onClick={onClick}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            {t('searchButton')}
          </button>
        )}

        {isLoading && (
          <div className="flex items-center space-x-2">
            <Loader />
            <span className="text-sm text-gray-400">{t('loading')}</span>
          </div>
        )}

        {error && <p className="text-red-400 font-semibold">{error}</p>}
      </div>
    </div>
        
    );
}

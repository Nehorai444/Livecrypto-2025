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
  const { val, flag, index, setDataCoin, setFlag } = props.value;

  function getFormatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  // ✅ Function to format date to US clock (MM/DD/YYYY, hh:mm AM/PM)
  function formatToUSClock(date) {
    if (!date) return "";
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }

  function onClick() {
    if (!startDate || !endDate) return;

    setIsLoading(true);
    ApiRequest.search(startDate, endDate, val.tradingPair)
      .then(res => {
        if (res.status === 1) {
          setDataCoin(res.data);
          setIsLoading(false);
          setFlag(!flag);
        } else {
          setError(res.errors[0]);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
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
        <p><span className="font-semibold text-blue-300">{t('symbol')}:</span> {val.tradingPair}</p>
        <p><span className="font-semibold text-blue-300">{t('closePrice')}:</span> {getFormatPrice(val.currentPrice)}</p>
        <p><span className="font-semibold text-blue-300">{t('openPrice')}:</span> {getFormatPrice(val.openingPrice)}</p>
        <p><span className="font-semibold text-blue-300">{t('highPrice')}:</span> {getFormatPrice(val.highestPrice24h)}</p>
        <p><span className="font-semibold text-blue-300">{t('lowPrice')}:</span> {getFormatPrice(val.lowestPrice24h)}</p>
        <p><span className="font-semibold text-blue-300">{t('totalTradedBaseAssetVolume')}:</span> {getFormatPrice(val.totalTradedVolume)}</p>
        <p><span className="font-semibold text-blue-300">{t('totalTradedQuoteAssetVolume')}:</span> {getFormatPrice(val.totalTradedQuoteVolume)}</p>
      </div>

      {/* Date Inputs */}
      <div className="w-full flex flex-col md:flex-row md:space-x-4 mt-4 space-y-4 md:space-y-0 overflow-hidden">
        <div className="flex-1 min-w-0">
          <label htmlFor="startDate" className="block mb-1 font-semibold text-gray-300">
            {t('startDateLabel')}:
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
          />
          {startDate && (
            <p className="text-sm text-gray-400 mt-1 break-words">
              🕒 {t('selected')} (US): {formatToUSClock(startDate)}
            </p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <label htmlFor="endDate" className="block mb-1 font-semibold text-gray-300">
            {t('endDateLabel')}:
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
          />
          {endDate && (
            <p className="text-sm text-gray-400 mt-1 break-words">
              🕒 {t('selected')} (US): {formatToUSClock(endDate)}
            </p>
          )}
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

/**
 * Component for displaying a list of cryptocurrency trading data.
 * 
 * This component receives an array of cryptocurrency trading data as props and renders
 * a list of `Coin` components for each item in the array. It also displays a loader component
 * while waiting for the data to be received.
 * 
 * @module CoinsList
 * @param {Object} props - Props passed to the component.
 * @param {Array} props.data - Array of cryptocurrency trading data.
 * @requires react
 * @requires Coin
 * @requires Loader
 * @requires react-i18next
 */
import React, { useState } from 'react';
import Coin from './Coin';
import "../Index.css";
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import Graph from './shelves/Graph';

export default function CoinsList(props) {
    const { t } = useTranslation();
    const [flag, setFlag] = useState(false);
    const [dataCoin, setDataCoin] = useState([]);

    if (flag) return <Graph data={dataCoin} setFlag={setFlag} />
    else return (
       <div className="coinList bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 rounded-md shadow">
            <h2 id="titleCoinList" className="text-lg font-semibold mb-4">
                {t('receivedTradeDataTitle')}
            </h2>

            <ul>
                {props.data.length > 0 ? (
                props.data.map((val, index) => (
                    <li key={index} className="mb-2">
                    <Coin value={{ val, flag, setFlag, setDataCoin, index }} />
                    </li>
                ))
                ) : (
                <Loader />
                )}
            </ul>
        </div>


    );
}

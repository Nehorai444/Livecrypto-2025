import { useState, useEffect } from 'react';
import './Index.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import CoinsList from './components/CoinsList';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import pako from 'pako';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [data, setData] = useState([]);
  const { t } = useTranslation();


  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
   const protocol = window.location.port || (protocol === "https://" ? 443 : 80);
   const ws = new WebSocket(`${protocol}${window.location.hostname}:${window.location.port}`);

    ws.binaryType = 'arraybuffer'; // Set binary type for WebSocket

    ws.onopen = () => {
      console.log('Connected to WebSocket server.');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      if (data !== undefined) {
        
        try {
          const inflatedData = pako.inflate(data, { to: 'string' }); // decompression
          setData(JSON.parse(inflatedData)); // Set the data state to the data from the server
          } catch (error) {
            console.error('Error parsing JSON:', error);
        }

      }
    };

    // Add event listener for beforeunload event to close WebSocket connection
    const handleBeforeUnload = () => {
      ws.close();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove event listener and close WebSocket connection
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      ws.close();
    };
  }, []);

  useEffect(() => {
    document.title = "LiveCrypto"
  }, [])
  return (
    <div className="App">
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Livecrypto</h1>
        <ThemeToggle />
      </header>
      <Menu />
      <Header />
      <Routes>
        <Route path="/allCoins" element={<CoinsList data={data} />} />
        <Route path="/" element={<HomePage data={data} />} />
      </Routes>


    </div>
  );
}

export default App;

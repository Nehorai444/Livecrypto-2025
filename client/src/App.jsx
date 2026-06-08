import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import pako from "pako";

import "./Index.css";

import Menu from "./components/Menu";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import CoinsList from "./components/CoinsList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const WS_URL =
      import.meta.env.VITE_WS_URL ||
      "ws://localhost:8080";

    const socket = new WebSocket(WS_URL);

    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      console.log("✅ Connected:", WS_URL);
    };

    socket.onmessage = (event) => {
      try {
        const decompressed = pako.inflate(event.data, {
          to: "string",
        });

        const jsonData = JSON.parse(decompressed);

        setData(jsonData);
      } catch (err) {
        console.error(
          "❌ Error parsing websocket message:",
          err
        );
      }
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket Error:", err);
    };

    socket.onclose = (event) => {
      console.log(
        `🔌 Connection closed (${event.code})`
      );
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    document.title = "LiveCrypto";
  }, []);

  return (
    <div className="App">
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          LiveCrypto
        </h1>

        <ThemeToggle />
      </header>

      <Menu />
      <Header />

      <Routes>
        <Route
          path="/"
          element={<HomePage data={data} />}
        />

        <Route
          path="/allCoins"
          element={<CoinsList data={data} />}
        />
      </Routes>
    </div>
  );
}

export default App;
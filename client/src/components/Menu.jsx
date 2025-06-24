import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../Index.css'; // Make sure Tailwind is configured correctly

export default function Menu() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              to="/allCoins"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
            >
              {t('allCoinsMenuItem')}
            </Link>
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
            >
              {t('top10CoinsMenuItem')}
            </Link>
          </div>

          {/* Language Selector */}
          <div>
            <select
              onChange={handleLanguageChange}
              value={i18n.language}
              className="ml-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="zh">中文</option>
              <option value="he">עברית</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

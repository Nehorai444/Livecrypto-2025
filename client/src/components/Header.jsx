// src/components/Header.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm py-4 px-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center rtlText">
        {t('appTitle')}
      </h1>
    </header>

  );
};

export default Header;

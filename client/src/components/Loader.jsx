import React from 'react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Loading...</h2>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.4s]" />
      </div>
    </div>
  );
}

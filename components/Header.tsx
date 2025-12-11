
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            AI Activity Log Parser
          </h1>
        </div>
      </div>
    </header>
  );
};

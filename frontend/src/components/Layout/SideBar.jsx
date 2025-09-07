// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Home, Users, Calendar, MessageSquare } from 'lucide-react';

const Sidebar = ({ isMobile, isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Users, label: 'Employee', active: true },
    { icon: Calendar, label: 'Calendar', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
  ];

  const sidebarClass = `
    ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
    ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
    w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
    transition-transform duration-300 ease-in-out
    flex flex-col
  `;

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div className={sidebarClass}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-blue-600">RS-TECH</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                transition-colors duration-200
                ${item.active
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

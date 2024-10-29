'use client';

import { useState, useEffect } from 'react';
import { fetchDefaultItems, login } from '../../lib/database';
import LoginModal from '../login/login';
import Bubble from './Bubble';

interface ShoppingItem {
  id: number;
  name: string;
  description: string;
  price: number;
  Url: string; 
}

export default function ShoppingPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      const savedItems = typeof window !== 'undefined' && localStorage.getItem('items');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      } else {
        const defaultItems = await fetchDefaultItems();
        setItems(defaultItems);
        localStorage.setItem('items', JSON.stringify(defaultItems));
      }
    };
    loadItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      setIsLoginModalOpen(false);
      const updatedItems = JSON.parse(localStorage.getItem('items') || '[]');
      setItems(updatedItems); 
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Our Shop</h1>
          <Bubble />
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-primary hover:text-primary-foreground"
          >
            Login
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full p-2 mb-4 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <img src={item.Url} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-2xl font-bold mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <button className="text-primary hover:text-primary-foreground">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Snowboard, SNOWBOARD_STATUSES } from '@/types';

type AddBoardFormProps = {
  onAddBoard: (newBoard: Omit<Snowboard, 'id'>) => void;
};

export default function AddBoardForm({ onAddBoard }: AddBoardFormProps) {
  const [brand, setBrand] = useState('');
  const [modelName, setModelName] = useState('');
  const [status, setStatus] = useState(SNOWBOARD_STATUSES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !modelName) {
      alert('Please fill out both brand and model name.');
      return;
    }
    onAddBoard({ brand, modelName, status });
    setBrand('');
    setModelName('');
    setStatus(SNOWBOARD_STATUSES[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl font-semibold mb-4">Add a New Board</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Snowboard['status'])}
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SNOWBOARD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
      >
        Add Board
      </button>
    </form>
  );
}

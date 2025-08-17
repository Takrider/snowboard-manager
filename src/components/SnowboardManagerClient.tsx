'use client';

import { useState, useEffect } from 'react';
import { Snowboard, SnowboardStatus, SNOWBOARD_STATUSES } from '@/types';
import AddBoardForm from '@/components/AddBoardForm';

export default function SnowboardManagerClient() {
  const [boards, setBoards] = useState<Snowboard[]>([]);

  useEffect(() => {
    try {
      const storedBoards = localStorage.getItem('snowboards');
      if (storedBoards) {
        setBoards(JSON.parse(storedBoards));
      }
    } catch (error) {
      console.error("Failed to parse boards from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('snowboards', JSON.stringify(boards));
    } catch (error) {
      console.error("Failed to save boards to localStorage", error);
    }
  }, [boards]);

  const handleAddBoard = (newBoardData: Omit<Snowboard, 'id'>) => {
    const newBoard: Snowboard = {
      ...newBoardData,
      id: Date.now().toString(),
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  const handleDeleteBoard = (id: string) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
  };

  const handleUpdateBoardStatus = (id: string, status: SnowboardStatus) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === id ? { ...board, status } : board
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Snowboard Manager</h1>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <AddBoardForm onAddBoard={handleAddBoard} />

        <h2 className="text-3xl font-semibold my-6">My Boards</h2>
        {boards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boards.map((board) => (
              <div key={board.id} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-1">{board.modelName}</h3>
                  <p className="text-gray-400 mb-4">{board.brand}</p>
                  <select
                    value={board.status}
                    onChange={(e) => handleUpdateBoardStatus(board.id, e.target.value as SnowboardStatus)}
                    className="bg-gray-700 text-white p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  >
                    {SNOWBOARD_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => handleDeleteBoard(board.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No boards yet. Add one using the form above!</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 mt-8 py-4">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>&copy; 2025 Snowboard Manager</p>
        </div>
      </footer>
    </div>
  );
}

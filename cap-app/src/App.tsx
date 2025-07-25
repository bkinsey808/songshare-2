import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center">
      <div className="flex gap-8 mb-6">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={viteLogo}
            className="logo w-20 h-20 transition-transform hover:scale-110"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            className="logo react w-20 h-20 transition-transform hover:scale-110"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Vite + React</h1>
      <div className="card bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mb-6">
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition-colors mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-red-600">
          Edit!!!{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-sm text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default App;

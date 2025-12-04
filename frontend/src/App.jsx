import React from "react";
import AppRouter from "./router/AppRouter";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 overflow-x-hidden">
      <AppRouter />
    </div>
  );
}

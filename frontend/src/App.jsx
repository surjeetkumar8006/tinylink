import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Sticky Navbar */}
      <Header />

      {/* Main Content Wrapper */}
      <main className="w-full px-6 py-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm">
        Built with ❤️ by Surjeet Kumar • TinyLink MERN Project
      </footer>

    </div>
  )
}

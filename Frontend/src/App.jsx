import React, { useState } from 'react';
import { BusList } from './components/BusList';
import Welcome from './components/Welcome';
import './index.css';
import Home from './pages/Home';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [buses, setBuses] = useState([
    {
      id: 1,
      name: 'Express 101',
      route: 'Buea to Douala',
      date: '2025-4-24',
      totalSeats: 20,
      bookedSeats: [],
      price: 5000
    },
    {
      id: 2,
      name: 'Express 102',
      route: 'Douala to Yaounde',
      date: '2025-4-25',
      totalSeats: 20,
      bookedSeats: [],
      price: 6000
    },
    {
      id: 3,
      name: 'Express 103',
      route: 'Buea to Limbe',
      date: '2025-4-26',
      totalSeats: 20,
      bookedSeats: [],
      price: 3000
    }
  ]);

  const handleBookSeat = (busId, seatNumber) => {
    setBuses(prevBuses => 
      prevBuses.map(bus => 
        bus.id === busId 
          ? { ...bus, bookedSeats: [...bus.bookedSeats, seatNumber] }
          : bus
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcome ? (
        <Welcome onGetStarted={() => setShowWelcome(false)} />
      ) : (
        <Home buses={buses} onBookSeat={handleBookSeat}/>
      )}
    </div>
  );
}

export default App;
import { useState } from "react"
import { Link } from "react-router-dom"
import BusList from "../components/BusList"

export default function BookingPage() {
  // Sample bus data with all seats initially unbooked
  const [buses, setBuses] = useState([
    {
      id: 1,
      name: "Express Liner",
      route: "Douala to Yaoundé",
      date: "2023-06-15",
      price: 5000,
      totalSeats: 40,
      bookedSeats: [],
    },
    {
      id: 2,
      name: "Comfort Travel",
      route: "Yaoundé to Bamenda",
      date: "2023-06-16",
      price: 6500,
      totalSeats: 35,
      bookedSeats: [],
    },
    {
      id: 3,
      name: "Royal Coach",
      route: "Douala to Limbe",
      date: "2023-06-15",
      price: 3500,
      totalSeats: 30,
      bookedSeats: [],
    },
    {
      id: 4,
      name: "City Express",
      route: "Yaoundé to Douala",
      date: "2023-06-17",
      price: 5000,
      totalSeats: 40,
      bookedSeats: [],
    },
  ])

  const handleBookSeat = (busId, seatNumber) => {
    console.log(`Booked seat ${seatNumber} on bus ${busId}`)

    // Update the buses state to mark the seat as booked
    setBuses((prevBuses) =>
      prevBuses.map((bus) => {
        if (bus.id === busId) {
          // Add the seat to the bookedSeats array if it's not already there
          if (!bus.bookedSeats.includes(seatNumber)) {
            return {
              ...bus,
              bookedSeats: [...bus.bookedSeats, seatNumber],
            }
          }
        }
        return bus
      }),
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              BusBooking
            </Link>
            <nav className="ml-10 hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link to="/" className="hover:text-indigo-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-indigo-200">
                    Routes
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-indigo-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-indigo-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-indigo-200">
              Sign In
            </a>
            <a href="#" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100">
              Register
            </a>
          </div>
        </div>
      </header>

      <div className="py-8 bg-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Book Your Bus Tickets Online</h2>
          <p className="text-xl text-indigo-100">Safe, secure, and convenient way to travel across the country</p>
        </div>
      </div>

      <BusList buses={buses} onBookSeat={handleBookSeat} />
    </main>
  )
}


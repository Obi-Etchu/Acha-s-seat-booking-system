"use client"

import { useState } from "react"
import { ChevronLeft, Search, MapPin, Calendar, Clock, Filter } from "lucide-react"

export const BusList = ({ buses = [], onBookSeat = () => {} }) => {
  const [step, setStep] = useState(1)
  const [selectedBus, setSelectedBus] = useState(null)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Add a new state for payment method
  const [paymentMethod, setPaymentMethod] = useState(null)

  // Add default value for buses to prevent the filter error
  const filteredBuses = buses ? buses.filter((bus) => bus.route.toLowerCase().includes(searchQuery.toLowerCase())) : []

  const handleBusSelect = (bus) => {
    setSelectedBus(bus)
    setStep(2)
  }

  const handleSeatSelect = (seatNumber) => {
    if (selectedBus && !selectedBus.bookedSeats.includes(seatNumber)) {
      setSelectedSeat(seatNumber)
      setStep(3)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3002/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passengerInfo),
      })
      const result = await response.json()
      console.log(result.message)
    } catch (err) {
      console.error("Error sending user data:", err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPassengerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Update the handleBooking function to move to payment step instead of confirmation
  const handleBooking = (e) => {
    e.preventDefault()
    if (selectedBus && selectedSeat !== null) {
      setStep(4) // Move to payment step instead of confirmation
    }
  }

  // Add a new function to handle payment completion
  const handlePaymentComplete = () => {
    onBookSeat(selectedBus.id, selectedSeat)
    setStep(5) // Move to confirmation after payment
  }

  // Add sample data for demonstration when no buses are provided
  const sampleBuses = [
    {
      id: 1,
      name: "Express Bus",
      route: "Douala - Yaoundé",
      date: "2023-06-15",
      price: 5000,
      totalSeats: 32,
      bookedSeats: [3, 7, 12, 15, 22, 28],
    },
    {
      id: 2,
      name: "Comfort Line",
      route: "Yaoundé - Bafoussam",
      date: "2023-06-15",
      price: 4500,
      totalSeats: 28,
      bookedSeats: [5, 8, 14, 20],
    },
    {
      id: 3,
      name: "Night Traveler",
      route: "Douala - Bamenda",
      date: "2023-06-16",
      price: 6000,
      totalSeats: 24,
      bookedSeats: [2, 9, 17, 21],
    },
  ]

  // Use sample data if no buses are provided
  const displayBuses = filteredBuses.length > 0 ? filteredBuses : searchQuery ? [] : sampleBuses

  const renderSearchBar = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Any Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button
            className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                     flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderBusSelection = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900">Available Buses</h3>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      {displayBuses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-gray-500 mb-4">No buses found for your search.</div>
          <button onClick={() => setSearchQuery("")} className="text-indigo-600 hover:text-indigo-800">
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {displayBuses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => handleBusSelect(bus)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer
                       transform transition duration-200 hover:scale-102 hover:shadow-lg
                       border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{bus.name}</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {bus.route}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {bus.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-600">{bus.price} XAF</p>
                  <p className="text-sm text-gray-500">per seat</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <p className="text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      {bus.totalSeats - bus.bookedSeats.length} Available
                    </p>
                    <p className="text-red-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      {bus.bookedSeats.length} Booked
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg
                                   hover:bg-indigo-100 transition-colors duration-200"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // Update the renderSeatSelection function to show a more realistic bus layout
  const renderSeatSelection = () => {
    if (!selectedBus) return null

    const totalSeats = selectedBus.totalSeats
    const rows = Math.ceil(totalSeats / 4) // 4 seats per row (2 on each side with aisle)

    return (
      <div className="space-y-6 animate-fade-in">
        <button onClick={() => setStep(1)} className="flex items-center text-indigo-600 hover:text-indigo-700">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Buses</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Select a Seat for {selectedBus.name}</h3>

          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-600 rounded"></div>
              <span>Selected</span>
            </div>
          </div>

          {/* Bus front */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-12 bg-gray-300 rounded-t-3xl flex items-center justify-center text-gray-700 font-medium">
              Driver
            </div>
          </div>

          {/* Seats layout */}
          <div className="relative max-w-md mx-auto">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex justify-between mb-4">
                {/* Left side seats (2 seats) */}
                <div className="flex gap-2">
                  {[1, 2].map((seatInRow) => {
                    const seatNumber = rowIndex * 4 + seatInRow
                    if (seatNumber > totalSeats) return null

                    const isBooked = selectedBus.bookedSeats.includes(seatNumber)
                    const isSelected = selectedSeat === seatNumber

                    return (
                      <button
                        key={seatNumber}
                        onClick={() => !isBooked && handleSeatSelect(seatNumber)}
                        className={`
                          relative w-12 h-12 rounded-t-lg font-medium
                          transition-all duration-200 transform hover:scale-105
                          ${
                            isBooked
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-green-500 text-white hover:bg-green-600"
                          }
                        `}
                        disabled={isBooked}
                      >
                        {seatNumber}
                      </button>
                    )
                  })}
                </div>

                {/* Aisle */}
                <div className="w-16 h-12 flex items-center justify-center text-gray-400 text-xs">Aisle</div>

                {/* Right side seats (2 seats) */}
                <div className="flex gap-2">
                  {[3, 4].map((seatInRow) => {
                    const seatNumber = rowIndex * 4 + seatInRow
                    if (seatNumber > totalSeats) return null

                    const isBooked = selectedBus.bookedSeats.includes(seatNumber)
                    const isSelected = selectedSeat === seatNumber

                    return (
                      <button
                        key={seatNumber}
                        onClick={() => !isBooked && handleSeatSelect(seatNumber)}
                        className={`
                          relative w-12 h-12 rounded-t-lg font-medium
                          transition-all duration-200 transform hover:scale-105
                          ${
                            isBooked
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-green-500 text-white hover:bg-green-600"
                          }
                        `}
                        disabled={isBooked}
                      >
                        {seatNumber}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Back row / emergency exit */}
            <div className="mt-8 border-t-2 border-gray-300 pt-4 text-center text-sm text-gray-500">Emergency Exit</div>
          </div>
        </div>
      </div>
    )
  }

  const renderPassengerForm = () => (
    <div className="space-y-6 animate-fade-in" onSubmit={handleSubmit}>
      <button onClick={() => setStep(2)} className="flex items-center text-indigo-600 hover:text-indigo-700">
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Seats</span>
      </button>

      <h3 className="text-2xl font-bold text-gray-900">Passenger Information</h3>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleBooking} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={passengerInfo.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={passengerInfo.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={passengerInfo.phone}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md
                     hover:bg-indigo-700 focus:outline-none focus:ring-2
                     focus:ring-indigo-500 focus:ring-offset-2"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )

  // Add a new function to render the payment step
  const renderPaymentStep = () => (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => setStep(3)} className="flex items-center text-indigo-600 hover:text-indigo-700">
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Passenger Details</span>
      </button>

      <h3 className="text-2xl font-bold text-gray-900">Payment Method</h3>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setPaymentMethod("mtn")}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 
                        ${paymentMethod === "mtn" ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:border-yellow-300"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center text-white font-bold">
                  MTN
                </div>
                <div>
                  <h4 className="font-medium">MTN Mobile Money</h4>
                  <p className="text-sm text-gray-500">Pay with your MTN MoMo account</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod("orange")}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 
                        ${paymentMethod === "orange" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
                  OM
                </div>
                <div>
                  <h4 className="font-medium">Orange Money</h4>
                  <p className="text-sm text-gray-500">Pay with your Orange Money account</p>
                </div>
              </div>
            </div>
          </div>

          {paymentMethod && (
            <div className="mt-6 p-4 border rounded-lg">
              <h4 className="font-medium mb-4">
                {paymentMethod === "mtn" ? "MTN Mobile Money" : "Orange Money"} Payment
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  You will receive a prompt on your phone to confirm payment of{" "}
                  <span className="font-medium">{selectedBus?.price} XAF</span>
                </p>

                <button
                  onClick={handlePaymentComplete}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium
                           ${
                             paymentMethod === "mtn"
                               ? "bg-yellow-500 hover:bg-yellow-600"
                               : "bg-orange-500 hover:bg-orange-600"
                           }`}
                >
                  Pay {selectedBus?.price} XAF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderConfirmation = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Bus</p>
              <p className="font-medium">{selectedBus?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Route</p>
              <p className="font-medium">{selectedBus?.route}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{selectedBus?.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Seat Number</p>
              <p className="font-medium">{selectedSeat}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">{selectedBus?.price} XAF</p>
            </div>
          </div>
        </div>

        <p className="text-green-600 mb-6">We've sent the confirmation details to your email.</p>

        <button
          onClick={() => {
            setStep(1)
            setSelectedBus(null)
            setSelectedSeat(null)
            setPassengerInfo({ name: "", email: "", phone: "" })
            setPaymentMethod(null)
          }}
          className="bg-indigo-600 text-white py-2 px-6 rounded-md
                   hover:bg-indigo-700 focus:outline-none focus:ring-2
                   focus:ring-indigo-500 focus:ring-offset-2"
        >
          Book Another Ticket
        </button>
      </div>
    </div>
  )

  // Update the return statement to include the payment step
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Bus Ticket Booking</h2>
        </div>

        <div className="mt-4 flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex-1 relative ${
                stepNumber < 5
                  ? 'after:content-[""] after:h-1 after:w-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:bg-gray-200'
                  : ""
              }`}
            >
              <div className="relative z-10 flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
              </div>
              <div className="mt-2 text-center text-sm text-gray-500">
                {stepNumber === 1 && "Select Bus"}
                {stepNumber === 2 && "Choose Seat"}
                {stepNumber === 3 && "Details"}
                {stepNumber === 4 && "Payment"}
                {stepNumber === 5 && "Confirm"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <>
          {renderSearchBar()}
          {renderBusSelection()}
        </>
      )}
      {step === 2 && renderSeatSelection()}
      {step === 3 && renderPassengerForm()}
      {step === 4 && renderPaymentStep()}
      {step === 5 && renderConfirmation()}
    </div>
  )
}


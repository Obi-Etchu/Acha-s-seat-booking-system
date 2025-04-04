import React from 'react';
import { Bus } from 'lucide-react';

const Welcome = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl w-full animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Bus className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
            Welcome to BusBooker
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 animate-slide-up delay-200">
            Book your bus tickets easily and securely. Travel with comfort and peace of mind.
          </p>
          
          <div className="space-y-4 mb-8 text-left animate-slide-up delay-400">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-gray-700">Easy online booking</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-gray-700">Real-time seat availability</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-gray-700">Instant confirmation</span>
            </div>
          </div>
          
          <button
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold 
                     transform transition duration-200 hover:scale-105 hover:bg-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                     animate-bounce-subtle"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
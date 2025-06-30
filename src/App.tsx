import React from 'react';
import Device from './components/HeyStar/Device';
import Door from './components/HeyStar/Door';
import Middleware from './components/Middleware/Server';
import Application from './components/School/Application';
import EventLog from './components/EventLog/EventLog';
import DataFlow from './components/Communication/DataFlow';
import useSystemFlow from './hooks/useSystemFlow';

function App() {
  const { state, processUserScan } = useSystemFlow();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            School Attendance Tracking & Access Control System
          </h1>
          <p className="text-gray-600">
            Interactive visualization of HeyStar palm vein recognition system integration
          </p>
        </div>

        {/* Main System Layout */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left Panel - HeyStar Device */}
            <div className="lg:col-span-1">
              <div className="flex flex-col space-y-4">
                <Device
                  onUserScan={processUserScan}
                  isScanning={state.isProcessing}
                  scanStatus={state.scanStatus}
                  identifiedUser={state.identifiedUser}
                />
                <Door
                  isOpen={state.doorState.isOpen}
                  isOpening={state.doorState.isOpening}
                />
              </div>
            </div>

            {/* Middle Panel - Middleware */}
            <div className="lg:col-span-1">
              <Middleware
                isProcessing={state.isProcessing}
                processingStep={state.middlewareStep}
                tcpActive={state.communicationState.tcpActive}
                httpActive={state.communicationState.httpToAppActive}
              />
            </div>

            {/* Right Panel - School Application */}
            <div className="lg:col-span-2">
              <Application
                isProcessing={state.isProcessing}
                processingStep={state.appStep}
                currentSession={state.currentSession}
                attendanceLog={state.attendanceLog}
                dbLookupActive={state.dbLookupActive}
              />
            </div>
          </div>

          {/* Communication Flow Overlay */}
          <DataFlow
            tcpActive={state.communicationState.tcpActive}
            httpToAppActive={state.communicationState.httpToAppActive}
            httpToMiddlewareActive={state.communicationState.httpToMiddlewareActive}
            tcpToDeviceActive={state.communicationState.tcpToDeviceActive}
          />
        </div>

        {/* Bottom Panel - Event Log */}
        <EventLog events={state.events} />

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            How to Use This Visualization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-1">Security Agent</h4>
              <p className="text-red-700">
                Demonstrates basic access control for security personnel with immediate door access.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-1">Teacher (AHMED)</h4>
              <p className="text-blue-700">
                Shows session management - starting a new Biology 101 class and preparing for student attendance.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-1">Student (MOHAMMED)</h4>
              <p className="text-green-700">
                Demonstrates attendance tracking - requires active session and enrollment verification before access.
              </p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-1">Important Logic</h4>
            <p className="text-yellow-700 text-sm">
              Students can only gain access when there's an active session initiated by a teacher. Try scanning AHMED first to start a session, then scan MOHAMMED to see the enrollment verification process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
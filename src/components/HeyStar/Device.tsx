import React, { useState } from 'react';
import { Scan, User, UserCheck, Shield } from 'lucide-react';

interface DeviceProps {
  onUserScan: (userType: 'security' | 'teacher' | 'student') => void;
  isScanning: boolean;
  scanStatus: string;
  identifiedUser: string;
}

const Device: React.FC<DeviceProps> = ({ onUserScan, isScanning, scanStatus, identifiedUser }) => {
  const [showHand, setShowHand] = useState(false);

  const handleScan = (userType: 'security' | 'teacher' | 'student') => {
    setShowHand(true);
    onUserScan(userType);
    setTimeout(() => setShowHand(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Scan className="text-blue-600" size={20} />
        HeyStar Palm Vein Device
      </h3>
      
      {/* Device Visual */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4 mb-4">
        <div className="bg-black rounded-md p-4 relative overflow-hidden">
          {/* Scan Area */}
          <div className={`w-32 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center relative transition-all duration-500 ${
            isScanning ? 'animate-pulse' : ''
          }`}>
            <div className="text-white text-xs font-medium">Palm Scan Area</div>
            
            {/* Animated Hand */}
            {showHand && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-20 bg-orange-200 rounded-full animate-pulse opacity-80"></div>
              </div>
            )}
          </div>
          
          {/* Status Display */}
          <div className="mt-3 text-center">
            <div className="text-green-400 text-sm font-mono">
              {scanStatus}
            </div>
            {identifiedUser && (
              <div className="text-yellow-400 text-xs mt-1">
                {identifiedUser}
              </div>
            )}
          </div>
        </div>
        
        {/* Device Label */}
        <div className="text-center mt-2">
          <div className="text-gray-400 text-xs">recModePalmEnable: ON</div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => handleScan('security')}
          disabled={isScanning}
          className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
        >
          <Shield size={16} />
          Scan as Security Agent
        </button>
        
        <button
          onClick={() => handleScan('teacher')}
          disabled={isScanning}
          className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
        >
          <UserCheck size={16} />
          Scan as Teacher (AHMED)
        </button>
        
        <button
          onClick={() => handleScan('student')}
          disabled={isScanning}
          className="w-full flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
        >
          <User size={16} />
          Scan as Student (MOHAMMED)
        </button>
      </div>
    </div>
  );
};

export default Device;
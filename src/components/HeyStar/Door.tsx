import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface DoorProps {
  isOpen: boolean;
  isOpening: boolean;
}

const Door: React.FC<DoorProps> = ({ isOpen, isOpening }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 ml-4">
      <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
        {isOpen ? <Unlock className="text-green-600" size={18} /> : <Lock className="text-red-600" size={18} />}
        Access Door
      </h4>
      
      <div className="relative">
        {/* Door Frame */}
        <div className="w-20 h-32 bg-gray-300 rounded-lg relative overflow-hidden">
          {/* Door */}
          <div className={`absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 rounded-lg transition-transform duration-1000 ${
            isOpen ? 'transform -translate-x-full' : ''
          } ${isOpening ? 'animate-pulse' : ''}`}>
            {/* Door Handle */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
            
            {/* Door Panels */}
            <div className="absolute inset-2 border border-amber-600 rounded-md"></div>
            <div className="absolute top-1/2 left-2 right-2 h-px bg-amber-600"></div>
          </div>
          
          {/* Door Frame Shadow */}
          <div className="absolute inset-0 border-2 border-gray-400 rounded-lg pointer-events-none"></div>
        </div>
        
        {/* Status */}
        <div className="text-center mt-2">
          <div className={`text-xs font-medium ${
            isOpen ? 'text-green-600' : 'text-red-600'
          }`}>
            {isOpening ? 'Opening...' : isOpen ? 'OPEN' : 'LOCKED'}
          </div>
          <div className="text-gray-500 text-xs mt-1">
            pciRelayDelay: 3s
          </div>
        </div>
      </div>
    </div>
  );
};

export default Door;
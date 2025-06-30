import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DataFlowProps {
  tcpActive: boolean;
  httpToAppActive: boolean;
  httpToMiddlewareActive: boolean;
  tcpToDeviceActive: boolean;
}

const DataFlow: React.FC<DataFlowProps> = ({ 
  tcpActive, 
  httpToAppActive, 
  httpToMiddlewareActive, 
  tcpToDeviceActive 
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* TCP: Device to Middleware */}
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
        <div className="flex items-center">
          <div className={`h-0.5 w-32 transition-all duration-300 ${
            tcpActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
          }`} style={{ borderStyle: 'dashed', borderWidth: '1px 0' }}></div>
          <ArrowRight className={`ml-1 ${
            tcpActive ? 'text-blue-500' : 'text-gray-400'
          }`} size={16} />
        </div>
        <div className="text-xs text-blue-600 mt-1 font-medium">
          TCP Communication
        </div>
      </div>
      
      {/* HTTP: Middleware to App */}
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2">
        <div className="flex items-center">
          <div className={`h-0.5 w-32 transition-all duration-300 ${
            httpToAppActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
          }`}></div>
          <ArrowRight className={`ml-1 ${
            httpToAppActive ? 'text-green-500' : 'text-gray-400'
          }`} size={16} />
        </div>
        <div className="text-xs text-green-600 mt-1 font-medium">
          HTTP POST Request
        </div>
      </div>
      
      {/* HTTP: App to Middleware (return) */}
      <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
        <div className="flex items-center">
          <ArrowRight className={`mr-1 rotate-180 ${
            httpToMiddlewareActive ? 'text-orange-500' : 'text-gray-400'
          }`} size={16} />
          <div className={`h-0.5 w-32 transition-all duration-300 ${
            httpToMiddlewareActive ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'
          }`}></div>
        </div>
        <div className="text-xs text-orange-600 mt-1 font-medium">
          HTTP Response
        </div>
      </div>
      
      {/* TCP: Middleware to Device (return) */}
      <div className="absolute bottom-1/3 left-1/4 transform -translate-y-1/2">
        <div className="flex items-center">
          <ArrowRight className={`mr-1 rotate-180 ${
            tcpToDeviceActive ? 'text-red-500' : 'text-gray-400'
          }`} size={16} />
          <div className={`h-0.5 w-32 transition-all duration-300 ${
            tcpToDeviceActive ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
          }`} style={{ borderStyle: 'dashed', borderWidth: '1px 0' }}></div>
        </div>
        <div className="text-xs text-red-600 mt-1 font-medium">
          TCP Command
        </div>
      </div>
    </div>
  );
};

export default DataFlow;
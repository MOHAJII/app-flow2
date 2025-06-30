import React from 'react';
import { Server, ArrowRight, ArrowLeft } from 'lucide-react';

interface MiddlewareProps {
  isProcessing: boolean;
  processingStep: string;
  tcpActive: boolean;
  httpActive: boolean;
}

const Middleware: React.FC<MiddlewareProps> = ({ 
  isProcessing, 
  processingStep, 
  tcpActive, 
  httpActive 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 relative">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Server className="text-purple-600" size={20} />
        HeyStar Middleware
      </h3>
      
      {/* Server Visual */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg p-4 mb-4">
        <div className="space-y-2">
          {/* Server Rack */}
          <div className="bg-gray-800 rounded-md p-3">
            <div className="text-center text-white text-sm font-medium mb-2">
              TCP to HTTP Gateway
            </div>
            
            {/* Processing Status */}
            <div className="bg-black rounded-md p-2 text-center">
              <div className={`text-sm font-mono transition-colors ${
                isProcessing ? 'text-green-400 animate-pulse' : 'text-gray-500'
              }`}>
                {processingStep || 'Ready...'}
              </div>
            </div>
            
            {/* Connection Indicators */}
            <div className="flex justify-between mt-3">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  tcpActive ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                }`}></div>
                <span className="text-xs text-gray-300">TCP</span>
              </div>
              
              <ArrowRight className="text-gray-400" size={16} />
              
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  httpActive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
                }`}></div>
                <span className="text-xs text-gray-300">HTTP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* API Endpoints */}
      <div className="space-y-2 text-xs">
        <div className="bg-blue-50 rounded-md p-2">
          <div className="font-mono text-blue-800">sevUploadRecRecordUrl</div>
          <div className="text-blue-600">Device → Middleware (TCP)</div>
        </div>
        <div className="bg-green-50 rounded-md p-2">
          <div className="font-mono text-green-800">/api/device/output</div>
          <div className="text-green-600">Middleware → Device (HTTP)</div>
        </div>
      </div>
    </div>
  );
};

export default Middleware;
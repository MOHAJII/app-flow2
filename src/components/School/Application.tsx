import React from 'react';
import { Database, Users, Calendar, CheckCircle } from 'lucide-react';

interface ApplicationProps {
  isProcessing: boolean;
  processingStep: string;
  currentSession: {
    course: string;
    room: string;
    teacher: string;
    active: boolean;
  } | null;
  attendanceLog: Array<{
    name: string;
    timestamp: string;
    status: string;
  }>;
  dbLookupActive: boolean;
}

const Application: React.FC<ApplicationProps> = ({ 
  isProcessing, 
  processingStep, 
  currentSession, 
  attendanceLog,
  dbLookupActive 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Users className="text-indigo-600" size={20} />
        School Management System
      </h3>
      
      {/* Application Status */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Database className={`${dbLookupActive ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} size={16} />
          <span className="text-sm font-medium text-gray-700">Database Status</span>
        </div>
        
        <div className={`text-sm font-mono transition-colors ${
          isProcessing ? 'text-indigo-600 animate-pulse' : 'text-gray-500'
        }`}>
          {processingStep || 'Waiting for requests...'}
        </div>
      </div>
      
      {/* Current Session */}
      <div className="mb-4">
        <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Calendar className="text-blue-600" size={16} />
          Current Session
        </h4>
        
        {currentSession && currentSession.active ? (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-blue-800">Course:</span>
                <span className="text-sm text-blue-700">{currentSession.course}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-blue-800">Room:</span>
                <span className="text-sm text-blue-700">{currentSession.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-blue-800">Teacher:</span>
                <span className="text-sm text-blue-700">{currentSession.teacher}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-sm text-gray-500 text-center">
              No active session
            </div>
          </div>
        )}
      </div>
      
      {/* Attendance Log */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <CheckCircle className="text-green-600" size={16} />
          Attendance Log
        </h4>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 max-h-32 overflow-y-auto">
          {attendanceLog.length > 0 ? (
            <div className="space-y-2">
              {attendanceLog.map((entry, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-800">{entry.name}</span>
                  <div className="text-right">
                    <div className="text-green-600 font-medium">{entry.status}</div>
                    <div className="text-gray-500 text-xs">{entry.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center">
              No attendance records
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
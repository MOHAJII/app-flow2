import React, { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

interface EventLogProps {
  events: Array<{
    timestamp: string;
    message: string;
    type: 'device' | 'middleware' | 'app' | 'door';
  }>;
}

const EventLog: React.FC<EventLogProps> = ({ events }) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [events]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'device': return 'text-blue-600';
      case 'middleware': return 'text-purple-600';
      case 'app': return 'text-indigo-600';
      case 'door': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Clock className="text-gray-600" size={20} />
        Real-time Event Log
      </h3>
      
      <div 
        ref={logRef}
        className="bg-gray-900 rounded-lg p-4 h-40 overflow-y-auto font-mono text-sm"
      >
        {events.length > 0 ? (
          <div className="space-y-1">
            {events.map((event, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-400 text-xs min-w-fit">
                  {event.timestamp}
                </span>
                <span className={`${getEventColor(event.type)} text-xs`}>
                  {event.message}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center text-xs">
            Waiting for events...
          </div>
        )}
      </div>
    </div>
  );
};

export default EventLog;
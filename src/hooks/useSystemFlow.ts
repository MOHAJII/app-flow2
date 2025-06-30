import { useState, useCallback } from 'react';

interface SystemState {
  isProcessing: boolean;
  scanStatus: string;
  identifiedUser: string;
  middlewareStep: string;
  appStep: string;
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
  events: Array<{
    timestamp: string;
    message: string;
    type: 'device' | 'middleware' | 'app' | 'door';
  }>;
  doorState: {
    isOpen: boolean;
    isOpening: boolean;
  };
  communicationState: {
    tcpActive: boolean;
    httpToAppActive: boolean;
    httpToMiddlewareActive: boolean;
    tcpToDeviceActive: boolean;
  };
  dbLookupActive: boolean;
}

const useSystemFlow = () => {
  const [state, setState] = useState<SystemState>({
    isProcessing: false,
    scanStatus: 'Ready to Scan',
    identifiedUser: '',
    middlewareStep: 'Ready...',
    appStep: 'Waiting for requests...',
    currentSession: null,
    attendanceLog: [],
    events: [],
    doorState: {
      isOpen: false,
      isOpening: false,
    },
    communicationState: {
      tcpActive: false,
      httpToAppActive: false,
      httpToMiddlewareActive: false,
      tcpToDeviceActive: false,
    },
    dbLookupActive: false,
  });

  const addEvent = useCallback((message: string, type: 'device' | 'middleware' | 'app' | 'door') => {
    const timestamp = new Date().toLocaleTimeString();
    setState(prev => ({
      ...prev,
      events: [...prev.events, { timestamp, message, type }],
    }));
  }, []);

  const updateState = useCallback((updates: Partial<SystemState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetCommunication = useCallback(() => {
    setState(prev => ({
      ...prev,
      communicationState: {
        tcpActive: false,
        httpToAppActive: false,
        httpToMiddlewareActive: false,
        tcpToDeviceActive: false,
      },
    }));
  }, []);

  const openDoor = useCallback(() => {
    setState(prev => ({
      ...prev,
      doorState: { isOpen: false, isOpening: true },
    }));
    
    addEvent('Door: Opening...', 'door');
    
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        doorState: { isOpen: true, isOpening: false },
      }));
      addEvent('Door: Opened', 'door');
      
      // Close door after 3 seconds (pciRelayDelay)
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          doorState: { isOpen: false, isOpening: false },
        }));
        addEvent('Door: Closed', 'door');
      }, 3000);
    }, 1000);
  }, [addEvent]);

  const processUserScan = useCallback(async (userType: 'security' | 'teacher' | 'student') => {
    const userNames = {
      security: 'Agent Smith',
      teacher: 'AHMED',
      student: 'MOHAMMED',
    };

    const userName = userNames[userType];
    
    setState(prev => ({
      ...prev,
      isProcessing: true,
      scanStatus: 'Identifying User...',
      identifiedUser: '',
    }));

    addEvent(`Device: Scanning palm for ${userName}`, 'device');

    // Step 1: Device identification
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        scanStatus: `User Identified: ${userName}`,
        identifiedUser: userName,
        communicationState: { ...prev.communicationState, tcpActive: true },
      }));
      addEvent(`Device: User '${userName}' identified`, 'device');
    }, 1000);

    // Step 2: TCP to Middleware
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        middlewareStep: 'Processing TCP Data...',
      }));
      addEvent('Middleware: TCP received, converting...', 'middleware');
    }, 1500);

    // Step 3: Middleware processing
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        middlewareStep: 'Converting to HTTP Request...',
        communicationState: { 
          ...prev.communicationState, 
          tcpActive: false, 
          httpToAppActive: true 
        },
      }));
      addEvent('Middleware: Converting TCP to HTTP', 'middleware');
    }, 2000);

    // Step 4: HTTP to App
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        appStep: `Processing ${userType} request...`,
        dbLookupActive: true,
      }));
      addEvent(`Custom App: Received ${userType} identification`, 'app');
    }, 2500);

    // Step 5: App processing based on user type
    setTimeout(async () => {
      if (userType === 'security') {
        setState(prev => ({
          ...prev,
          appStep: 'User is Security Agent. Opening door.',
          dbLookupActive: false,
        }));
        addEvent('Custom App: Security access granted', 'app');
      } else if (userType === 'teacher') {
        setState(prev => ({
          ...prev,
          appStep: 'User is Teacher. Checking schedule...',
        }));
        addEvent('Custom App: Checking teacher schedule', 'app');
        
        // Simulate database lookup
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            appStep: 'Class Scheduled: Biology 101 - Room 301. Starting session...',
            currentSession: {
              course: 'Biology 101',
              room: 'Room 301',
              teacher: 'AHMED',
              active: true,
            },
            dbLookupActive: false,
          }));
          addEvent('Custom App: Biology 101 session started by AHMED', 'app');
        }, 1000);
      } else if (userType === 'student') {
        setState(prev => ({
          ...prev,
          appStep: 'User is Student. Checking for active session...',
        }));
        addEvent('Custom App: Checking for active session', 'app');
        
        // Check for active session first
        setTimeout(() => {
          setState(prev => {
            if (prev.currentSession && prev.currentSession.active) {
              return {
                ...prev,
                appStep: `Active session (${prev.currentSession.course}) found, initiated by ${prev.currentSession.teacher}. Verifying MOHAMMED's enrollment...`,
              };
            } else {
              return {
                ...prev,
                appStep: 'No active session found. Access denied.',
                dbLookupActive: false,
              };
            }
          });
          
          // Check if there's an active session
          setState(currentState => {
            if (currentState.currentSession && currentState.currentSession.active) {
              addEvent(`Custom App: Active session found - ${currentState.currentSession.course}`, 'app');
              return currentState;
            } else {
              addEvent('Custom App: No active session - Access denied', 'app');
              return {
                ...currentState,
                isProcessing: false,
                scanStatus: 'Ready to Scan',
                identifiedUser: '',
                middlewareStep: 'Ready...',
                appStep: 'Waiting for requests...',
                communicationState: {
                  tcpActive: false,
                  httpToAppActive: false,
                  httpToMiddlewareActive: false,
                  tcpToDeviceActive: false,
                },
              };
            }
          });
        }, 1000);
        
        // If session exists, check enrollment
        setTimeout(() => {
          setState(prev => {
            if (prev.currentSession && prev.currentSession.active) {
              return {
                ...prev,
                appStep: 'Student MOHAMMED is enrolled. Marking present.',
                dbLookupActive: false,
              };
            }
            return prev;
          });
          
          setState(currentState => {
            if (currentState.currentSession && currentState.currentSession.active) {
              const timestamp = new Date().toLocaleTimeString();
              addEvent('Custom App: MOHAMMED enrollment verified', 'app');
              return {
                ...currentState,
                attendanceLog: [
                  ...currentState.attendanceLog,
                  {
                    name: 'MOHAMMED',
                    timestamp,
                    status: 'Present',
                  },
                ],
              };
            }
            return currentState;
          });
        }, 2000);
      }
    }, 3000);

    // Step 6: Send door command (only if access should be granted)
    setTimeout(() => {
      setState(prev => {
        // For students, only proceed if there's an active session
        if (userType === 'student' && (!prev.currentSession || !prev.currentSession.active)) {
          return prev; // Don't proceed with door opening
        }
        
        return {
          ...prev,
          communicationState: { 
            ...prev.communicationState, 
            httpToAppActive: false, 
            httpToMiddlewareActive: true 
          },
        };
      });
      
      // Check if we should send door command
      setState(currentState => {
        if (userType === 'student' && (!currentState.currentSession || !currentState.currentSession.active)) {
          return currentState; // Don't send door command
        }
        addEvent('Custom App: Sending door open command', 'app');
        return currentState;
      });
    }, 4500);

    // Step 7: Back to middleware (only if door command was sent)
    setTimeout(() => {
      setState(prev => {
        if (userType === 'student' && (!prev.currentSession || !prev.currentSession.active)) {
          return prev;
        }
        
        return {
          ...prev,
          middlewareStep: 'Received door command. Converting to TCP...',
          communicationState: { 
            ...prev.communicationState, 
            httpToMiddlewareActive: false, 
            tcpToDeviceActive: true 
          },
        };
      });
      
      setState(currentState => {
        if (userType === 'student' && (!currentState.currentSession || !currentState.currentSession.active)) {
          return currentState;
        }
        addEvent('Middleware: Converting HTTP to TCP', 'middleware');
        return currentState;
      });
    }, 5000);

    // Step 8: TCP to device (only if previous steps succeeded)
    setTimeout(() => {
      setState(prev => {
        if (userType === 'student' && (!prev.currentSession || !prev.currentSession.active)) {
          return prev;
        }
        
        return {
          ...prev,
          communicationState: { 
            ...prev.communicationState, 
            tcpToDeviceActive: false 
          },
        };
      });
      
      setState(currentState => {
        if (userType === 'student' && (!currentState.currentSession || !currentState.currentSession.active)) {
          return currentState;
        }
        addEvent('Device: Received door open command', 'device');
        openDoor();
        return currentState;
      });
    }, 5500);

    // Step 9: Reset states and log final event
    setTimeout(() => {
      setState(prev => {
        // Log appropriate final event
        if (userType === 'student') {
          if (prev.currentSession && prev.currentSession.active) {
            addEvent(`Student MOHAMMED marked present for ${prev.currentSession.course}`, 'app');
          }
        }
        
        return {
          ...prev,
          isProcessing: false,
          scanStatus: 'Ready to Scan',
          identifiedUser: '',
          middlewareStep: 'Ready...',
          appStep: 'Waiting for requests...',
        };
      });
      resetCommunication();
    }, 6000);

  }, [addEvent, openDoor, resetCommunication]);

  return {
    state,
    processUserScan,
    updateState,
    addEvent,
  };
};

export default useSystemFlow;
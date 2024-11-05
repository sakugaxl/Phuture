import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <div className={`fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0 transition duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          <main className="flex-1 min-w-0 overflow-auto">
            <div className="sticky top-0 z-10 lg:hidden bg-white border-b border-gray-200 px-4 py-2">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                <AppRoutes />
              </div>
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

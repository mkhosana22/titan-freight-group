import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const QuotePage = lazy(() => import('./components/QuotePage'));

const CenteredSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full py-20 bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-steelBlue border-t-logisticsOrange"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/quote" 
          element={
            <Suspense fallback={<CenteredSpinner />}>
              <QuotePage />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
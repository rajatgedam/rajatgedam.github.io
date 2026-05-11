import './styles/main.scss';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRoutes from './routes/BaseRoutes';
import Preloader from './components/UIElements/Preloader/Preloader';

const App = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Router basename={process.env.PUBLIC_URL}>
        <BaseRoutes />
      </Router>
    </Suspense>
  );
};

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';
import AppNavbar from './components/AppNavbar';
const App = () => {
  return (
    <React.Fragment>
      <AppNavbar />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </React.Fragment>

  );
};
export default App;
import React from 'react';
import './App.css';
import Menu from './components/MenuComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import './'

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">
            Ristorante Confusion
          </NavbarBrand>
        </div>
      </Navbar>
      <Menu />
    </div>
  );
}

export default App;

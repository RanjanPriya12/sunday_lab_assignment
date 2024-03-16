import React from 'react';
import './App.css';
import Home from './components/home';
import { Route, Router, Routes } from 'react-router-dom';
import MyPdfComponent from './components/viewPdf';
import { Navbar } from './components/navbar';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/reports/:id" element={<MyPdfComponent/>}/>
      </Routes>
    </>
  );
};

export default App;

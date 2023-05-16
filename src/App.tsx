/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {Form, Container, Row, Card} from 'react-bootstrap';
import './App.scss';
import FoodGroup from './food-group';
import DogGroup from './dog-group';
import FoodTransitionResult from './food-transition-result';
import { CaloriePair } from './interfaces';
import Footer from './footer';
import { Routes, Route } from 'react-router-dom';
import Calculator from './calculator';
import Learn from './learn';
import Header from './header';


function App() {
  return(
    <div className='App d-flex'>
      <Container id='app-container'>

        <Header />

        <Card className='border-standard app-card px-3 mb-2'>
          <Routes>
            <Route path='/' element={<Calculator />} />
            <Route path='/learn' element={<Learn />} />
          </Routes>
        </Card>

        <Footer />

      </Container>
    </div>
  )

}

export default App;

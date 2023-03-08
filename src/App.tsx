/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {Form, Container, Row, Card} from 'react-bootstrap';
import './App.scss';
import FoodGroup from './food-group';
import DogGroup from './dog-group';

function App() {

  const [caloriesResult, setCaloriesResult] = useState<string>('___ calories');
  const [caloriesMin, setCaloriesMin] = useState<number>(0);
  const [caloriesMax, setCaloriesMax] = useState<number>(-1);

  const [foodResult, setFoodResult] = useState<string>('');

  const [finalCaloriesResult, setFinalCaloriesResult] = useState<string>('___ calories');
  const [finalFoodResult, setFinalFoodResult] = useState<string>('');

  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitEnabled) {
      setFinalCaloriesResult(caloriesResult);
      setFinalFoodResult(foodResult);
    }
  }

  return (
    <div className='App d-flex'>
      <Container id='app-container'>
        <Row>
          <h1 className='logo-text'>Dog Calorie Calculator</h1>
        </Row>
        <Card className='border-standard app-card px-3 mb-4'>
          <Row>
            <Form onSubmit={handleSubmit}>

              <DogGroup
                setSubmitEnabled={(enabled: boolean) => setSubmitEnabled(enabled)}
                onCaloriesMinChange={(min: number) => setCaloriesMin(min)}
                onCaloriesMaxChange={(max: number) => setCaloriesMax(max)}
                onCaloriesResultChange={(result: string) => setCaloriesResult(result)}
              />

              <FoodGroup 
                min={caloriesMin}
                max={caloriesMax}
                onResultChange={(result: string) => setFoodResult(result)}
              />

              <button type='submit' id='submitButton' className='border-standard mb-3' disabled={!submitEnabled}>Submit</button>
            </Form>

            <h1 id='calorie-result' className='mb-3'>{finalCaloriesResult}</h1>
            <h1 id='food-result' className='mb-3'>{finalFoodResult}</h1>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default App;

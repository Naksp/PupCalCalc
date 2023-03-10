/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {Form, Container, Row, Card} from 'react-bootstrap';
import './App.scss';
import FoodGroup from './food-group';
import DogGroup from './dog-group';
import FoodTransitionResult from './food-transition-result';

function App() {

  const [caloriesResult, setCaloriesResult] = useState<string>('');
  const [caloriesMin, setCaloriesMin] = useState<number>(0);
  const [caloriesMax, setCaloriesMax] = useState<number>(-1);

  const [foodResult, setFoodResult] = useState<string>('');
  const [foodTransitionMode, setFoodTransitionMode] = useState<boolean>(false);
  const [foodTransitionData, setFoodTransitionData] = useState<string[]>([]);

  const [finalCaloriesResult, setFinalCaloriesResult] = useState<string>('');
  const [finalFoodResult, setFinalFoodResult] = useState<string>('');
  const [finalFoodTransitionData, setFinalFoodTransitionData] = useState<string[]>([]);

  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitEnabled) {
      setFinalCaloriesResult(caloriesResult);
      setFinalFoodResult(foodResult);
      setFinalFoodTransitionData(foodTransitionData);
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
                onTransitionModeChange={(enabled: boolean) => setFoodTransitionMode(enabled)}
                onTransitionDataChange={(data: string[]) => setFoodTransitionData(data)}
              />

              <button type='submit' id='submitButton' className='border-standard mb-3' disabled={!submitEnabled}>Submit</button>
            </Form>

            <h1 id='calorie-result' className='mb-3'>{finalCaloriesResult}</h1>
            {foodTransitionMode && finalFoodTransitionData.length > 0
              ? <FoodTransitionResult display={!!finalCaloriesResult} data={finalFoodTransitionData}/>
              : <h1 id='food-result' className='mb-3'>{finalFoodResult}</h1>
            }
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default App;

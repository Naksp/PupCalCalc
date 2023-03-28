/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {Form, Container, Row, Card} from 'react-bootstrap';
import './App.scss';
import FoodGroup from './food-group';
import DogGroup from './dog-group';
import FoodTransitionResult from './food-transition-result';
import { CaloriePair } from './interfaces';

function App() {

  const [caloriesResult, setCaloriesResult] = useState<string>('');
  const [calories, setCalories] = useState<CaloriePair>({min: -1, max: -1});

  const [foodResult, setFoodResult] = useState<string>('');
  const [foodTransitionMode, setFoodTransitionMode] = useState<boolean>(false);
  const [foodTransitionData, setFoodTransitionData] = useState<string[]>([]);

  const [includeTreats, setIncludeTreats] = useState<boolean>(false);

  const [treatsResult, setTreatsResult] = useState<string>('');
  const [finalTreatsResult, setFinalTreatsResult] = useState<string>('');

  const [finalCaloriesResult, setFinalCaloriesResult] = useState<string>('');
  const [finalFoodResult, setFinalFoodResult] = useState<string>('');
  const [finalFoodTransitionData, setFinalFoodTransitionData] = useState<string[]>([]);

  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (submitEnabled) {
      setFinalCaloriesResult(caloriesResult);
      setFinalFoodResult(foodResult);
      setFinalFoodTransitionData(foodTransitionData);
      setFinalTreatsResult(includeTreats ? treatsResult : '');
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
                onBalancedCaloriesChange={(calories: CaloriePair) => {setCalories(calories); console.log(calories)}}
                onBalancedCaloriesResultChange={(result: string) => setCaloriesResult(result)}
                includeTreats={includeTreats}
                onTreatsCaloriesResultChange={(result: string) => setTreatsResult(result)}
              />

              <FoodGroup 
                calories={calories}
                onResultChange={(result: string) => setFoodResult(result)}
                onTransitionModeChange={(enabled: boolean) => setFoodTransitionMode(enabled)}
                onTransitionDataChange={(data: string[]) => setFoodTransitionData(data)}
              />


              <Row id="treat-switch-container" className="custom-switch-container mb-3">
                <Form.Switch
                  checked={includeTreats}
                  onChange={() => setIncludeTreats(!includeTreats)}
                  className="custom-switch"
                  id="treat-switch"
                  label="include treats" />
              </Row>

              <button type='submit' id='submitButton' className='border-standard mb-3' disabled={!submitEnabled}>Submit</button>

            </Form>

            <h1 id='calorie-result' className='mb-3'>{finalCaloriesResult}</h1>

            {foodTransitionMode && finalFoodTransitionData.length > 0 ? (
              <FoodTransitionResult display={!!finalCaloriesResult} data={finalFoodTransitionData}/>
            ) : (
              <h1 id='food-result' className={`${finalFoodResult ? 'mb-3' : 'mb-0'}`}>{finalFoodResult}</h1>
            )}

            { finalTreatsResult ? (
              <h1 id="treat-result" className='mb-3'>{finalTreatsResult}</h1>
            ) : null
            }
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default App;

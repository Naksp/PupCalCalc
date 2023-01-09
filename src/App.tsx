import React, { useEffect, useState } from 'react';
import {Form, Container, Row, ButtonGroup} from 'react-bootstrap';
import './App.scss';

const Multipliers = {
  PUPPY_0_TO_4_MONTS: 3.0,
  PUPPY_4_TO_12_MONTHS: 2.0,

  INTACT_ADULT: 1.8,
  NEUTERED_ADULT: 1.6,

  INACTIVE_MIN: 1.2,
  INACTIVE_MAX: 1.4,
  ACTIVE_MIN: 2.0,
  ACTIVE_MAX: 5.0,

  WEIGHT_LOSS: 1.0,
  WEIGHT_GAIN_MIN: 1.2,
  WEIGHT_GAIN_MAX: 1.8,
}

function App() {

  const [result, setResult] = useState<number>();
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [goalMultiplier, setGoalMultiplier] = useState<number>(1.0);
  const [isAdult, setIsAdult] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      weightInput: HTMLInputElement;
    };

    const rer: number = caclulateRer(Number(formElements.weightInput.value));
    const n = rer * multiplier * goalMultiplier;

    setResult(n);
  }

  const caclulateRer = (weight: number): number => {
    return 70 * Math.pow(weight, 0.75);
  }

  useEffect(() => {
    if (multiplier === Multipliers.PUPPY_0_TO_4_MONTS || multiplier === Multipliers.PUPPY_4_TO_12_MONTHS) {
      var activityGroup = document.getElementById('activity-group');

      activityGroup?.setAttribute('display', 'none');
    }

  }, [multiplier])

  return (
    <div className='App'>
      <Container>
        <Row className='row'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Weight: </Form.Label>
              <Form.Control id='weightInput' type='number' />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Row>
                <Form.Label>Age</Form.Label>
              </Row>
              <Form.Check onChange={() => {setMultiplier(Multipliers.PUPPY_0_TO_4_MONTS); setIsAdult(false); }} type='radio' id='radio-puppy-young' label='Puppy 0 - 4 months' name='ageGroup' className='col' />
              <Form.Check onChange={() => { setMultiplier(Multipliers.PUPPY_4_TO_12_MONTHS); setIsAdult(false); }} type='radio' id='radio-puppy' label='Puppy 4 months to adult' name='ageGroup' className='col' />
              <Form.Check onChange={() => setIsAdult(true)} type='radio' id='radio-intact-adult' label='Adult' name='ageGroup' className='col' />
              <Form.Check onChange={() => setIsAdult(true)} type='radio' id='radio-neutered-adult' label='Neutered adult' name='ageGroup' className='col' />
            </Form.Group>
            { isAdult ?
              <div>
                <Form.Group id='activity-group' className='mb-4'>
                  <Row>
                    <Form.Label>How active is your dog?</Form.Label>
                  </Row>
                  <Form.Check onChange={() => setMultiplier(Multipliers.INACTIVE_MIN)} type='radio' id='radio-inactive' label='Inactive' name='activityGroup' className='col' />
                  <Form.Check onChange={() => setMultiplier(Multipliers.ACTIVE_MIN)} type='radio' id='radio-active' label='Active' name='activityGroup' className='col' />
                </Form.Group>
                <button type='submit'>Submit</button>
                </div>
                : null
            }
            <Form.Group id='goal-group' className='mb-4'>
              <Row>
                <Form.Label>How active is your dog?</Form.Label>
              </Row>
              <Form.Check onChange={() => setGoalMultiplier(Multipliers.WEIGHT_LOSS)} type='radio' id='radio-weight-loss' label='Weight loss' name='activityGroup' className='col' />
              <Form.Check onChange={() => setGoalMultiplier(Multipliers.WEIGHT_GAIN_MIN)} type='radio' id='radio-weight-gain' label='Weight gain' name='activityGroup' className='col' />
            </Form.Group>
          </Form>

          <p>{isAdult}</p>
          <p id='calorie-result'>{result}</p>
          <p>Age multiplier: {multiplier}</p>
        </Row>
      </Container>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import {Form, Container, Row, ButtonGroup, ToggleButton, Col} from 'react-bootstrap';
import { Constants } from './Constants';
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

// Radios
const ageRadios = [
  { name: 'Puppy (<1 year old)', value: 'puppy' },
  { name: 'Adult (>1 year old)', value: 'adult' },
];

const puppyAgeRadios = [
  { name: '<4 Months', value: 'lessThanFourMonths' },
  { name: '4 - 12 Months', value: 'greaterThanFourMonths' },
];

const activityRadios = [
  { name: 'Inactive', value: 'inactive' },
  { name: 'Moderately active', value: 'moderatelyActive'},
  { name: 'Active', value: 'active' },
];

const neuteredRadios = [
  { name: 'Neutered', value: 'neutered' },
  { name: 'Intact', value: 'intact' },
];

function App() {

  const [result, setResult] = useState<number>();
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [goalMultiplier, setGoalMultiplier] = useState<number>(1.0);
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [isNeutered, setIsNeutered] = useState<boolean>(true);

  const [ageRadioValue, setAgeRadioValue] = useState<string>(ageRadios[0].value);
  const [puppyAgeRadioValue, setPuppyAgeRadioValue] = useState<string>(puppyAgeRadios[0].value);
  const [activityRadioValue, setActivityRadioValue] = useState<string>(activityRadios[0].value);
  const [neuteredRadioValue, setNeuteredRadioValue] = useState<string>(neuteredRadios[0].value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      weightInput: HTMLInputElement;
    };

    const rer: number = caclulateRer(Number(formElements.weightInput.value));
    const n = rer * multiplier;

    setResult(n);
  }

  const caclulateRer = (weight: number): number => {
    return 70 * Math.pow(weight, 0.75);
  }

  const handleAgeChange = (value: string) => {
    setIsAdult(value === 'adult');
    setAgeRadioValue(value);
  }

  const handlePuppyAgeChange = (value: string) => {
    setPuppyAgeRadioValue(value);
    if (value === puppyAgeRadios[0].value) {
      setMultiplier(Multipliers.PUPPY_0_TO_4_MONTS);
    } else {
      setMultiplier(Multipliers.PUPPY_4_TO_12_MONTHS);
    }
  }

  const handleActivityChange = (value: string) => {
    setActivityRadioValue(value);
    if (value === activityRadios[0].value) {
      setMultiplier(Multipliers.INACTIVE_MIN);
    } else if (value === activityRadios[1].value) {
      setMultiplier(isNeutered ? Multipliers.NEUTERED_ADULT : Multipliers.INTACT_ADULT);
    } else {
      setMultiplier(Multipliers.ACTIVE_MAX);
    }
  }

  const handleNeuteredChange = (value: string) => {
    setNeuteredRadioValue(value);
    setIsNeutered(value === 'neutered');
  }

  return (
    <div className='App'>
      <Container>
        <Row className='row'>
          <Form onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group>
                <Form.Label>Weight: </Form.Label>
                <Form.Control id='weightInput' type='number' />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Col className='col-6'>
                <ButtonGroup>
                  {ageRadios.map((radio, idx) => (
                    <ToggleButton
                      key={radio.value}
                      id={`radio-${radio.value}`}
                      type="radio"
                      variant='outline-success'
                      name="ageRadio"
                      value={radio.value}
                      checked={ageRadioValue === radio.value}
                      onChange={(e) => handleAgeChange(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
              { isAdult ? 
                <Col className='col-6'>
                  <ButtonGroup>
                    {neuteredRadios.map((radio, idx) => (
                      <ToggleButton
                        key={radio.value}
                        id={`radio-${radio.value}`}
                        type="radio"
                        variant='outline-success'
                        name="neuteredRadio"
                        value={radio.value}
                        checked={neuteredRadioValue === radio.value}
                        onChange={(e) => handleNeuteredChange(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Col>
                :
                <Col className='col-6'>
                  <ButtonGroup>
                    {puppyAgeRadios.map((radio, idx) => (
                      <ToggleButton
                        key={radio.value}
                        id={`radio-${radio.value}`}
                        type="radio"
                        variant='outline-success'
                        name="puppyAgeRadio"
                        value={radio.value}
                        checked={puppyAgeRadioValue === radio.value}
                        onChange={(e) => handlePuppyAgeChange(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Col>
              }
            </Row>
            { isAdult ?
              <Row className='mb-3'>
                <ButtonGroup>
                  {activityRadios.map((radio, idx) => (
                    <ToggleButton
                      key={radio.value}
                      id={`radio-${radio.value}`}
                      type="radio"
                      variant='outline-success'
                      name="activityRadio"
                      value={radio.value}
                      checked={activityRadioValue === radio.value}
                      onChange={(e) => handleActivityChange(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Row>
              : null
            }

            <button type='submit'>Submit</button>
          </Form>

          <p>{isAdult}</p>
          <p id='calorie-result'>{result}</p>
          <p>K Factor: {multiplier}</p>
        </Row>
      </Container>
    </div>
  );
}

export default App;

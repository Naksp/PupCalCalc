import React, { useEffect, useState } from 'react';
import {Form, Container, Row, ButtonGroup, ToggleButton, Col, InputGroup, DropdownButton, Card} from 'react-bootstrap';
import './App.scss';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Utils from './Util';

const PUPPY_0_TO_4_MONTS = 'puppy_0_to_4_months';
const PUPPY_4_TO_12_MONTHS = 'puppy_4_to_12_months';
const ADULT = 'adult';

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

const KG = 'kg';
const LBS = 'lbs';
const KCAL_G = 'kcal/g'
const KCAL_KG = 'kcal/kg'
const KCAL_CUP = 'kcal/cup'

// Radios
const ageRadios = [
  { name: '<4 months', value: PUPPY_0_TO_4_MONTS},
  { name: '4-12 months', value: PUPPY_4_TO_12_MONTHS},
  { name: '>1 year', value: ADULT}
];

const activityRadios = [
  { name: 'Inactive', value: 'inactive' },
  // { name: 'Moderately active', value: 'moderatelyActive'},
  { name: 'Average', value: 'moderatelyActive'},
  { name: 'Active', value: 'active' },
];

const neuteredRadios = [
  { name: 'Neutered', value: 'neutered' },
  { name: 'Intact', value: 'intact' },
];

function App() {

  const [weightUnit, setWeightUnit] = useState<string>(LBS);
  const [caloriesResult, setCaloriesResult] = useState<string>('___ calories');

  const [foodUnit, setFoodUnit] = useState<string>(KCAL_KG);
  const [foodResult, setFoodResult] = useState<string>('');

  const [multiplier, setMultiplier] = useState<number>(3.0);
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [isNeutered, setIsNeutered] = useState<boolean>(true);

  const [ageRadioValue, setAgeRadioValue] = useState<string>(ageRadios[0].value);
  const [activityRadioValue, setActivityRadioValue] = useState<string>('');
  const [neuteredRadioValue, setNeuteredRadioValue] = useState<string>('');

  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (ageRadioValue === ADULT) {
      setSubmitEnabled(activityRadioValue !== '' && neuteredRadioValue !== '');
    } else {
      setSubmitEnabled(true);
    }

  }, [activityRadioValue, ageRadioValue, neuteredRadioValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      weightInput: HTMLInputElement,
      foodInput: HTMLInputElement,
    };

    const rer: number = caclulateRer(Number(formElements.weightInput.value));
    const foodDensity: number = Number(formElements.foodInput.value);

    var result: string;
    var foodAmtResult: string;

    // Display calorie range if activity level is 'active'
    if (isAdult && activityRadioValue === 'active') {
      const min = Math.round(rer * Multipliers.ACTIVE_MIN);
      const max = Math.round(rer * Multipliers.ACTIVE_MAX);
      result = `${min.toString()} - ${max.toString()}`

      foodAmtResult = buildFoodResult(foodDensity, min, max);

    } else if (isAdult && activityRadioValue === 'inactive') {
      const min = Math.round(rer * Multipliers.INACTIVE_MIN);
      const max = Math.round(rer * Multipliers.INACTIVE_MAX);
      result = `${min.toString()} - ${max.toString()}`

      foodAmtResult = buildFoodResult(foodDensity, min, max);

    } else {
      const cal = Math.round(rer * multiplier);
      result = cal.toString();

      foodAmtResult = buildFoodResult(foodDensity, cal);
    }

    setCaloriesResult(`${result} calories`);
    if (foodDensity) {
      setFoodResult(foodAmtResult);
    }
  }

  const caclulateRer = (weight: number): number => {
    if (weightUnit === LBS) {
      weight = weight / 2.205;
    } 
    return 70 * Math.pow(weight, 0.75);
  }

  const buildFoodResult = (density: number, min: number, max?: number): string => {
    if (max) {
      if (foodUnit === KCAL_G) {
        return `${Math.round(min/density)} - ${Math.round(max/density)} grams`

      } else if (foodUnit === KCAL_KG) {
        return `${Math.round(min/density * 1000)} - ${Math.round(max/density * 1000)} grams`

      } else if (foodUnit === KCAL_CUP) {
        return `${Utils.truncateNumber(min/density)} - ${Utils.truncateNumber(max/density)} cups`
      }
    } else {
      if (foodUnit === KCAL_G) {
        return `${Math.round(min/density)} grams`

      } else if (foodUnit === KCAL_KG) {
        return `${Math.round(min/density * 1000)} grams`

      } else if (foodUnit === KCAL_CUP) {
        return `${Utils.truncateNumber(min/density)} cups`
      }
    }

    return '';
  }

  const handleAgeChange = (value: string) => {
    if (value === ADULT) {
      setIsAdult(true);

    } else {
      setIsAdult(false);

      if (value === PUPPY_0_TO_4_MONTS) {
        setMultiplier(Multipliers.PUPPY_0_TO_4_MONTS);
      } else {
        setMultiplier(Multipliers.PUPPY_4_TO_12_MONTHS);
      }
    }

    setAgeRadioValue(value);
  }

  useEffect(() => {
    if (isAdult) {
      handleActivityChange(activityRadioValue);
    }
  //FIXME I'm guessing this is a code smell
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdult])

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

  useEffect(() => {
    if (activityRadioValue === activityRadios[1].value) {
      setMultiplier(isNeutered ? Multipliers.NEUTERED_ADULT : Multipliers.INTACT_ADULT);
    }
  }, [activityRadioValue, isNeutered]);

  return (
    <div className='App d-flex'>
      <Container id='app-container'>
        <Row>
          <h1 className='logo-text'>Dog Calorie Calculator</h1>
        </Row>
        <Card className='border-standard app-card px-3 mb-4'>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Row className='mb-4 mt-3 justify-content-center'>
                <Col className='col-6 col-sm-4'>
                  <InputGroup>
                  <Form.Control id='weightInput' type='number' step='any' placeholder='##'/>
                    <DropdownButton id='weightDropdown' title={weightUnit}>
                      <DropdownItem onClick={() => setWeightUnit(LBS)}>lbs</DropdownItem>
                      <DropdownItem onClick={() => setWeightUnit(KG)}>kg</DropdownItem>
                    </DropdownButton>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ButtonGroup className='row justify-content-center mb-3 mb-sm-0 button-group-primary'>
                    {ageRadios.map((radio, idx) => (
                      <ToggleButton
                        className='button-standard toggle-button-primary mx-1 col-12 col-sm-3 mb-1 mb-sm-3'
                        key={radio.value}
                        id={`radio-${radio.value}`}
                        type="radio"
                        variant='outline-primary'
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
              </Row>

              { isAdult ? 
                <Row>
                  <Col>
                    <ButtonGroup className='row justify-content-center mb-3 mb-sm-0 button-group-primary'>
                      {neuteredRadios.map((radio, idx) => (
                        <ToggleButton
                          className='button-standard toggle-button-primary mx-1 col-12 col-sm-3 mb-1 mb-sm-3'
                          key={radio.value}
                          id={`radio-${radio.value}`}
                          type="radio"
                          variant='outline-primary'
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
                </Row>
                : null
              }

              { isAdult && neuteredRadioValue ?
                <Row>
                  <Col>
                    <ButtonGroup className='row justify-content-center mb-3 mb-sm-2 button-group-primary'>
                      {activityRadios.map((radio, idx) => (
                        <ToggleButton
                          className='button-standard toggle-button-primary mx-1 col-12 col-sm-3 mb-1 mb-sm-3'
                          key={radio.value}
                          id={`radio-${radio.value}`}
                          type="radio"
                          variant='outline-primary'
                          name="activityRadio"
                          value={radio.value}
                          checked={activityRadioValue === radio.value}
                          onChange={(e) => handleActivityChange(e.currentTarget.value)}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </Col>
                </Row>
                : null
              }

              <Row className='justify-content-center mb-3'>
                <Col className='col-8 col-sm-5'>
                  <Row className='mb-0'>
                    <InputGroup className='mb-0'>
                      <Form.Control id='foodInput' type='number' step='any' placeholder='##'/>
                      <DropdownButton id='foodDropdown' title={foodUnit}>
                        <DropdownItem onClick={() => setFoodUnit(KCAL_KG)}>{KCAL_KG}</DropdownItem>
                        <DropdownItem onClick={() => setFoodUnit(KCAL_G)}>{KCAL_G}</DropdownItem>
                        <DropdownItem onClick={() => setFoodUnit(KCAL_CUP)}>{KCAL_CUP}</DropdownItem>
                      </DropdownButton>
                    </InputGroup>
                  </Row>
                  <Row className='justify-content-left optional-text'>
                    optional
                  </Row>
                </Col>
              </Row>

              <button type='submit' id='submitButton' className='border-standard mb-3' disabled={!submitEnabled}>Submit</button>
            </Form>

            <h1 id='calorie-result' className='mb-3'>{caloriesResult}</h1>
            <h1 id='food-result' className='mb-3'>{foodResult}</h1>
          </Row>
        </Card>
        {/* <p>K Factor: {multiplier}</p> */}
      </Container>
    </div>
  );
}

export default App;

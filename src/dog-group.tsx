/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Container, Row, ButtonGroup, ToggleButton, Col, InputGroup, DropdownButton, Card } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const PUPPY_0_TO_4_MONTS = 'puppy_0_to_4_months';
const PUPPY_4_TO_12_MONTHS = 'puppy_4_to_12_months';
const ADULT = 'adult';
const KG = 'kg';
const LBS = 'lbs';

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
  { name: '<4 months', value: PUPPY_0_TO_4_MONTS },
  { name: '4-12 months', value: PUPPY_4_TO_12_MONTHS },
  { name: '>1 year', value: ADULT }
];

const activityRadios = [
  { name: 'Inactive', value: 'inactive' },
  { name: 'Average', value: 'moderatelyActive' },
  { name: 'Active', value: 'active' },
];

const neuteredRadios = [
  { name: 'Neutered', value: 'neutered' },
  { name: 'Intact', value: 'intact' },
];


function DogGroup(props: {
  setSubmitEnabled: (enabled: boolean) => void,
  onCaloriesMinChange: (min: number) => void,
  onCaloriesMaxChange: (max: number) => void,
  onCaloriesResultChange: (result: string) => void,
}) {

  const [weightInput, setWeightInput] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<string>(LBS);
  // const [caloriesResult, setCaloriesResult] = useState<string>('___ calories');
  const [caloriesResult, setCaloriesResult] = useState<string>('');
  const [caloriesMin, setCaloriesMin] = useState<number>(0);
  const [caloriesMax, setCaloriesMax] = useState<number>(-1);

  const [multiplier, setMultiplier] = useState<number>(3.0);
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [isNeutered, setIsNeutered] = useState<boolean>(true);

  const [ageRadioValue, setAgeRadioValue] = useState<string>(ageRadios[0].value);
  const [activityRadioValue, setActivityRadioValue] = useState<string>('');
  const [neuteredRadioValue, setNeuteredRadioValue] = useState<string>('');

  useEffect(() => {
    const rer: number = caclulateRer(Number(weightInput));

    var result: string;

    // Display calorie range if activity level is 'active'
    if (isAdult && activityRadioValue === 'active') {
      const min = Math.round(rer * Multipliers.ACTIVE_MIN);
      const max = Math.round(rer * Multipliers.ACTIVE_MAX);
      setCaloriesMin(min);
      setCaloriesMax(max);

      result = `${min.toString()} - ${max.toString()}`;

    } else if (isAdult && activityRadioValue === 'inactive') {
      const min = Math.round(rer * Multipliers.INACTIVE_MIN);
      const max = Math.round(rer * Multipliers.INACTIVE_MAX);
      setCaloriesMin(min);
      setCaloriesMax(max);

      result = `${min.toString()} - ${max.toString()}`;

    } else {
      const cal = Math.round(rer * multiplier);
      result = cal.toString();

      setCaloriesMin(cal);
      setCaloriesMax(-1);
    }

    setCaloriesResult(`${result} calories/day`);
  }, [activityRadioValue, isAdult, multiplier, weightInput]);

  const caclulateRer = (weight: number): number => {
    if (weightUnit === LBS) {
      weight = weight / 2.205;
    }
    return 70 * Math.pow(weight, 0.75);
  }

  useEffect(() => {
    props.onCaloriesMinChange(caloriesMin);
    props.onCaloriesMaxChange(caloriesMax);
    props.onCaloriesResultChange(caloriesResult);

  }, [caloriesMin, caloriesMax, caloriesResult])

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

  const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    props.setSubmitEnabled(!!val);
    setWeightInput(val);
  }

  useEffect(() => {
    if (ageRadioValue === ADULT) {
      props.setSubmitEnabled(activityRadioValue !== '' && neuteredRadioValue !== '');
    } else if (weightInput) {
      props.setSubmitEnabled(true);
    }

  }, [activityRadioValue, ageRadioValue, neuteredRadioValue]);

  return (
    <div>
      <h1 className='mt-2'>dog</h1>
      <Row className='mb-4 mt-2 justify-content-center'>
        <Col className='col-6 col-sm-4'>
          <InputGroup>
            <Form.Control id='weightInput' type='number' step='any' placeholder='##' onChange={handleWeightInputChange} />
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

      {isAdult ?
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

      {isAdult && neuteredRadioValue ?
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
    </div>
  );
}

export default DogGroup;
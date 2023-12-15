/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Row, Col, InputGroup, DropdownButton, Button } from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { CaloriePair } from "./interfaces";
import Utils from "./Util";

const KCAL_G = 'kcal/g';
const KCAL_KG = 'kcal/kg';
const KCAL_CUP = 'kcal/cup';

interface foodData {
  density: string;
  percent: string;
  id: number;
};

function FoodGroup(props: {
  calories: CaloriePair,
  onResultChange: (result: string) => void,
  onTransitionModeChange: (enabled: boolean) => void,
  onTransitionDataChange: (data: string[]) => void,
}) {

  // const [foodInput, setFoodInput] = useState<string>();
  const [oldFoodInput, setOldFoodInput] = useState<string>();
  const [newFoodInput, setNewFoodInput] = useState<string>();
  const [foodDataArray, setFoodDataArray] = useState<foodData[]>([{density: '', percent: '', id: 0}]);
  const [nextInputId, setNextInputId] = useState<number>(1);

  const [foodUnit, setFoodUnit] = useState<string>(KCAL_KG);
  const [transitionMode, setTransitionMode] = useState<boolean>(false);

  useEffect(() => {
    if (!transitionMode && foodDataArray[0].density) {
      props.onResultChange(buildFoodResult(props.calories.min, props.calories.max));
    } else if (transitionMode && oldFoodInput && newFoodInput) {
      props.onTransitionDataChange(buildFoodTransitionData())

    } else {
      props.onResultChange('');
    }
  }, [props.calories.min, props.calories.max, foodDataArray, oldFoodInput, newFoodInput, foodUnit, transitionMode]);

  const buildFoodResult = (min: number, max?: number): string => {
    if (foodDataArray.length <= 1) {
      const density = Number(foodDataArray[0].density);
      if (max && max >= 0) {
        if (foodUnit === KCAL_G) {
          return `${Math.round(min / density)} - ${Math.round(max / density)} grams/day`

        } else if (foodUnit === KCAL_KG) {
          return `${Math.round(min / density * 1000)} - ${Math.round(max / density * 1000)} grams/day`

        } else if (foodUnit === KCAL_CUP) {
          return `${Utils.truncateNumber(min / density)} - ${Utils.truncateNumber(max / density)} cups/day`
        }
      } else {
        if (foodUnit === KCAL_G) {
          return `${Math.round(min / density)} grams/day`

        } else if (foodUnit === KCAL_KG) {
          return `${Math.round(min / density * 1000)} grams/day`

        } else if (foodUnit === KCAL_CUP) {
          return `${Utils.truncateNumber(min / density)} cups/day`
        }
      }
    } else {

      var resultString: string = '';
      // TODO change this after implementing actual percentages for inputs
      // const percent = 1/foodDataArray.length;

      for (let idx: number = 0; idx < foodDataArray.length; idx++) {
        const density = Number(foodDataArray[idx].density);
        if (!density) {
          continue;
        }

        const percent = Number(foodDataArray[idx].percent) / 100;

        if (max && max >= 0) {
          if (foodUnit === KCAL_G) {
            resultString += `${Math.round(min / density)} - ${Math.round(max / density)}g food ${idx + 1}`;

          } else if (foodUnit === KCAL_KG) {
            resultString += `${Math.round(min / density * 1000)} - ${Math.round(max / density * 1000)}g food ${idx + 1}`

          } else if (foodUnit === KCAL_CUP) {
            resultString += `${Utils.truncateNumber(min / density)} - ${Utils.truncateNumber(max / density)}cups food ${idx + 1}`
          }
        } else {
          if (foodUnit === KCAL_G) {
            resultString += `${Math.round(min*percent / density)}g food ${idx + 1}`

          } else if (foodUnit === KCAL_KG) {
            resultString += `${Math.round(min*percent / density * 1000)}g food ${idx + 1}`

          } else if (foodUnit === KCAL_CUP) {
            resultString += `${Utils.truncateNumber(min*percent / density)} cups food ${idx + 1}`
          }
        }

        if (idx < foodDataArray.length - 1) {
          resultString += `\n`;
        }
      };

      return resultString;
    }
    return '';
  };

  const handleNewFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setNewFoodInput(val);
  }
  const handleOldFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setOldFoodInput(val);
  }

  const handleFoodInputChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const newArray = [...foodDataArray];
    newArray[idx].density = val;

    setFoodDataArray(newArray);
  }

  const handleFoodPercentChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const newArray = [...foodDataArray];
    newArray[idx].percent = val;

    setFoodDataArray(newArray);

  }

  // const handleFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const targetId = e.currentTarget.id;
  //   const val = e.currentTarget.value;
  //   if (targetId === 'foodInput') {
  //     setFoodInput(val);
  //   } else if (targetId === 'oldFoodInput') {
  //     setOldFoodInput(val);
  //   } else if (targetId === 'newFoodInput') {
  //     setNewFoodInput(val);
  //   }
  // };

  useEffect(() => {
    if (transitionMode) {
      props.onTransitionModeChange(true);

      // If there's already something in the first food input, use that as initial old food density
      const firstInputVal = foodDataArray[0].density;
      setOldFoodInput(firstInputVal);
      var el = document.getElementById('oldFoodInput') as HTMLInputElement;
      if (firstInputVal && el) {
        el.value = firstInputVal;
      }

      // This makes sure the input renders the new food input value on transition change
      el = document.getElementById('newFoodInput') as HTMLInputElement;
      if (newFoodInput && el) {
        el.value = newFoodInput;
      }

    } else {
      // setFoodInput(oldFoodInput);
      if (oldFoodInput) {
        const newArray = [...foodDataArray];
        newArray[0].density = oldFoodInput;
        setFoodDataArray(newArray);
      }
      props.onTransitionModeChange(false);

    }
  }, [transitionMode]);

  const buildFoodTransitionData = (): string[] => {
    var data: string[] = [];

    const oldVal = Number(oldFoodInput);
    const newVal = Number(newFoodInput);

    // Total cals * pct / food density = grams of food/day

    if (props.calories.max && props.calories.max > 0) {
      if (foodUnit === KCAL_KG) {
        data.push(`${Math.round(props.calories.min * 0.75 / oldVal * 1000)} - ${Math.round(props.calories.max * 0.75 / oldVal * 1000)}g`);
        data.push(`${Math.round(props.calories.min * 0.25 / newVal * 1000)} - ${Math.round(props.calories.max * 0.25 / newVal * 1000)}g`);
                                                                  
        data.push(`${Math.round(props.calories.min * 0.50 / oldVal * 1000)} - ${Math.round(props.calories.max * 0.50 / oldVal * 1000)}g`);
        data.push(`${Math.round(props.calories.min * 0.50 / newVal * 1000)} - ${Math.round(props.calories.max * 0.50 / newVal * 1000)}g`);
                                                                  
        data.push(`${Math.round(props.calories.min * 0.25 / oldVal * 1000)} - ${Math.round(props.calories.max * 0.25 / oldVal * 1000)}g`);
        data.push(`${Math.round(props.calories.min * 0.75 / newVal * 1000)} - ${Math.round(props.calories.max * 0.75 / newVal * 1000)}g`);

        data.push(`${Math.round(props.calories.min / newVal * 1000)} - ${Math.round(props.calories.max / newVal * 1000)}g`);

      } else if (foodUnit === KCAL_G) {
        data.push(`${Math.round(props.calories.min * 0.75 / oldVal)} - ${Math.round(props.calories.max * 0.75 / oldVal)}g`);
        data.push(`${Math.round(props.calories.min * 0.25 / newVal)} - ${Math.round(props.calories.max * 0.25 / newVal)}g`);
                                                           
        data.push(`${Math.round(props.calories.min * 0.50 / oldVal)} - ${Math.round(props.calories.max * 0.50 / oldVal)}g`);
        data.push(`${Math.round(props.calories.min * 0.50 / newVal)} - ${Math.round(props.calories.max * 0.50 / newVal)}g`);
                                                           
        data.push(`${Math.round(props.calories.min * 0.25 / oldVal)} - ${Math.round(props.calories.max * 0.25 / oldVal)}g`);
        data.push(`${Math.round(props.calories.min * 0.75 / newVal)} - ${Math.round(props.calories.max * 0.75 / newVal)}g`);

        data.push(`${Math.round(props.calories.min / newVal)} - ${Math.round(props.calories.max / newVal)}g`);

      } else if (foodUnit === KCAL_CUP) {
        data.push(`${Utils.truncateNumber(props.calories.min * 0.75 / oldVal)} - ${Utils.truncateNumber(props.calories.max * 0.75 / oldVal)}cups`);
        data.push(`${Utils.truncateNumber(props.calories.min * 0.25 / newVal)} - ${Utils.truncateNumber(props.calories.max * 0.25 / newVal)}cups`);
                                                           
        data.push(`${Utils.truncateNumber(props.calories.min * 0.50 / oldVal)} - ${Utils.truncateNumber(props.calories.max * 0.50 / oldVal)}cups`);
        data.push(`${Utils.truncateNumber(props.calories.min * 0.50 / newVal)} - ${Utils.truncateNumber(props.calories.max * 0.50 / newVal)}cups`);
                                                           
        data.push(`${Utils.truncateNumber(props.calories.min * 0.25 / oldVal)} - ${Utils.truncateNumber(props.calories.max * 0.25 / oldVal)}cups`);
        data.push(`${Utils.truncateNumber(props.calories.min * 0.75 / newVal)} - ${Utils.truncateNumber(props.calories.max * 0.75 / newVal)}cups`);

        data.push(`${Utils.truncateNumber(props.calories.min / newVal)} - ${Utils.truncateNumber(props.calories.max / newVal)}cups`);

      }

    } else {
      if (foodUnit === KCAL_KG) {
        data.push(`${Math.round(props.calories.min * 0.75 / oldVal * 1000)}g`);
        data.push(`${Math.round(props.calories.min * 0.25 / newVal * 1000)}g`);
                                                                  
        data.push(`${Math.round(props.calories.min * 0.50 / oldVal * 1000)}g`);
        data.push(`${Math.round(props.calories.min * 0.50 / newVal * 1000)}g`);
                                                                  
        data.push(`${Math.round(props.calories.min * 0.25 / oldVal * 1000)}g`);
        data.push(`${Math.round(props.calories.min * 0.75 / newVal * 1000)}g`);

        data.push(`${Math.round(props.calories.min / newVal * 1000)}g`);

      } else if (foodUnit === KCAL_G) {
        data.push(`${Math.round(props.calories.min * 0.75 / oldVal)}g`);
        data.push(`${Math.round(props.calories.min * 0.25 / newVal)}g`);
                                                           
        data.push(`${Math.round(props.calories.min * 0.50 / oldVal)}g`);
        data.push(`${Math.round(props.calories.min * 0.50 / newVal)}g`);
                                                           
        data.push(`${Math.round(props.calories.min * 0.25 / oldVal)}g`);
        data.push(`${Math.round(props.calories.min * 0.75 / newVal)}g`);

        data.push(`${Math.round(props.calories.min / newVal)}g`);

      } else if (foodUnit === KCAL_CUP) {
        data.push(`${Utils.truncateNumber(props.calories.min * 0.75 / oldVal)}cups`);
        data.push(`${Utils.truncateNumber(props.calories.min * 0.25 / newVal)}cups`);
                                                           
        data.push(`${Utils.truncateNumber(props.calories.min * 0.50 / oldVal)}cups`);
        data.push(`${Utils.truncateNumber(props.calories.min * 0.50 / newVal)}cups`);
                                                           
        data.push(`${Utils.truncateNumber(props.calories.min * 0.25 / oldVal)}cups`);
        data.push(`${Utils.truncateNumber(props.calories.min * 0.75 / newVal)}cups`);

        data.push(`${Utils.truncateNumber(props.calories.min / newVal)}cups`);

      }
    }

    return data;
  };

  const addFoodInput = () => {
    if (addFoodInput.length === 1) {
      //TODO: Change input to include percent
    } else {
      
      setFoodDataArray((prevArray) => [
        ...prevArray,
        { density: '', percent: '', id: nextInputId },
      ]);
      setNextInputId(nextInputId + 1);
    }
  }

  const removeFoodInput = (id: number) => {
    console.log(`removing input ${id}`);
    setFoodDataArray(
      foodDataArray.filter( input => id !== input.id)
    );

  };

  return (
    <div>
      <h1>food</h1>
      <Row id="transition-switch-container" className="custom-switch-container mb-2">
        <Form.Switch
          checked={transitionMode}
          onChange={() => setTransitionMode(!transitionMode)}
          className="custom-switch"
          id="food-transition-switch"
          label="transition" />
      </Row>

      {transitionMode ? (
        <Row className='justify-content-center mb-3'>
          <Col className='col'>
            <Row className='mb-0 mx-1'>
              <InputGroup className='mb-0 px-0'>
                <Form.Control id='oldFoodInput' type='number' step='any' placeholder='old' onChange={handleOldFoodInputChange} />
                <Form.Control id='newFoodInput' type='number' step='any' placeholder='new' onChange={handleNewFoodInputChange} />
                <DropdownButton id='foodDropdown' title={foodUnit}>
                  <DropdownItem onClick={() => setFoodUnit(KCAL_KG)}>{KCAL_KG}</DropdownItem>
                  <DropdownItem onClick={() => setFoodUnit(KCAL_G)}>{KCAL_G}</DropdownItem>
                  <DropdownItem onClick={() => setFoodUnit(KCAL_CUP)}>{KCAL_CUP}</DropdownItem>
                </DropdownButton>
              </InputGroup>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className='justify-content-center mb-2'>
          <Col className={foodDataArray.length > 1 ? 'col-11 col-sm-8' : 'col-8 col-sm-6'}>
            {foodDataArray.map((input, idx) => (
              <Row key={idx} className='mb-2'>
                <InputGroup key={idx} id={`food-input${idx}`}className='mb-0'>
                  {/* <Form.Control id='foodInput' type='number' step='any' placeholder='##' onChange={handleFoodInputChange} /> */}
                  <Form.Control id='foodInput' type='number' step='any' placeholder='##' value={input.density ? input.density : ''} onChange={handleFoodInputChange(idx)}/>
                  <DropdownButton disabled={idx > 0} id='foodDropdown' bsPrefix={foodDataArray.length > 1 ? 'no-radius' : ''} title={foodUnit}>
                    <DropdownItem onClick={() => setFoodUnit(KCAL_KG)}>{KCAL_KG}</DropdownItem>
                    <DropdownItem onClick={() => setFoodUnit(KCAL_G)}>{KCAL_G}</DropdownItem>
                    <DropdownItem onClick={() => setFoodUnit(KCAL_CUP)}>{KCAL_CUP}</DropdownItem>
                  </DropdownButton>
                  {foodDataArray.length > 1 ?
                  <>
                    <Form.Control id='percentInput' type='number' step='any' placeholder='##' value={input.percent ? input.percent : ''} onChange={handleFoodPercentChange(idx)}/>
                    <Form.Control id='percentLabel' disabled type='text' step='any' value='%' />

                  </>
                    : null
                  }
                </InputGroup>
                {idx > 0 ?
                (<span>
                  <Button id={`button-${idx}`} onClick={() => removeFoodInput(input.id)}>-</Button>
                </span>) : null}
              </Row>
            ))}
            <Row className='justify-content-left optional-text'>
              optional
            </Row>
          </Col>
          <Row>
            <Button onClick={addFoodInput}>+</Button>
          </Row>
        </Row>
      )}
    </div>
  );
}

export default FoodGroup;
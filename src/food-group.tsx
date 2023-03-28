/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Row, Col, InputGroup, DropdownButton } from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { CaloriePair } from "./interfaces";
import Utils from "./Util";

const KCAL_G = 'kcal/g';
const KCAL_KG = 'kcal/kg';
const KCAL_CUP = 'kcal/cup';

function FoodGroup(props: {
  calories: CaloriePair,
  onResultChange: (result: string) => void,
  onTransitionModeChange: (enabled: boolean) => void,
  onTransitionDataChange: (data: string[]) => void,
}) {

  const [foodInput, setFoodInput] = useState<string>();
  const [oldFoodInput, setOldFoodInput] = useState<string>();
  const [newFoodInput, setNewFoodInput] = useState<string>();

  const [foodUnit, setFoodUnit] = useState<string>(KCAL_KG);
  const [transitionMode, setTransitionMode] = useState<boolean>(false);

  useEffect(() => {
    if (!transitionMode && foodInput) {
      props.onResultChange(buildFoodResult(props.calories.min, props.calories.max));
    } else if (transitionMode && oldFoodInput && newFoodInput) {
      props.onTransitionDataChange(buildFoodTransitionData())

    } else {
      props.onResultChange('');
    }
  }, [props.calories.min, props.calories.max, foodInput, oldFoodInput, newFoodInput, foodUnit, transitionMode]);

  const buildFoodResult = (min: number, max?: number): string => {
    const density = Number(foodInput);
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

    return '';
  };

  const handleFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = e.currentTarget.id;
    const val = e.currentTarget.value;
    if (targetId === 'foodInput') {
      setFoodInput(val);
    } else if (targetId === 'oldFoodInput') {
      setOldFoodInput(val);
    } else if (targetId === 'newFoodInput') {
      setNewFoodInput(val);
    }
  };

  useEffect(() => {
    if (transitionMode) {
      setOldFoodInput(foodInput);
      props.onTransitionModeChange(true);

      const el = document.getElementById('newFoodInput') as HTMLInputElement;
      if (newFoodInput && el) {
        el.value = newFoodInput;
      }

    } else {
      setFoodInput(oldFoodInput);
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
                <Form.Control id='oldFoodInput' type='number' step='any' placeholder='old' onChange={handleFoodInputChange} />
                <Form.Control id='newFoodInput' type='number' step='any' placeholder='new' onChange={handleFoodInputChange} />
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
          <Col className='col-8 col-sm-5'>
            <Row className='mb-0'>
              <InputGroup className='mb-0'>
                <Form.Control id='foodInput' type='number' step='any' placeholder='##' onChange={handleFoodInputChange} />
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
      )}
    </div>
  );
}

export default FoodGroup;
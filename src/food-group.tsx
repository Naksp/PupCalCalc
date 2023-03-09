/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, InputGroup, DropdownButton, ButtonGroup, ToggleButton } from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Utils from "./Util";

const KCAL_G = 'kcal/g';
const KCAL_KG = 'kcal/kg';
const KCAL_CUP = 'kcal/cup';

function FoodGroup(props: {
  min: number,
  max?: number,
  onResultChange: (result: string) => void
}) {

  const ref = useRef(null);

  const [foodInput, setFoodInput] = useState<string>();
  const [foodUnit, setFoodUnit] = useState<string>(KCAL_KG);
  const [transitionMode, setTransitionMode] = useState<boolean>(false);

  useEffect(() => {
    if (foodInput) {
      props.onResultChange(buildFoodResult(Number(foodInput), props.min, props.max));
    } else {
      props.onResultChange('');
    }
  }, [props.min, props.max, foodInput, foodUnit])

  const buildFoodResult = (density: number, min: number, max?: number): string => {
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
  }

  const handleFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setFoodInput(val);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransitionMode(!transitionMode);
  }

  // useEffect(() => {
  //   console.log(transitionMode);

  // }, [transitionMode]);

  return (
    <div>
      <h1>food</h1>
      <Row id="transition-switch-container" className="d-flex justify-content-center mb-2">
        <Form.Switch
        checked={transitionMode}
        onChange={() => setTransitionMode(!transitionMode)}
        className="d-flex justify-content-center"
        id="food-transition-switch"
        label="Transition"
        ref={ref}/>
      </Row>

      {transitionMode ?
        <Row className='justify-content-center mb-3'>
          <Col className='col'>
            <Row className='mb-0 mx-1'>
              <InputGroup className='mb-0 px-0'>
                <Form.Control id='oldFoodInput' type='number' step='any' placeholder='old' /*onChange={handleFoodInputChange}*/ />
                <Form.Control id='newFoodInput' type='number' step='any' placeholder='new' /*onChange={handleFoodInputChange}*/ />
                <DropdownButton id='foodDropdown' title={foodUnit}>
                  <DropdownItem onClick={() => setFoodUnit(KCAL_KG)}>{KCAL_KG}</DropdownItem>
                  <DropdownItem onClick={() => setFoodUnit(KCAL_G)}>{KCAL_G}</DropdownItem>
                  <DropdownItem onClick={() => setFoodUnit(KCAL_CUP)}>{KCAL_CUP}</DropdownItem>
                </DropdownButton>
              </InputGroup>
            </Row>
          </Col>
        </Row>
      :
        <Row className='justify-content-center mb-3'>
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
      }
    </div>
  );
}

export default FoodGroup;
import React, { useEffect, useState } from "react";
import { Form, Container, Row, ButtonGroup, ToggleButton, Col, InputGroup, DropdownButton, Card } from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Utils from "./Util";

const KCAL_G = 'kcal/g';
const KCAL_KG = 'kcal/kg';
const KCAL_CUP = 'kcal/cup';

function FoodGroup(props: {
  min: number,
  max?: number,
  // foodUnit: string,
  // onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  // onUnitChange: (unit: string) => void,
  onResultChange: (result: string) => void
}) {

  const [foodInput, setFoodInput] = useState<string>();
  const [foodUnit, setFoodUnit] = useState<string>(KCAL_KG);

  useEffect(() => {
    if (foodInput) {
      props.onResultChange(buildFoodResult(Number(foodInput), props.min, props.max));
    }
  }, [props.min, props.max, foodInput, foodUnit])

  const buildFoodResult = (density: number, min: number, max?: number): string => {
    if (max && max >= 0) {
      if (foodUnit === KCAL_G) {
        return `${Math.round(min / density)} - ${Math.round(max / density)} grams`

      } else if (foodUnit === KCAL_KG) {
        return `${Math.round(min / density * 1000)} - ${Math.round(max / density * 1000)} grams`

      } else if (foodUnit === KCAL_CUP) {
        return `${Utils.truncateNumber(min / density)} - ${Utils.truncateNumber(max / density)} cups`
      }
    } else {
      if (foodUnit === KCAL_G) {
        return `${Math.round(min / density)} grams`

      } else if (foodUnit === KCAL_KG) {
        return `${Math.round(min / density * 1000)} grams`

      } else if (foodUnit === KCAL_CUP) {
        return `${Utils.truncateNumber(min / density)} cups`
      }
    }

    return '';
  }

  const handleFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    // setSubmitEnabled(!!val);
    setFoodInput(val);
  }

  return (
    <div>
      <h1>food</h1>
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
    </div>
  );
}

export default FoodGroup;
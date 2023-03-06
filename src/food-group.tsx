import React, { useState } from "react";
import {Form, Container, Row, ButtonGroup, ToggleButton, Col, InputGroup, DropdownButton, Card} from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const KCAL_G = 'kcal/g';
const KCAL_KG = 'kcal/kg';
const KCAL_CUP = 'kcal/cup';

function FoodGroup(props: { 
    foodUnit:string,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onUnitChange: (unit: string) => void 
  }) {

  return (
    <div>
      <h1>food</h1>
      <Row className='justify-content-center mb-3'>
      <Col className='col-8 col-sm-5'>
        <Row className='mb-0'>
        <InputGroup className='mb-0'>
          <Form.Control id='foodInput' type='number' step='any' placeholder='##' onChange={props.onInputChange}/>
          <DropdownButton id='foodDropdown' title={props.foodUnit}>
          <DropdownItem onClick={() => props.onUnitChange(KCAL_KG)}>{KCAL_KG}</DropdownItem>
          <DropdownItem onClick={() => props.onUnitChange(KCAL_G)}>{KCAL_G}</DropdownItem>
          <DropdownItem onClick={() => props.onUnitChange(KCAL_CUP)}>{KCAL_CUP}</DropdownItem>
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
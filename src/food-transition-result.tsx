import React from "react";
import { Col, Row } from "react-bootstrap";

function FoodTransitionResult(props: {
  display: boolean,
  data: number[],
}) {
  return (
    <div>
      {props.display ?
      <div>
        <Row className="mb-2">
          <Col className="col-5 text-end">
            Day 1 & 2:
          </Col>
          <Col className="text-start">
            <div>
              {props.data[0]}g old food/day
            </div>
            <div>
              {props.data[1]}g new food/day
            </div>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="col-5 text-end">
            Day 3 & 4:
          </Col>
          <Col className="text-start">
            <div>
              {props.data[2]}g old food/day
            </div>
            <div>
              {props.data[3]}g new food/day
            </div>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="col-5 text-end">
            Day 5 & 6:
          </Col>
          <Col className="text-start">
            <div>
              {props.data[4]}g old food/day
            </div>
            <div>
              {props.data[5]}g new food/day
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="col-5 text-end">
            Day 7:
          </Col>
          <Col className="text-start">
            <div>
              0g old food/day
            </div>
            <div>
              {props.data[6]}g new food/day
            </div>
          </Col>
        </Row>
      </div>
      : null }
    </div>
  );
}

export default FoodTransitionResult;
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

function FoodTransitionResult(props: {
  display: boolean,
  data: string[],
}) {

  const [dayColSize, setDayColSize] = useState<string>('col-5');

  useEffect(() => {
    if (props.data[0].includes('-')) {
      setDayColSize('col-4 col-sm-5');
    } else {
      setDayColSize('col-5');
    }

  }, [props.data])

  return (
    <div id="food-transition-result-container">
      {props.display ?
      <div>
        <Row className="mb-2">
          <Col className={dayColSize + " text-end"}>
            Day 1 & 2:
          </Col>
          <Col className="text-start">
            <div>
              {props.data[0]} old food/day
            </div>
            <div>
              {props.data[1]} new food/day
            </div>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className={dayColSize + " text-end"}>
            Day 3 & 4:
          </Col>
          <Col className="text-start">
            <div>
              {props.data[2]} old food/day
            </div>
            <div>
              {props.data[3]} new food/day
            </div>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className={dayColSize + " text-end"}>
            Day 5 & 6:
          </Col>
          <Col className="text-start">
            <div>
              {props.data[4]} old food/day
            </div>
            <div>
              {props.data[5]} new food/day
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className={dayColSize + " text-end"}>
            Day 7:
          </Col>
          <Col className="text-start">
            <div>
              {props.data[6]} new food/day
            </div>
          </Col>
        </Row>
      </div>
      : null }
    </div>
  );
}

export default FoodTransitionResult;
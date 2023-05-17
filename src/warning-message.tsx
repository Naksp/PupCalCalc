import { Col } from "react-bootstrap";

function WarningMessage(props: {
  label: string,
}) {
  return (
    <>
      <Col id='warning-container' className='col-11 col-sm-10 pl-3 pr-1 py-2 text-start'>
        Caloric requirements for {props.label} dogs can vary greatly depending on activity level.
        It's always best to work with your vet in order to ensure the health of your dog, especially when trying to lose or gain weight.
      </Col>
    </>
  )
}

export default WarningMessage;
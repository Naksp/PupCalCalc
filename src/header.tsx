import { Container, Row } from "react-bootstrap";

function Header() {
  return (
    <Container>
      <Row>
        <h1 className='logo-text'>Dog Calorie Calculator</h1>
      </Row>
    </Container>
  )
}

export default Header;
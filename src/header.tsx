import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';

function Header() {

  let location = useLocation();

  return (
    <Container>
      <Row className='mb-2'>
        <h1 className='logo-text'>Dog Calorie Calculator</h1>
      </Row>
      <Row className='mb-1 justify-content-center'>
        <Col className='col-5'>
          <Link to='/' className='nav-link'>
            <span className={location.pathname === '/' ? 'link-active' : ''}>
              Calculate
            </span>
          </Link>
        </Col>
        <Col className='col-5'>
          <Link to='/learn' className='nav-link'>
            <span className={location.pathname === '/learn' ? 'link-active' : ''}>
              Learn
            </span>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Header;
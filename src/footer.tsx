import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './footer.scss';

function Footer() {

  return (
    <Container className='footer-container'>
      <Row className='justify-content-center'>
        <Col className='col text-start px-4'>
          <div>
            <a href='https://www.isaacware.dev'>isaacware.dev</a>
          </div>
          <div>
            <a href='mailto:contact@isaacware.dev'>contact@isaacware.dev</a>
          </div>
        </Col>
        <Col className='col text-end px-4'>
          mail
        </Col>
      </Row>
    </Container>
  )

}

export default Footer;
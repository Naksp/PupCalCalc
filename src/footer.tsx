import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faAddressBook, faGlobe } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './footer.scss';
import { faEnvelope, } from '@fortawesome/free-regular-svg-icons';
import { ReactComponent as GlobeIcon} from './assets/globe.svg';
import { ReactComponent as MailIcon} from './assets/mail.svg';
import { ReactComponent as CodeIcon} from './assets/code.svg';


function Footer() {

  return (
    <Container className='footer-container'>
      <Row className='justify-content-center'>
        <Col className='col text-end px-3'>
          <span id='link-code'>
            <a href='https://github.com/Naksp/dog-calorie-calculator' target="_blank" rel="noopener noreferrer" title="Website code">
              <CodeIcon style={{width: '1.5rem'}}/>
            </a>
          </span>
          <span id='link-mail'>
            <a href='mailto:contact@isaacware.dev' title="Email developer">
              <MailIcon style={{width: '1.5rem'}}/>
            </a>
          </span>
          {/* <span id='link-website'>
            <a href='https://www.isaacware.dev' target="_blank" rel="noopener noreferrer" title="Developer's website">
              <GlobeIcon style={{width: '1.5rem'}}/>
            </a>
          </span> */}
        </Col>
      </Row>
    </Container>
  )

}

export default Footer;
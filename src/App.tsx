/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Card} from 'react-bootstrap';
import './App.scss';
import Footer from './footer';
import { Routes, Route } from 'react-router-dom';
import Calculator from './calculator';
import Learn from './learn';
import Header from './header';
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-RG23129EK6';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(MEASUREMENT_ID);
}


function App() {
  return(
    <div className='app d-flex'>
      <Container id='app-container'>

        <Header />

        <Card className='border-standard app-card px-3 mb-2'>
          <Routes>
            <Route path='/' element={<Calculator />} />
            <Route path='/learn' element={<Learn />} />
          </Routes>
        </Card>

        <Footer />

      </Container>
    </div>
  )

}

export default App;

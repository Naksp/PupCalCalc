import { Container, Row, Col } from "react-bootstrap";
import './learn.scss'

const osuLink = 'https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/basic-calorie-calculator'

function Learn() {
	return (
		<>
			<Container id='learn-container' className='text-start my-3'>
				<Row>
					<Col>
						{/* <h1 className='learn-page-heading'>Why does it matter?</h1>
						<p>
							Your dog's diet is vital to their health and well-being.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p> */}

						<h1 className='learn-page-heading'>How the result is calculated</h1>
						<p>
							Dog Calorie Calculator is based on this formula described by the <a href={osuLink} target='_blank' rel='noopener noreferrer'>Ohio State Veterinary Medical Center</a>:
						</p>
						<p className='text-center'>
							70(weight in kgs)<sup>3/4</sup> * k-factor = result
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p>
					</Col>

				</Row>

			</Container>
		</>
	)
}

export default Learn;
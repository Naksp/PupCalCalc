import { Container, Row, Col } from "react-bootstrap";
import './learn.scss'

const osuLink = 'https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/basic-calorie-calculator';
const bodyConditionLink = 'https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/body-condition-muscle-condition-score-charts';

function Learn() {
	return (
		<>
			<Container id='learn-container' className='text-start my-3'>
				<Row>
					<Col>
						<h1 className='learn-page-heading'>How the result is calculated</h1>
						{/* <p>
							Dog Calorie Calculator is based on this formula described by the <a href={osuLink} target='_blank' rel='noopener noreferrer'>Ohio State Veterinary Medical Center</a>:
						</p> */}
						<p>First, a Resting Energy Requirement (RER) for your dog is calculated using the following formula:</p>
						<p className='indent'>
							70(<i>weight in kgs</i>)<sup>3/4</sup> = RER
						</p>
						<p>The RER is then multiplied by a K-factor. The K-factor is determined by your dogs life stage and other factors, such as being spayed/neutered, and activity level.</p>

						<table id='k-factor-table'>
							<thead>
								<tr>
									<th>Some thing</th>
									<th>k-factor</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Puppy 0-4 months</td>
									<td>3.0</td>
								</tr>
								<tr>
									<td>Puppy 4-12 months</td>
									<td>2.0</td>
								</tr>
								<tr>
									<td>Puppy 4-12 months</td>
									<td>2.0</td>
								</tr>
								<tr>
									<td>Neutered adult</td>
									<td>1.6</td>
								</tr>
								<tr>
									<td>Intact adult</td>
									<td>1.8</td>
								</tr>
								<tr>
									<td>Active Adult</td>
									<td>2.0-5.0</td>
								</tr>
								<tr>
									<td>Inactive Adult</td>
									<td>1.2-1.4</td>
								</tr>
							</tbody>
						</table>
						
					</Col>

				</Row>

			</Container>
		</>
	)
}

export default Learn;
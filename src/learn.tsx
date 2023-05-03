import { Container, Row, Col, Table } from "react-bootstrap";
import './learn.scss'

const osuLink = 'https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/basic-calorie-calculator';
const bodyConditionLink = 'https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/body-condition-muscle-condition-score-charts';

function Learn() {
	return (
		<>
			<Container id='learn-container' className='text-start my-3'>
				<Row>
					<Col>
						{/* <h1 className='learn-page-heading'>How the result is calculated</h1> */}
						<h1 className='learn-page-heading'>How is the result calculated?</h1>
						<p>First, your dog's Resting Energy Requirement (RER) is calculated. This is the amount of energy needed by your dog in order to perform essential bodily functions, and is based solely on your dog's size. RER is determined by the following equation:</p>
						<p className='center'>
							70(<i>weight in kgs</i>)<sup>3/4</sup> = RER
						</p>
						<p>The RER is then multiplied by a K-factor. The K-factor is determined by your dogs life stage and other factors, such as being spayed/neutered, and activity level.</p>

						<div id='table-container'>
						<Table id='k-factor-table' size='sm' className='center'>
							<thead>
								<tr>
									<th>Life factors</th>
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
						</Table>
						</div>
						
						<p>
							For example, for a 12kg, 10 month old puppy, the final equation will be:
						</p>
						<p className='center'>
							70(<b>12</b>)<sup>3/4</sup> * <b>2.0</b> = <b>903</b> kcal/day
						</p>

						<p>
							Take a look at <a href={osuLink}>Ohio State Veterinary Medical Center's page</a> about this process if you're interested in learning more!
						</p>
						

					</Col>

				</Row>

			</Container>
		</>
	)
}

export default Learn;
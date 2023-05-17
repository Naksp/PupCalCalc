import { Container, Row, Col, Table } from "react-bootstrap";
import './learn.scss'
import { useEffect } from "react";
import ReactGA from 'react-ga4';
import Utils from './Util'

// Links
const osuLink = 'https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/basic-calorie-calculator';
const bodyConditionLink = 'https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/body-condition-muscle-condition-score-charts';
const canineHealthNutLink = 'https://thecaninehealthnut.com/your-dogs-nutritional-needs/';
const spotOnTreatsLink = 'https://www.spotondogtraining.org/dog-treats';

function Learn() {

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/learn', title: 'Learn Page'});
  }, []);

	return (
		<>
			<Container id='learn-container' className='text-start my-3'>
				<Row>
					<Col>
						<h1 className='learn-page-heading'>How is the result calculated?</h1>
						<p>
							First, your dog's Resting Energy Requirement (RER) is calculated.
							This is the amount of energy needed by your dog in order to perform essential bodily functions, and is based solely on weight.
							RER is determined by the following equation:
						</p>
						<p className='center'>
							70(<i>weight in kgs</i>)<sup>3/4</sup> = RER
						</p>
						<p>
							The RER is then multiplied by a K-factor.
							The K-factor is determined by your dogs life stage and other factors, such as being spayed/neutered, and activity level.
							Here's a list of the life factors considered by this calculator, and their corresponding K-factors:
						</p>

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
							A 12kg, 10 month old puppy, for example, will have a K-factor of 2.0, and the final equation will be:
						</p>
						<p className='center'>
							70(<b>12</b>)<sup>3/4</sup> * <b>2.0</b> = <b>903</b> kcal/day
						</p>

						<p>
							Take a look at the <a href={osuLink} target='_blank' rel='noopener noreferrer'>Ohio State Veterinary Medical Center's page</a> about this process if you're interested in learning more!
						</p>
					</Col>
				</Row>

				<Row>
					<Col>
						<h1 className='learn-page-heading'>How accurate is the calculation?</h1>

						<p>Not very. Using this method, the actual caloric requirements for your dog can vary as much as 50% from the estimation. This estimate should only serve as a baseline, and you should work with your vet and regularly check your dogs body condition in order to provide the most appropriate diet for your dog.</p>
					</Col>
				</Row>

				<Row>
					<Col>
						<h1 className='learn-page-heading'>More resources</h1>

						<p>
							<a href={bodyConditionLink} target='_blank' rel='noopener noreferrer'>Body Condition & Muscle Condition Score Charts</a>
						</p>

						<p>
							<a href={canineHealthNutLink} target='_blank' rel='noopener noreferrer'>The Canine Health Nut - Your dog's nutritional needs</a>
						</p>

						<p>
							<a href={spotOnTreatsLink} target='_blank' rel='noopener noreferrer'>Spot On Dog Training - Treat recommendations</a>
						</p>

					</Col>
				</Row>

			</Container>
		</>
	)
}

export default Learn;
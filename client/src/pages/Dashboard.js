import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import { BeerContainer } from '../components/BeerContainer';
import AddModal from '../components/AddModal';
import './dashboard.css';

class Dashboard extends Component {

	state = { 
		show: false
	}

	showAddModal = () => {
		this.setState({ show: true });
	}

	hideAddModal = () => {
		this.setState({ show: false });
	}

	render() {
		if (!this.props.isAuth) {
			return <Redirect to='/' />
		}
		return (
			<Container>
				<div className='welcomeMessage'>
					<h1>Welcome to your Pourscore Dashboard, {this.props.currentUser}</h1>
					<h3>
						You've rated {this.props.beers.length} beers with Pourscore.
						How about <span className='addBeerPrompt' onClick={this.showAddModal}>adding a new beer</span>?
					</h3> 
					<br />
				</div>
				<div>
					<AddModal show={this.state.show} hideModal={this.hideAddModal.bind(this)}/>
				</div>
				<div>
					<BeerContainer test='test' beersArray={this.props.beers} />
				</div>
			</Container>
		);
	}
}

export default Dashboard;

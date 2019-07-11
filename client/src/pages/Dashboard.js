import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import { BeerContainer } from '../components/BeerContainer';
import AddModal from '../components/AddModal';
import axios from 'axios';
import './dashboard.css';

class Dashboard extends Component {

	state = { 
		show: false,
		userId: '',
		beersArray: []
	}

	componentDidMount = () => {
		this.updateUserInfo();
	}

	showAddModal = () => {
		this.setState({ show: true });
	}

	hideAddModal = () => {
		this.setState({ show: false });
	}

	updateUserInfo = () => {
		let currentUser = this.props.currentUser;
		axios.get('/api/users/' + currentUser).then(
			data => {
				let currentUserId = data.data._id;
				this.setState({ userId: currentUserId }, function stateUpdateComplete() {
					this.loadBeers()
				})
			}
		).catch(err => console.log(err))
	}

	loadBeers = () => {
		let userId = this.state.userId;
		axios.get('/api/beers/' + userId).then(
			data => {
				this.setState({ beersArray: data.data });
			}
		).catch(err => console.log(err))
	}

	render() {
		if (!this.props.isAuth) {
			return <Redirect to='/' />
		}
		return (
			<Container>
				<div className='welcomeMessage'>
					<h1>Welcome to your dashboard, <span style={{fontWeight: 'bold'}}>{this.props.currentUser}</span>!</h1>
					<h3>
						You've rated {this.state.beersArray.length} beers with Pourscore.
						How about <span className='addBeerPrompt' onClick={this.showAddModal}>adding a new beer</span>?
					</h3> 
					<hr />
					<br />
				</div>
				<div>
					<AddModal show={this.state.show} hideModal={this.hideAddModal.bind(this)} username={this.props.currentUser} userId={this.state.userId} />
				</div>
				<div>
					<BeerContainer test='test' beersArray={this.state.beersArray} />
				</div>
			</Container>
		);
	}
}

export default Dashboard;

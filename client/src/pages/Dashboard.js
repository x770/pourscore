import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import { BeerContainer } from '../components/BeerContainer';
import ListsContainer from '../components/ListsContainer';
import AddModal from '../components/AddModal';
import ListsModal from '../components/ListsModal';
import axios from 'axios';
import './dashboard.css';

class Dashboard extends Component {

	state = { 
		show: false,
		userId: '',
		beersArray: [],
		listsArray: []
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
					this.loadBeers();
					this.loadLists();
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

	loadLists = () => {
		let userId = this.state.userId;
		axios.get('/api/lists/' + userId).then(
			data => {
				this.setState({ listsArray: data.data });
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
					<br />
				</div>
				<div>
					<AddModal show={this.state.show} hideModal={this.hideAddModal.bind(this)} username={this.props.currentUser} userId={this.state.userId} reload={this.componentDidMount.bind(this)} />
				</div>
				<ListsModal
					showLists={this.props.showLists}
					handleListsToggle={this.props.handleListsToggle}
					lists={this.props.lists}
				/>
				<div className='gridContainer'>
					<ListsContainer listsArray={this.state.listsArray} />
					<BeerContainer
						beersArray={this.state.beersArray}
						loadBeers={this.loadBeers.bind(this)}
					/>
				</div>
			</Container>
		);
	}
}

export default Dashboard;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import BeerContainer from '../components/BeerContainer';
import ListsContainer from '../components/ListsContainer';
import AddModal from '../components/AddModal';
import ListsModal from '../components/ListsModal';
import NewListModal from '../components/NewListModal';
import axios from 'axios';
import './dashboard.css';

class Dashboard extends Component {

	state = { 
		showAddModal: false,
		showNewListModal: false,
		allBeers: [],
		listId: '',
		totalBeers: '',
		beersArray: [],
		allLists: []
	}

	componentDidMount = () => {
		this.fetchAllBeers();
		this.fetchAllLists();
	}
	
	handleAddModal = () => {
		this.setState({ showAddModal: !this.state.showAddModal })
	}

	handleNewListModal = () => {
		this.setState({ showNewListModal: !this.state.showNewListModal })
	}

	fetchAllBeers = () => {
		axios.get('/api/beers/user/' + this.props.user_id)
			.then(response => {
				this.setState({
					totalBeers: response.data.length,
					allBeers: response.data,
					beersArray: response.data
				})
			}).catch(err => console.log(err))
	}

	fetchAllLists = () => {
		axios.get('/api/lists/user/' + this.props.user_id)
			.then(response => {
				this.setState({
					allLists: response.data
				})
			}).catch(err => console.log(err))
	}

	// Update current list based off of user selection
	updateListId = (list_id) => {
		this.setState({
			listId: list_id,
		})
	}


	// Fetch array of beers based on list selection
	fetchListBeers = (listId) => {
		var beersArray = [];
		var idsArray = [];

		// GET request to grab array of list's beers' ids
		axios.get('/api/lists/' + listId)
			.then(response => {
				let beerIds = response.data[0].beers;
				beerIds.map(beerId => idsArray.push(beerId));

				response.data[0].beers.map(beerId => {
					axios.get('/api/beers/' + beerId).then(
						response => {
							beersArray.push(response.data[0]);
						})
				});
			})
		console.log(beersArray);
		// This setState appears empty on first run which causes a blank rendering; if hard-coded, it works first time
		this.setState({ beersArray: beersArray });
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
						You've rated {this.state.totalBeers} beers with Pourscore.
						How about <span className='addBeerPrompt' onClick={this.handleAddModal}>adding a new beer</span>?
					</h3> 
					<br />
				</div>
				<div>
					<AddModal show={this.state.showAddModal} hideModal={this.handleAddModal.bind(this)} username={this.props.currentUser} userId={this.props.user_id} reload={this.componentDidMount.bind(this)} />
				</div>
				<div>
					<NewListModal show={this.state.showNewListModal} hideModal={this.handleNewListModal.bind(this)} userId={this.props.user_id} allBeers={this.state.allBeers} reload={this.componentDidMount.bind(this)} />
				</div>
				<ListsModal
					showLists={this.props.showLists}
					handleListsToggle={this.props.handleListsToggle}
					lists={this.props.lists}
				/>
				<div className='gridContainer'>
					<ListsContainer
						listsArray={this.state.allLists}
						list_id={this.state.listId}
						handleNewListModal={this.handleNewListModal.bind(this)}
						updateListId={this.updateListId.bind(this)}
						fetchAllBeers={this.fetchAllBeers.bind(this)}
						fetchListBeers={this.fetchListBeers.bind(this)}
					/>
					<BeerContainer
						allBeers={this.state.allBeers}
						beersArray={this.state.beersArray}
					/>
				</div>
			</Container>
		);
	}
}

export default Dashboard;

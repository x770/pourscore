import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../components/Container';
import BeerContainer from '../components/BeerContainer';
import ListsContainer from '../components/ListsContainer';
import AddModal from '../components/AddModal';
import ListsModal from '../components/ListsModal';
import axios from 'axios';
import './dashboard.css';

class Dashboard extends Component {

	state = { 
		show: false,
		listId: '',
		totalBeers: '',
		beersArray: [],
		allLists: []
	}

	componentDidMount = () => {
		this.fetchAllBeers();
		this.fetchAllLists();
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.listId !== this.state.listId) {
			console.log('List change')
			this.fetchListBeers(this.state.listId)
		}
	}

	handleAddModal = () => {
		this.setState({ show: !this.state.show })
	}

	fetchAllBeers = () => {
		if (this.state.listId === '') {
			axios.get('/api/beers/user/' + this.props.user_id)
				.then(response => {
					this.setState({
						totalBeers: response.data.length,
						beersArray: response.data
					})
				}).catch(err => console.log(err))
		}
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
		this.setState({ listId: list_id })
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

				console.log(idsArray);
				response.data[0].beers.map(beerId => {
					axios.get('/api/beers/' + beerId).then(
						response => {
							beersArray.push(response.data[0]);
						})
				});
			})
		this.setState({ beersArray: beersArray }, () => {
			console.log(beersArray);
			console.log(this.state.beersArray)
		})
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
					<AddModal show={this.state.show} hideModal={this.handleAddModal.bind(this)} username={this.props.currentUser} userId={this.props.user_id} reload={this.componentDidMount.bind(this)} />
				</div>
				<ListsModal
					showLists={this.props.showLists}
					handleListsToggle={this.props.handleListsToggle}
					lists={this.props.lists}
				/>
				<div className='gridContainer'>
					<ListsContainer
						listsArray={this.state.allLists}
						updateListId={this.updateListId.bind(this)}
						fetchListBeers={this.fetchListBeers.bind(this)}
					/>
					<BeerContainer
						beersArray={this.state.beersArray}
						list_id={this.state.listId}
						fetchBeers={this.fetchAllBeers.bind(this)}
					/>
				</div>
			</Container>
		);
	}
}

export default Dashboard;

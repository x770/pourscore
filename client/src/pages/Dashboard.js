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
		listName: 'All Beers',
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
	updateListId = async (list_id) => {
		
		let listName;

		if (list_id !== '') {
			let listRes = await axios.get('/api/lists/' + list_id);
			listName = listRes.data[0].name;
		} else {
			listName = 'All Beers'
		}
		
		await this.setState({
			listId: list_id,
			listName: listName
		})
	}

	// Fetch array of beers based on list selection
	fetchListBeers = async (listId) => {

		let idsRes = await axios.get('/api/lists/' + listId);
		let idsArray = idsRes.data[0].beers;

		const promises = idsArray.map(
			async beerId => {
				const response = await axios.get('/api/beers/' + beerId)
				return response.data[0]
			})
		
		const results = await Promise.all(promises);

		this.setState({ beersArray: results });
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
						You've added {this.state.totalBeers} beers to Pourscore.
						How about <span className='addBeerPrompt' onClick={this.handleAddModal}>adding a new beer</span>?
					</h3> 
					<br />
				</div>
				<div>
					<AddModal show={this.state.showAddModal} hideModal={this.handleAddModal.bind(this)} username={this.props.currentUser} userId={this.props.user_id} reload={this.componentDidMount.bind(this)} allLists={this.state.allLists} />
				</div>
				<div>
					<NewListModal show={this.state.showNewListModal} hideModal={this.handleNewListModal.bind(this)} userId={this.props.user_id} allBeers={this.state.allBeers} reload={this.componentDidMount.bind(this)} />
				</div>
				<ListsModal
					showLists={this.props.showLists}
					handleListsToggle={this.props.handleListsToggle}
					lists={this.props.lists}
					listsArray={this.state.allLists}
					list_id={this.state.listId}
					handleNewListModal={this.handleNewListModal.bind(this)}
					updateListId={this.updateListId.bind(this)}
					fetchAllBeers={this.fetchAllBeers.bind(this)}
					fetchListBeers={this.fetchListBeers.bind(this)}
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
						fetchBeers={this.fetchAllBeers.bind(this)}
						fetchListBeers={this.fetchListBeers.bind(this)}
						listId={this.state.listId}
						listName={this.state.listName}
						reload={this.componentDidMount.bind(this)}
						allLists={this.state.allLists}
					/>
				</div>
			</Container>
		);
	}
}

export default Dashboard;

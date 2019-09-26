import React, { Component } from 'react';
import { withContext } from '../../context/appContext.js';
import { AddModal, BeerContainer, ListsContainer, NewListModal } from '../../components';
import axios from 'axios';
import './style.css';

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
	};

	componentDidMount = () => {
		console.log(this.props.state.beers.length);
		this.fetchAllBeers();
		this.fetchAllLists();
	};

	handleAddModal = () => {
		this.setState({ showAddModal: !this.state.showAddModal });
	};

	handleNewListModal = () => {
		this.setState({ showNewListModal: !this.state.showNewListModal });
	};

	fetchAllBeers = () => {
		axios
			.get('/api/beers/user/' + this.props.user_id)
			.then(response => {
				this.setState({
					totalBeers: response.data.length,
					allBeers: response.data,
					beersArray: response.data
				});
			})
			.catch(err => console.log(err));
	};

	fetchAllLists = () => {
		axios
			.get('/api/lists/user/' + this.props.user_id)
			.then(response => {
				this.setState({
					allLists: response.data
				});
			})
			.catch(err => console.log(err));
	};

	// Update current list based off of user selection
	updateListId = async list_id => {
		let listName;

		if (list_id !== '') {
			let listRes = await axios.get('/api/lists/' + list_id);
			listName = listRes.data[0].name;
		} else {
			listName = 'All Beers';
		}

		await this.setState({
			listId: list_id,
			listName: listName
		});
	};

	// Fetch array of beers based on list selection
	fetchListBeers = async listId => {
		let idsRes = await axios.get('/api/lists/' + listId);
		let idsArray = idsRes.data[0].beers;

		const promises = idsArray.map(async beerId => {
			const response = await axios.get('/api/beers/' + beerId);
			return response.data[0];
		});

		const results = await Promise.all(promises);

		this.setState({ beersArray: results });
	};

	render() {
		return (
			<React.Fragment>
				<div className="welcomeMessage">
					<h1>Welcome to your dashboard, {this.props.state.user.username}!</h1>
					<h3>
						You've added {this.props.state.beers.length} beers to Pourscore. How
						about{' '}
						<span className="addBeerPrompt" onClick={this.handleAddModal}>
							adding a new beer
						</span>
						?
					</h3>
					<br />
					<button onClick={this.props.logout}>Log Out</button>
				</div>
				<div>
					<AddModal
						show={this.state.showAddModal}
						hideModal={this.handleAddModal.bind(this)}
						userId={this.props.user_id}
						reload={this.componentDidMount.bind(this)}
						allLists={this.state.allLists}
					/>
				</div>
				<div>
					<NewListModal
						show={this.state.showNewListModal}
						hideModal={this.handleNewListModal.bind(this)}
						userId={this.props.user_id}
						allBeers={this.state.allBeers}
						reload={this.componentDidMount.bind(this)}
					/>
				</div>
				<div className="gridContainer">
					<ListsContainer
						listsArray={this.state.allLists}
						list_id={this.state.listId}
						listName={this.state.listName}
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
						updateListId={this.updateListId.bind(this)}
						listId={this.state.listId}
						listName={this.state.listName}
						reload={this.componentDidMount.bind(this)}
						allLists={this.state.allLists}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default withContext(Dashboard);

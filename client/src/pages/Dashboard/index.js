import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withContext } from '../../context/appContext.js';
import { BeerContainer, ListsContainer } from '../../components';
import axios from 'axios';
import './style.css';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddModal: false,
			showNewListModal: false,
			allBeers: [],
			listId: '',
			listName: 'All Beers',
			totalBeers: '',
			beersArray: [],
			allLists: []
		};
	}
	

	componentDidMount = () => {
		// this.fetchAllBeers();
		// this.fetchAllLists();
	};

	handleLogout = () => {
		this.props.logout();
		this.props.history.push('/logout');
	}

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
					<br />
					<button onClick={this.handleLogout}>Log Out</button>
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
						beers={0}
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

export default withRouter(withContext(Dashboard));

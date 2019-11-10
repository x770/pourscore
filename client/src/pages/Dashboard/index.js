import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withContext } from '../../context/appContext.js';
import { AddModal, BeerContainer, MainDash, SidebarComponent, UserBar } from '../../components';
import AddBeerModal from '../../components/AddBeerModal';
import axios from 'axios';
import './style.css';

const mobile = window.matchMedia(`(max-width: 768px)`);

class Dashboard extends Component {
	constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: !mobile.matches,
      isMobile: mobile.matches,
      fullWidthDash: false,
			showAddBeerModal: false,
			currentList: 'All Beers'
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.setSidebarOpen = this.setSidebarOpen.bind(this);
  }

  componentWillMount = () => {
    mobile.addListener(this.mediaQueryChanged);
	}
	
	componentDidMount = () => {
		document.body.style.height = '100%';
		document.body.style.overflow = 'hidden';
		this.props.getBeers();
	};

  componentWillUnmount = () => {
		mobile.removeListener(this.mediaQueryChanged);
		document.body.style.height = null;
		document.body.style.overflow = null;
  }

  setSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open
    })
  }

  mediaQueryChanged = () => {
    this.setState({
      sidebarDocked: !mobile.matches,
      isMobile: mobile.matches,
      sidebarOpen: false
    })
  }
  
  toggleSidebar = () => {
    this.setState({
      sidebarDocked: !this.state.sidebarDocked,
      fullWidthDash: !this.state.fullWidthDash
    })
  }
	
	handleModal = () => {
		this.setState({
			showAddBeerModal: !this.state.showAddBeerModal
		})
	}

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
			<div className='dashboard'>
        <SidebarComponent
          docked={this.state.sidebarDocked}
          isMobile={this.state.isMobile}
          toggleSidebar={this.toggleSidebar}
        />
        <div className={this.state.sidebarDocked && this.state.isMobile ? 'overlayShow' : 'overlayHide'}></div>
        <MainDash
          sidebarDocked={this.state.sidebarDocked}
          isMobile={this.state.isMobile}
          fullWidthDash={this.state.fullWidthDash}
					toggleSidebar={this.toggleSidebar}
					currentList={this.state.currentList}
        />
      </div>
		);
	}
}

export default withRouter(withContext(Dashboard));

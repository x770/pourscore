import React, { Component } from 'react';
import { withContext } from '../../context/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

class Settings extends Component {
  render() {
    return (
      <div>
        {this.props.show ? 
          (
            <div className='settingsDropdown'>
              <ul>
                <li>Log Out</li>
              </ul>
            </div>
          )
            :
          (null)
        }
      </div>
    )
  }
}

export default withContext(Settings);
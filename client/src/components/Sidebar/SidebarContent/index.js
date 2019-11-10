import React from 'react';
import { withContext } from '../../../context/appContext';
import { ListsContainer } from '../../index';

const sidebarContent = (props) => (
  <div>
    <ListsContainer />
  </div>
)

export default withContext(sidebarContent);
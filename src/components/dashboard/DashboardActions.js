import React from 'react';
import {Link} from 'react-router-dom';

const DashboardActions = () => {
  return(
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"/>Edit profile
      </Link>
      <Link to="/edit-experience" className="btn btn-light">
        <i className="fas fa-black-tie text-primary"/>Add experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"/>Add education
      </Link>
    </div>
  )
}

export default DashboardActions;
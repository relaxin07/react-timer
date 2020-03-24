import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './task-details.css';

const TaskDetails = ({ taskItem }) => {
  const { taskName, timeStart, timeSpend, timeEnd } = taskItem;

  return (
    <div>
      <h2>Task information</h2>
      <div>Task name - {taskName}</div>
      <div>Start time - {timeStart}</div>
      <div>End time - {timeEnd}</div>
      <div>Spend time - {timeSpend}</div>
      <Link className="back-home-link" to='/'>Back home</Link>
    </div>
  );
};

const mapDispatchToProps = (state) => {
  const { taskItem } = state;
  return { taskItem };
};

export default connect(mapDispatchToProps)(TaskDetails);
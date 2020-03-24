import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/reducer';
import { bindActionCreators } from 'redux';
import './generate-task.css';


function createRandomNmbr(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function convertorTime(minutes) {
  let h = minutes / 60 ^ 0;
  let m = minutes > 59 ? minutes - 60 : minutes;
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;
  return `${h}:${m}:00`;
}


function createTask(action) {
  let countNumber = createRandomNmbr(10, 15);
  let tasks = [];
  for (let i = 1; i <= countNumber; i++) {
    tasks.push({
      id: `${i}task${i}`,
      taskName: `Task ${i}`,
      timeSpend: convertorTime(createRandomNmbr(30, 90)),
    });
  }
  action(tasks);
  return tasks;
}


const GenerateTasks = ({ generateTaskThunk }) => {
  return (
    <button className="generate-btn" onClick={() => createTask(generateTaskThunk)}>Generate</button>
  );
};


const mapDispatchToProps = (dispatch) => {
  const { generateTasks, generateTaskThunk } = bindActionCreators(actions, dispatch);
  return {
    generateTasks,
    generateTaskThunk,
  };
};

export default connect(null, mapDispatchToProps)(GenerateTasks);


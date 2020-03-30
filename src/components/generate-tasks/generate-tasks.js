import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../store/modules/tasks/index';
import { bindActionCreators } from 'redux';
import './generate-task.css';


function createRandomNmbr(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function convertorTime(time) {
  let seconds = Math.round(time / 1000);
  let h = seconds / 3600 ^ 0;
  let m = (seconds - h * 3600) / 60 ^ 0;
  let s = (seconds - h * 3600) % 60;
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;
  return `${h}:${m}:${s}`;
}


function createTask(action) {
  let countNumber = createRandomNmbr(10, 15);
  let tasks = [];
  let timeStart = new Date();
  timeStart.setHours(createRandomNmbr(6, 9), [0], [0]);

  for (let i = 1; i <= countNumber; i++) {
    let timeEnd = new Date();
    timeEnd.setHours(timeStart.getHours(), [timeStart.getMinutes() + createRandomNmbr(10, 90)], [timeStart.getSeconds()]);
    tasks.push({
      id: `${i}task${i}`,
      timeStart: timeStart.toLocaleTimeString(),
      taskName: `Task ${i}`,
      timeEnd: timeEnd.toLocaleTimeString(),
      timeSpend: convertorTime(timeEnd - timeStart),
    });
    timeStart.setHours(timeEnd.getHours(), [timeEnd.getMinutes() + createRandomNmbr(5, 10)], [timeEnd.getSeconds()]);
  }
  action(tasks);
  return tasks;
}

const GenerateTasks = ({ generateTasks }) => {
  return (
    <button className="generate-btn" onClick={() => createTask(generateTasks)}>Generate</button>
  );
};

const mapDispatchToProps = (dispatch) => {
  const { generateTasks } = bindActionCreators(actions, dispatch);
  return {
    generateTasks,
  };
};

export default connect(null, mapDispatchToProps)(GenerateTasks);


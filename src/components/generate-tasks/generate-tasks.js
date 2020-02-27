import React from "react";
import {connect} from 'react-redux';
import * as actions from '../../actions/actions';
import {bindActionCreators} from 'redux'


function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function convertorTime(minutes) {
    let h = minutes / 60 ^ 0;
    let m = minutes > 59 ? minutes - 60: minutes;
    if(h < 10 ) h = '0' + h;
    if(m < 10 ) m = '0' + m;
    return `${h}:${m}:00`;
}


function createTask(action) {
    let countNumber = randomInteger(10,15);
    let tasks = [];
    for(let i = 1; i<= countNumber ; i++){
        tasks.push({
            taskId : i,
            taskName: `Task ${i}`,
            timeSpend : convertorTime(randomInteger(30,90)),
        })
    }
    action(tasks);
    return tasks;
}


const GenerateTasks = ({generateTasks}) => {
    return(
        <button onClick={() => createTask(generateTasks)}>Generate</button>
    )
}

const mapStateToProps = () => {
    return {}
}
const mapDispatchToProps = (dispatch) =>{
   const {generateTasks} = bindActionCreators(actions,dispatch)
    return {generateTasks };
}

export default connect(mapStateToProps,mapDispatchToProps)(GenerateTasks);


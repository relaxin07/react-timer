import React from "react";
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

const TaskDetails = ({taskItem}) => {
    const {taskName, timeStart, timeSpend, timeEnd} = taskItem;

    return (
        <div>
            <h2>Задача</h2>
            <div>имя задачи - {taskName}</div>
            <div>время старта - {timeStart}</div>
            <div>время окончания - {timeEnd}</div>
            <div>длительность - {timeSpend}</div>
            <Link to='/'>Back home</Link>
        </div>
    )
}

const mapDispatchToProps = (state) => {
    const {taskItem} = state;
    return {taskItem}
}

export default connect(mapDispatchToProps)(TaskDetails);
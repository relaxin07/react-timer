import React from 'react';
import './timer.css';
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from "../../actions/actions";

import Modal from '../modal';

class Timer extends React.Component {
    constructor() {
        super();
        this.timerId = null;
        this.timeStart = null;

        this.state = {
            hidden: true,
            sec: '00',
            min: '00',
            h: '00',
            taskText: '',
            modalStatus: false,
            taskId : 1 ,
        }
    }

    useStyles = () => makeStyles({
            timerBtn: {
                background: '#fff',
                textTransform: 'uppercase',
            },
        }
    );

    displayNone = () => {
        const {hidden} = this.state;
        this.setState({hidden: !hidden});
    };

    onTimer = () => {
        let {sec, min, h} = this.state;

        this.timeStart = new Date();
        this.timerId = setInterval(() => {

            sec = parseInt(sec) + 1;
            min = parseInt(min);
            h = parseInt(h);

            if (sec === 60) {
                sec = 0;
                min++;
            }
            sec = sec < 10 ? '0' + sec : sec;

            if (min === 60) {
                min = 0;
                h++;
            }
            min = min < 10 ? '0' + min : min;
            h = h < 10 ? '0' + h : h;

            this.setState(() => ({
                sec,
                min,
                h,
            }))
        }, 1000);

    }

    /* timeSpend = (timeStart , timeEnd) =>{
         let seconds = (timeEnd - timeStart)/ 1000 ^ 0 ;
         let h = seconds / 3600 ^ 0;
         let m = (seconds-h*3600)/60 ^ 0 ;
         let s = (seconds-h*3600) % 60 ;
         if (h<10) h = "0" + h;
         if (m<10) m = "0" + m;
         if (s<10) s = "0" + s;
         return (`${h}: ${m}: ${s}`);
     }*/

    stopTimer = (event) => {
        const {sec, min, h, taskText,taskId} = this.state;
        const {addItem, showModal} = this.props;

        if (taskText.length === 0) {
            event.stopPropagation();
            event.preventDefault();
            showModal();
            return false;
        }

        clearTimeout(this.timerId);

        let timeEnd = new Date();

        addItem(taskId,taskText, this.timeStart.toLocaleTimeString(), timeEnd.toLocaleTimeString(), `${h}:${min}:${sec}`);

        this.setState(() => ({
            min: '00',
            sec: '00',
            h: '00',
            taskText: '',
            modalStatus: false,
            taskId: taskId +1 ,

        }))
    };

    onChange(event) {
        this.setState({
            taskText: event.target.value,
        })
    }

    render() {

        const classes = this.useStyles();
        let {min, sec, h, hidden, taskText} = this.state;
        let {statusModal, showModal} = this.props;

        const modal = statusModal ? <Modal showModal={showModal}/> : null;


        const buttonChange = hidden ?
            <Button className={classes.timerBtn} variant="contained" onClick={this.onTimer}> Start </Button> :
            <Button className={classes.timerBtn} variant="contained"
                    onClick={(event) => this.stopTimer(event)}> Stop </Button>;
        return (
            <div className='wrap-top-block'>
                {modal}

                <input type="text" className="task-input-name" value={taskText} onChange={(event) => {
                    this.onChange(event)
                }} placeholder="Name of your task"/>

                <div className="b-timer">
                    <div className="time">
                        <span className="time__items">{h} : {min} : {sec}</span>
                    </div>
                </div>

                <span onClick={this.displayNone}>{buttonChange}</span>

            </div>
        )
    }
}

const mapStateToProps = ({statusModal}) => {
    return {
        statusModal
    }
};

const mapDispatchToProps = (dispatch) => {
    const {addItem, showModal} = bindActionCreators(actions, dispatch);
    return {
        addItem,
        showModal,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);


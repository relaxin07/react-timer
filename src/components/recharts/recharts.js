import React, {Component,PureComponent} from "react";
import {connect} from 'react-redux';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

import cloneDeep from 'lodash/cloneDeep';

class Recharts extends Component {

    state={
        data: []
    }

    componentDidMount() {
        const {data} = this.state;
        this.changeData(data);
        this.convertData();
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props !== prevProps){
            const {data} = this.state;
            this.changeData(data);
            this.convertData();
        }
    }

    changeData (data) {
        for (let i = 0; i < 24; i++) {
            data[i] = {id: i, min: 0,}
        }
        this.setState(()=>({
            data
        }))
    }

    convertTimeInMinutes = (h, m, s) => {
        return parseInt(h * 60) + parseInt(m);
    }

    convertData = () => {
        let { data} = this.state;
        let {tasks} = this.props;

        for (let i = 0; i < tasks.length; i++) {
            if(tasks[i].timeStart === undefined){
                tasks[i].timeStart = '00:00:00';
            }
            else{

            }
            let dataTimeSplit = tasks[i].timeStart.split(':');

            let idDataStartTime = parseInt(dataTimeSplit[0]);


            const timeSpendOnTask = tasks[i].timeSpend.split(':');
            let timeSpendOnMinutes = this.convertTimeInMinutes(...timeSpendOnTask);

            while( timeSpendOnMinutes > 0){
                let amountForFullMinutes = 60 - data[idDataStartTime].min;
                data[idDataStartTime].min = data[idDataStartTime].min + timeSpendOnMinutes;

                if ( data[idDataStartTime].min > 60) {
                    data[idDataStartTime].min = 60;
                    idDataStartTime++;
                    timeSpendOnMinutes = timeSpendOnMinutes - amountForFullMinutes;
                }
                else {
                    timeSpendOnMinutes = 0;
                }
            }
            this.setState(() =>({
                data,
            }))
            tasks[i].timeStart = undefined;
        }

    };
    render() {
        const {data} = this.state;
        let  newData  = cloneDeep(data);

        return(
            <div style={{maxWidth: '100%', height:300 , padding:'0 20px 0 0'}}>
            <ResponsiveContainer>
            <BarChart
                data={newData}
                margin={{
                    top: 20, right: 0, left: 0, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name="Minutes in this hours" dataKey="min" fill="#3248C7" />
            </BarChart>
            </ResponsiveContainer>
        </div>
        )
    }
}

const mapStateToProps = ({tasks}) =>{
    return {tasks}
}


export default connect(mapStateToProps)(Recharts);
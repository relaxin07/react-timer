import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../reducers/reducer';
import GenerateTasks from '../generate-tasks/generate-tasks';


const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  tbody: {
    background: '#EAF6FF',
  },
  topCell: {
    color: '#9699A7',
  },
  td: {
    color: '#4962D0',
  },
  button: {
    background: '#fff',
    color: '#4962D0',
    '&:hover': {
      backgroundColor: '#fff',

    },
  },
});

const MyTables = ({ tasks, deteleItemThunks, getTask }) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer align="center">
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.topCell}>№</TableCell>
              <TableCell className={classes.topCell} align="left">Task</TableCell>
              <TableCell className={classes.topCell} align="left">Time start</TableCell>
              <TableCell className={classes.topCell} align="left">Time end</TableCell>
              <TableCell className={classes.topCell} align="left">Time Spend</TableCell>
              <TableCell className={classes.topCell} align="left">Info</TableCell>
              <TableCell className={classes.topCell} align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {tasks.filter((item => item.statusTask !== 'progress'))
              .map((item, i) => (
                <TableRow key={i}>
                  <TableCell className={classes.td} align="left">{i + 1}</TableCell>
                  <TableCell className={classes.td} component="th" scope="row">
                    {item.taskName}
                  </TableCell>
                  <TableCell className={classes.td} align="left">{item.timeStart}</TableCell>
                  <TableCell className={classes.td} align="left">{item.timeEnd}</TableCell>
                  <TableCell className={classes.td} align="left">{item.timeSpend}</TableCell>
                  <TableCell className={classes.td} align="left">
                    <Link to={`/tasks/${item.taskId}`}>
                      <Button className={classes.button} variant="contained"
                              onClick={() => getTask(item.taskName)}> info </Button>
                    </Link>
                  </TableCell>
                  <TableCell className={classes.td} align="left">
                    <Button className={classes.button}
                            variant="contained"
                            onClick={() => deteleItemThunks(item.taskName)}> delete </Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <GenerateTasks/>
    </>

  );
};

const mapState = (state) => {
  const { tasks } = state;
  return { tasks };
};

const mapDispatchToProps = (dispatch) => {
  const { addItem, getTask } = bindActionCreators(actions, dispatch);
  const { deleteItemThunk } = actions;
  return {
    addItem,
    deteleItemThunks: (payload) => dispatch(deleteItemThunk(payload)),
    getTask,
  };
};

export default connect(mapState, mapDispatchToProps)(MyTables);
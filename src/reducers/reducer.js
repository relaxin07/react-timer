import { createSlice } from '@reduxjs/toolkit';
import Service from '../service/service';

const service = new Service();
const getTasks = service.getTasks();


let idTask = 0;

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
      tasks: getTasks,
      statusModal: false,
      taskItem: {},
    },
    reducers: {
      addItem: {
        reducer: (state, action) => {
          state.tasks = state.tasks.filter((item) => {
            return item.statusTask !== 'progress';
          });
          state.tasks.push(action.payload);
        },
        prepare(info) {
          return { payload: { id: idTask++, ...info } };
        },
      },

      deleteItem: (state, action) => {
        let ind = state.tasks.findIndex((item) => {
          return item.taskName === action.payload;
        });
        if (ind > -1) {
          state.tasks.splice(ind, 1);
        }
      },

      showModal: (state, action) => {
        state.statusModal = !state.statusModal;
      },

      generateTasks: (state, action) => {
        state.tasks = action.payload;
      },

      getTask: (state, action) => {
        const filterTask = state.tasks.filter((item) => {
          return item.taskName === action.payload;
        });
        state.taskItem = filterTask[0];
      },
    },
  },
);


function deleteItemThunk(payload) {
  return (dispatch) => {
    service.deleteItem(payload);
    dispatch(deleteItem(payload));
  };
}

function generateTaskThunk(payload) {
  return (dispatch) => {
    service.generateTask(payload);
    dispatch(generateTasks(payload));
  };
}

function addItemThunk(payload) {
  return (dispatch) => {
    service.addItem(payload);
    dispatch(addItem(payload));
  };
}

function addProgressTaskThunk(payload) {
  return (dispatch) => {
    service.addProgressTask(payload);
    dispatch(addItem(payload));
  };
}


const { addItem, deleteItem, showModal, generateTasks, getTask } = tasksSlice.actions;

const actions = {
  addItem,
  deleteItem,
  showModal,
  generateTasks,
  getTask,
  deleteItemThunk,
  generateTaskThunk,
  addProgressTaskThunk,
  addItemThunk,
};

export {
  actions,
};

export default tasksSlice.reducer;
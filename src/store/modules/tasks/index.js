import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let idTask = 0;

const addItemThunk = createAsyncThunk('tasks/addItem', async (payload, { getState, dispatch }) => {
  try {
    let data = getState().data;
    data = [...data, payload];
    localStorage.setItem('tasks', JSON.stringify(data));
    localStorage.removeItem('resumeTimer');
    dispatch(addItem(payload));
  } catch (error) {
    console.log(error);
  }
});


const deleteItem = createAsyncThunk('tasks/deleteItem', async (payload, { getState, dispatch }) => {
  try {
    let data = getState().data;
    let ind = data.findIndex((item) => {
      return item.taskName === payload;
    });
    if (ind > -1) {
      data = [...data.slice(0, ind), ...data.slice(++ind)];
    }
    localStorage.setItem('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
});

const saveTimeOnTimer = createAsyncThunk('users/resumeTimer', async (payload, { getState, dispatch }) => {
  const time = new Date().toString();
  localStorage.setItem('resumeTimer', JSON.stringify(time));
});

const generateTasks = createAsyncThunk('users/generateTasks', async (payload, { getState, dispatch }) => {
  localStorage.setItem('data', JSON.stringify(payload));
  return payload;
});


const getTime = createAsyncThunk('users/getTime', async () => {
  return localStorage.getItem('resumeTimer');
});


const getTasks = createAsyncThunk('tasks/getTasks',
  async (_, { dispatch }) => {
    try {
      let result = JSON.parse(localStorage.getItem('data'))
      return result === null ? [] : result;
    } catch (err) {
      console.log(err);
    }
  },
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
      resumeTimer: {
      },
      data: [],
      statusModal: false,
      taskItem: {},
    },
    reducers: {
      addItem: {
        reducer: (state, action) => {
          state.data.push(action.payload);

        },
        prepare(info) {
          return { payload: { id: idTask++, ...info } };
        },
      },

      showModal: (state, action) => {
        state.statusModal = !state.statusModal;
      },

      getTask: (state, action) => {
        const filterTask = state.data.filter((item) => {
          return item.taskName === action.payload;
        });
        state.taskItem = filterTask[0];
      },
    },
    extraReducers: {
      [getTasks.fulfilled]: (state, action) => {
        state.data = action.payload;
      },
      [getTime.fulfilled]: (state, action) => {
        state.resumeTimer = {
          time : action.payload,
          resume: action.payload !== null,
          status: true,
        };
      },

      [deleteItem.fulfilled]: (state,action)=>{
        state.data = action.payload;
      },
      [generateTasks.fulfilled]: (state,action)=>{
        console.log('work');
        state.data = action.payload;
      },
    },
  },
);

const {addItem,  showModal , getTask } = tasksSlice.actions;

export const actions = {
  showModal,
  getTask,
  deleteItem,
  getTasks,
  addItemThunk,
  generateTasks,
  saveTimeOnTimer,
  getTime,
};


export default tasksSlice.reducer;
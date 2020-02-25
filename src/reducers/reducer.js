const initialState = {
    tasks: [],
    statusModal: false,
    taskItem: {},
};

const reducer = (state = initialState, action) => {
    let {tasks, statusModal, taskItem} = state;
    const copyTasks = [...tasks];

    switch (action.type) {
        case "GET_TASK" :

            const filterTask = copyTasks.filter((item) => {
                return item.taskName === action.payload;
            });
            taskItem = filterTask[0];

            return {...state, taskItem};


        case "DELETE_ITEM":

            const itemName = action.payload;
            const ind = copyTasks.findIndex((item) => {
                return item.taskName === itemName;
            });

            const newCopyTasks = [...copyTasks.slice(0, ind), ...copyTasks.slice(ind + 1)];
            tasks = [...newCopyTasks];

            return {...state, tasks};

        case "ADD_ITEM":

            const {taskName, timeStart, timeEnd, timeSpend} = action;
            const addTask = [...tasks, {taskName, timeStart, timeEnd, timeSpend}];
            tasks = [...addTask];

            return {...state, tasks};

        case "SHOW_MODAL":

            statusModal = !statusModal;

            return {...state, statusModal};

        default:
            return state;
    }

};

export default reducer;
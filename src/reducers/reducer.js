const initialState = {
    tasks: [],
    statusModal: false,
    taskItem: {},
};

const reducer = (state = initialState, action) => {
    let {tasks, statusModal, taskItem} = state;

    switch (action.type) {
        case "GENERATE_TASKS":
           tasks = action.payload;
           return {...state,tasks};

        case "GET_TASK" :

            const filterTask = tasks.filter((item) => {
                return item.taskName === action.payload;
            });
            taskItem = filterTask[0];

            return {...state, taskItem};


        case "DELETE_ITEM":

            const itemName = action.payload;
            const ind = tasks.findIndex((item) => {
                return item.taskName === itemName;
            });

            const copyTasks = [...tasks.slice(0, ind), ...tasks.slice(ind + 1)];
            tasks = [...copyTasks];

            return {...state, tasks};

        case "ADD_ITEM":

            const {taskId,taskName, timeStart, timeEnd, timeSpend} = action;
            const addTask = [...tasks, {taskId,taskName, timeStart, timeEnd, timeSpend}];
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
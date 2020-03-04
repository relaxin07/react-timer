
const deleteItem = ( payload ) =>{
    return{
        type: 'DELETE_TASK',
        payload
    }
};

const addItem = (payload) =>{
    return {
        type:"ADD_TASK",
       payload,

    }
};

const showModal = () =>{
    return{
        type: "SHOW_MODAL",
    }
};

const getTask = ( payload) => {
    return {
        type: "GET_TASK",
        payload,
    }
};

const generateTasks = (payload) =>{
    return{
        type:'GENERATE_TASKS',
        payload
    }
}

const addProgressTask = (payload) =>{
    return {
        type:'ADD_PROGRESS_TASK',
        payload
    }
}

export {
    deleteItem,
    addItem,
    showModal,
    getTask,
    generateTasks,
    addProgressTask
};
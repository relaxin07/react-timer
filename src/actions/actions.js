
const worker = () => {
    return {
    type : 'THIS_WORK',
    }
};

const deleteItem = ( payload ) =>{
    return{
        type: 'DELETE_ITEM',
        payload
    }
};

const addItem = (taskId,taskName ,timeStart , timeEnd , timeSpend) =>{
    return {
        type:"ADD_ITEM",
        taskId,
        taskName,
        timeStart,
        timeEnd,
        timeSpend,

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

export {
    worker ,
    deleteItem,
    addItem,
    showModal,
    getTask,
    generateTasks,
};

const worker = () => {
    return {
    type : 'THIS_WORK',
    }
}

const deleteItem = ( payload ) =>{
    console.log(payload)
    return{
        type: 'DELETE_ITEM',
        payload
    }
}

const addItem = (taskName ,timeStart , timeEnd , timeSpend) =>{
    return {
        type:"ADD_ITEM",
        taskName,
        timeStart,
        timeEnd,
        timeSpend,

    }
}

const showModal = () =>{
    return{
        type: "SHOW_MODAL",
    }
}

const getTask = ( payload) => {
    return {
        type: "GET_TASK",
        payload,
    }
}

export {
    worker ,
    deleteItem,
    addItem,
    showModal,
    getTask
};
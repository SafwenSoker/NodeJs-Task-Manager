const Task = require('../models/task')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req,res)=>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const getTask = asyncWrapper(async (req,res)=>{  
    
        const { id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){          
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})

const createTask = asyncWrapper(async (req,res)=>{
        const task = await Task.create(req.body)
        res.status(200).json({task})    
})

const updateTask = asyncWrapper(async (req,res)=>{
        const { id:taskID } = req.params
        console.log(req.body);
        const { name:newName, completed:newCompleted } = req.body
        if(!newName){
            return res.status(401).send("Incorrect name or completed not checked")
        }
        const task = await Task.findOneAndUpdate({_id:taskID}, {name:newName, completed:newCompleted},{
            runValidators:true,
            new:true
        })
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async(req,res)=>{
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})    
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json(task)
})
// const editTask = async (req,res)=>{
//     try {
//         const { id:taskID } = req.params
//         console.log(req.body);
//         const { name:newName, completed:newCompleted } = req.body
//         if(!newName){
//             return res.status(401).send("Incorrect name or completed not checked")
//         }
//         const task = await Task.findOneAndUpdate({_id:taskID}, {name:newName, completed:newCompleted},{
//             runValidators:true,
//             new:true,
//             overwrite:true
//         })
//         if(!task){
//             return res.status(404).json({update:"failed", msg: `No task with id : ${taskID}`})
//         }
//         res.status(200).json({task})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    // editTask
}


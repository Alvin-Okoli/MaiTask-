import jwt from 'jsonwebtoken'
import { User, Task } from '../Model/model.js'

//dotenv config and enviromental variables
import dotenv from 'dotenv'
dotenv.config();
const secret = process.env.SECRET

//jwt
const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id}, secret, {expiresIn: maxAge})
}

//User endpoints
export const loginPost = async (req, res)=>{
    const {email, password} = req.body;
    console.log(email, password)
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookies('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: 'invalid email or password'})
    }
}

export const register = async (req, res)=>{
    const {email, password, name} = req.body;
    console.log(email, password, name)

    try{
        let user = await User.create({email, password, name})
        let userObject = user.toObject()
        delete userObject.password;
        console.log(user)
        const token = createToken(user._id)
        res.status(200).json({userObject, token})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: 'Registration failed'})
    }
}

export const getUsers = async (req, res)=>{
    console.log('received')
    try{
        let user = await User.find().populate('tasks')
        if(!user){
            return res.status(400).json({message: 'Unable to load users'})
        }
        let updatedUser = user.map(users=>{
            const userObject = users.toObject()
            delete userObject.password
            return userObject
        })
        console.log(updatedUser)
        res.status(200).json(updatedUser)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
} 

export const tasksPerUser = async (req, res)=>{
    const users = await User.find().populate('tasks').select('id tasks name');
    const tasksPerUser = users.map(user=>{
        return {
            userId: user._id,
            userName: user.name,
            userTasks: user.tasks.length || 0
        }
    })
    res.status(200).json({tasksPerUser}) 
}

export const tasksPerStatus = async (req, res)=>{
    const users = await User.find().populate('tasks').select('id status name');
}

//Tasks
export const getTasks = async (req, res)=>{
    console.log('received')
    try{
     let task = await Task.find().populate('assigned_to')
        console.log(task)
        if(!task){
            return res.status(400).json({message: 'Unable to load tasks'})
        }
        const taskUpdate = task.map(tasks=>{
            tasks.assigned_to.map(assign=>{
                assign.password = null
                return assign
            })
            return tasks
            })
        res.status(200).json({taskUpdate})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
} 


export const getUserTasks = async (req, res)=>{
    const id = req.params.userId
    console.log(id)
    try{
        const userTask = await User.findById(id).select('_id tasks').populate('tasks')
        res.status(200).json({userTask})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

export const setTasks = async (req, res)=>{
    try{
        const {title, status, assigned_to, dueDate, description, priority} = req.body;
        console.log(title, status, assigned_to, dueDate, description, priority);
        const tasks = await Task.create({title, status, assigned_to,  dueDate, description, priority});
        if(assigned_to){
          for (const assign of assigned_to){
            const done = await User.findByIdAndUpdate(assign, {"$push": {"tasks": tasks._id}}, {new: true})
            console.log(done)
          };
        }
        res.status(200).json({tasks});
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: 'Unable to set task'})
    }
} 

export const setManyTasks = async (req, res)=>{
    try{
        const {tasks} = req.body
        console.log(tasks)
        tasks = await Task.
        res.status(200).json({tasks})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: 'Unable to set task'})
    }
} 


export const updateTasks = async (req, res)=>{
    // const id = req.params.id
    const {id, update} = req.body
    console.log(id, update)
    try{
        const task = await Task.findByIdAndUpdate(id,{'$set': update}, {
            new: true
        })
        if(!task){
            return res.status(400).json({message: 'Unable to update task'})
        }
        return res.status(200).json({task})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
}


export const deleteTasks = async (req, res)=>{
    const id = req.params.id
    try{
        const deletedTask = await Task.findByIdAndDelete(id)
        if(!deletedTask){
            return res.status(400).json({message: `Couldn't find task`})
        }
        res.status(200).json({message: 'Task deleted successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
}


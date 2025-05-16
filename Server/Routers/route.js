import { Router } from "express";
import { loginPost, register, getTasks, setTasks, updateTasks, deleteTasks, getUsers, getUserTasks, setManyTasks, tasksPerUser, tasksPerStatus} from "../Controllers/controller.js"

const router = Router();

//user routes
router.post('/login', loginPost)
router.post('/register', register)
router.get('/user', getUsers)
router.get('/usertask', tasksPerUser)
router.get('/statusTasks', tasksPerStatus)

//task routes
router.get('/tasks', getTasks) 
router.get('/tasks/:userId', getUserTasks)
router.post('/tasks', setTasks) 
router.post('/manytasks', setManyTasks) 
router.put('/tasks/:id', updateTasks), 
router.delete('/tasks/:id', deleteTasks) 
// router.post('/tasks', setTasks) 


export default router
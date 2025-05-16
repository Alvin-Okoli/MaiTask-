import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: null
    },
    role: {
    type: String,
    enum:['admin', 'user'],
    default: 'user'
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password){
    let user = await this.findOne({email}).populate('tasks')
    if(!user){
        throw Error('invalid email or password')
    }
    const auth = await bcrypt.compare(password, user.password)
    if(!auth){
        throw Error('invalid email or password')
    }
    user.password = undefined
    return user
}

const User = mongoose.model('User', userSchema);

const taskSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
        default: null
    },
    status: [{
        type:String,
        enum: ['To-Do', 'In Progress', 'Done', 'Overdue']
    }],
    assigned_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dueDate: {
        type: Date,
        default: null
    },
    priority: {
        type: String,
        enum: [null, 'low', 'mid', 'high'],
        default: null
    }
},{timestamps: true})

const Task = mongoose.model('Task', taskSchema);

export {User, Task};
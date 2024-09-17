import express from 'express';
import { getUsers, createUser, getUser } from './queries/database.js'

const router = express.Router();

//GET ALL USERS 

router.get('/users', async (req,res) =>{
    try{
        const users = await getUsers();
        res.status(200).json(users);

    }catch(error){
        res.status(500).send("Error in request");
    }
});

//GET USER BY id

router.get('/users/:id', async (req,res) =>{
    try{
        const { id } = req.params;
        const user = await getUser(id);
        if (user){
            res.status(200).json(user);
        }else{
            res.status(500).send("user not found");
        }
        

    }catch(error){
        res.status(500).send("Error in request");
    }
});

//CREATE A USER

router.post('/users', async (req,res)=>{
    try{
        const { first_name, last_name, email, user_name } = req.body;
        const createdUser =  await createUser(first_name, last_name, email, user_name);
        console.log(createUser)
        res.status(201).json(createdUser);
    }catch(error){
        res.status(500).send("ERROR User cannot be created");
    }
   
});

export default router;
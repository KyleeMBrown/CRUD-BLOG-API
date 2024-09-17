import express from 'express';
import { getUsers, createUser, getUser, deleteUser, updateUser } from './queries/database.js'

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
        //console.log(createUser)
        res.status(201).json(createdUser);
    }catch(error){
        res.status(500).send("ERROR User cannot be created");
    }
   
});

//DELETE A USER 
router.delete('/delete-user/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const deletedUser = await deleteUser(id);

        if (deletedUser.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    }catch(error) {
        console.error('Error deleting user:', error); 
        res.status(500).json({ message: 'Error when deleting user' });
    }
})

//UPDATE USER NAME

router.put('/update-user/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const {username} = req.body;
        const update = await updateUser(id, username);
        const Getuser = await getUser(id);
        const user = Getuser

        
        res.status(200).json({message:`${user.first_name}'s username has been updated to ${username}`, user})
    }catch(error){
        res.status(500).json({message: `Error updating user`})
    }
})

export default router;
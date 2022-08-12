const jwt = require('jsonwebtoken');
const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

require('../db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send('Hello World! from ROUTER')
})

router.post('/register',async (req, res)=>{
    //changed
    const {name, email, phone, work, password, cpassword, date ,messages} = req.body
    // const {name, email, phone, work, password, cpasswords} = req.body
 
    if(!name || !email || !phone || !work || !password || !cpassword){
         return res.status(422).json({error: "fill all the fields"})
    }

    try{
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error: "email already exist"})
        } else if(password != cpassword){
            return res.status(422).json({error: "password and confirm password not matched"})
        } else{
            if(email.endsWith("adamasuniversity.ac.in")){
                //changed
                 const user = new User({name, email, phone, work, password, cpassword, date ,messages})
            //'pre()' called here
                 await user.save()
                 res.status(201).json({message: "user registered sussessfully"})
            }else {
                console.log("email is not of adamas university");
                return res.status(426).json({error: "Please use email of Adamas University"})
            }
            
        }
        
    } catch(err){
        console.log(err)
    }
})

//login route 

router.post('/signin', async (req, res)=>{
    try{
        let token;
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({error: "email or password not filled"})
        }

        const userLogin = await User.findOne({email : email})
        // console.log(userLogin)
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken()
            console.log(token);
            res.cookie('jwtoken', token, {
               expires : new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            if(!isMatch){
                res.status(400).json({error: "invalid credentials pass"})
            }else{ 
                res.json({message: "signin successful"})
            } 
        } else{
            res.status(400).json({error: "invalid credentials"}) 
        }

    } catch(err){
        console.log(err)
    }
})


router.get('/about', authenticate, (req, res) => {
    console.log('about form auth');
    res.send(req.rootUser);
})

//get user data for contact us and home page
router.get('/getdata', authenticate, (req,res)=>{
    res.send(req.rootUser);
})

router.post('/contact', authenticate, async(req, res) => {
    try{
        const {name, email, phone, message} = req.body;
        if(!name || !email || !phone || !message){
            console.log('error in contact form');
            return res.json({error: "please fill the contact form"})
        }

        const userContact = await User.findOne({_id: req.userID});
        if(userContact)
        {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            // await userMessage.save();
            res.status(201).json({message:'user contact successful'})
        }
    }
    catch(error){

    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('user logged out');
})

module.exports = router;
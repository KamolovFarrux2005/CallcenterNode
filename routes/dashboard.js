const express = require('express');
const router = express.Router();
const User = require('../model/user');


router.get('/dashboard/addUser', (req, res) => {
    res.render('adduser');
});

router.post('/dashboard/addUser', async(req, res) => {
    console.log(req.body)
    const {number, name, manzil} = req.body;
    const saveuser = new User({
        fullName: name,
        number: number,
        location: manzil
    })
    
    await saveuser.save()
    .then(()=>{
        res.status(201).redirect('/admin/dashboard')    
    }).catch((err)=>{
        console.log(err)
    }); 
});

router.get('/dashboard', async(req, res) => {
    const users = await User.find()
    .then((result)=>{
        res.render('dashboard', {users: result})
    }).catch((err)=>{
        console.log(err);
    });
    
});
router.get('/dashboard/update/:id', (req, res)=>{
    const id = req.params.id;
    User.findById(id).then((result) => {
        res.render('edit', {update: result})
    })
});

router.put('/dashboard/update/:id', async(req, res)=>{
    const id = req.params.id;
    const updateuser = await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    fullName: req.body.name,
                    number: req.body.number,
                    location: req.body.manzil
                }
            }
       )
      
       try{
         res.redirect('/admin/dashboard')
       }catch(err){
         res.send(err);
       }
  }); 

  router.get('/dashboard/delete/:id', (req, res) => {
    const id = req.params.id;
        User.findByIdAndRemove(id).then(()=>{ return  res.redirect('/admin/dashboard')}).catch((err)=>{
            console.log(err)
        })
  });

module.exports = router;
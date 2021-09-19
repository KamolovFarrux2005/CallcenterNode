const express = require('express');
const { route } = require('./dashboard');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const passwordRes  = 123456
    if(email == 'admin@gmail.com' &&  password == passwordRes){
         res.redirect('/admin/dashboard');
    }
    else{
        console.log('parol yoki email notogri');
    }
});


module.exports = router;
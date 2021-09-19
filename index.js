const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dashboard = require('./routes/dashboard');
const auth = require('./routes/auth');
const methodOverride = require('method-override');

app.set('views', 'views');
app.set('view engine', 'ejs');


mongoose.connect('mongodb+srv://admin:admin@callcenter.nlwq1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>  console.log('mongodb worker')).catch((err)=>{console.log(err)});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride('_method'))

app.use('/admin/', dashboard);
app.use('/auth/', auth);


app.use((req, res, next) => {
    res.status(404).redirect('/auth/login');
});
  
const Port = process.env.PORT || 3000;

app.listen(Port, ()=>{
    console.log('work');
})
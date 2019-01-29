const express = require('express')
const path = require('path');
const mongoose = require('mongoose');

const app = express()

//settings
app.set('port', process.env.PORT || 3000)
mongoose.set('useFindAndModify', false);

//middlewares
app.use(express.json())

//static files
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/api/tareas', require('./routes'));

//listening port
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})

//connection to database
mongoose.connect('mongodb://localhost:27017/nevm', { useNewUrlParser: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error(err))
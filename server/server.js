const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({
    message: 'welcome to the contact keeper api'
}));


// Define Routes
const baseUrlWeb = '/api';
const user =  require('./routes/users');
const auth =  require('./routes/auth');
const contacts =  require('./routes/contacts');
app.use(baseUrlWeb, user);
app.use(baseUrlWeb, auth);
app.use(baseUrlWeb, contacts);
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
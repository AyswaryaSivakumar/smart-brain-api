const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
const port = process.env.PORT || 3000;
//Middleware to convert json string to json object
app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-cve1uh9c1ekc73ebls50-a',
    port: 5432,
    user: 'smart_brain_4h5e_user',
    password: 'O7HI4i0FZHWpcQd0PydCEslVtVRVvjqt',
    database: 'smart_brain_4h5e',
  },
});

app.get('/', (req, res) => res.json('Success'));
// SIGNIN
app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));
//REGISTER
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
// PROFILE
app.get('/profile/:id', (req, res) => profile.getProfile(req, res, db));
// IMAGE
app.put('/image', image.updateEntries(db));
app.post('/imageurl', (req, res) => image.handleClarifaiApiCall(req, res));

app.listen(port, () => console.log(`app is running on port ${port}`));
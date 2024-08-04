const express = require('express')
const app = express()
const port = 3000;

// const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const dotenv = require('dotenv').config();

// dotenv.config();

app.use(express.json());

// connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', todoRoutes);


require('./initDB')();

const TodoRoute = require('./Backend/Routes/todo.routes');
app.use('/todos', TodoRoute);

app.get('/', (req, res) => {
  res.sendFile("Frontend/index.html", {root: __dirname} )
})

app.get('/login', (req, res) => {
  res.sendFile("Frontend/login.html", {root: __dirname} )
})

app.get('/signup', (req, res) => {
  res.sendFile("Frontend/signup.html", {root: __dirname} )
})

// app.post('/signup', (req, res) => {
//   res.sendFile("Frontend/signup.html", {root: __dirname} )
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
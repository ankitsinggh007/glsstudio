
const Connect = require('./config/databseConfig');
const bodyParser = require('body-parser');
const express=require('express');
const cookieParser=require('cookie-parser');
const mainRoute=require('./routes');
const { Register, Login, loadUser, LogOut,NotesAdd, NotesUpdate, NotesDelete,Notefetch,
    NotesCreate,GetNotes } = require('./UserController');
const app=express();
const path=require('path');
const CORS=require('cors');
const { isAuthenticated } = require('./middleware/Authentication');
require('dotenv').config();

app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };
  app.use(CORS(corsOptions));

app.post('/register',Register);
app.post('/login',Login);
app.post('/add',NotesAdd);
app.get("/allpost",isAuthenticated,Notefetch);
app.post('/create',isAuthenticated,NotesCreate);
app.delete('/delete/:id',isAuthenticated,NotesDelete);
app.get('/get/:id',isAuthenticated,GetNotes);
app.put('/edit/:id',isAuthenticated,NotesUpdate);
app.get('/loaduser',isAuthenticated,loadUser);
app.get('/logout',LogOut);


app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
const connect=async()=>{
    try {
        await Connect(process.env.Mongo_URI);
        app.listen(process.env.PORT,()=>{
            console.log(`development server started on ${process.env.PORT}`);
        });
    } catch (error) {
        throw error;
    }
}

connect();

module.exports=app;
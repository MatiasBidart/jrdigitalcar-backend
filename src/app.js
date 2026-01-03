const express = require('express');
const app = express();
const {port} = require('./config');
const userRouter = require('./users/user.router');
const authRouter = require('./auth/auth.router');
const tagRouter = require('./tags/tag.router');
const blogRouter = require('./blogs/blog.router');
const categoryRouter = require('./categories/category.router');
const tagsBlogsRouter = require('./tagsBlogs/tagsBlogs.router')
const initModels = require('./models/initModels');
const passport = require('./middlewares/auth.middleware');//
const db = require('./utils/database')
const cors = require('cors')

app.use(cors({
  origin: "http://localhost:3000", // tu frontend
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));
app.use(express.json());
app.use(passport.initialize());

db.authenticate()
    .then(()=> {console.log('Database Authenticated')})
    .catch(err=> {console.log(err)});
db.sync()
    .then(()=> {console.log('Database Synced')})
    .catch(err=> {console.log(err)});

initModels()

app.get('/',
    (req,res) => {
        res.status(200).json({ message: 'OK', users: `/api/v1/users`})
    }
);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tag', tagRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/tags_blogs/', tagsBlogsRouter);
app.listen(port, () =>{console.log(`Server started at port ${port}`)})
const express = require("express");
const path = require("path");
const dotenv = require("dotenv") // need to install dotenv
const app = express()
const morgan = require("morgan");

dotenv.config();
const PORT = process.env.PORT || 8080;

const createViewPath = (page) =>
  path.resolve(__dirname, "views", `${page}.ejs`); // Lesson6/views/index.ejs

const myLogger = function (req, res, next) {
  console.log(`${req.method} - method,LOGGED ${new Date()}`)
  next();
};
// 

app.set("View engine","ejs")

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
})

app.use(myLogger);
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static("styles"))

app.get("/",(req,res) =>{
    res.render(createViewPath("index"),{title:"HomePage"})
})

app.get("/users",(req,res) => { 
    const data = fetch("https://jsonplaceholder.typicode.com/users")
    .then((data) => data.json())
    .then((users) =>  res.render(createViewPath("users"),{title:"Users",users}));
})

app.get("/jobs",(req,res) => {
    const jobs = ["Sofware Developer","Programmer","Farmer","Teacher"];
    res.render(createViewPath("jobs"),{title:"Jobs",jobs})
});

app.get("/gallery",(req,res) => {
    const photos = ["sd.jpg","mz.jpg","billgat.jpg","pd.jpg"];
    res.render(createViewPath("gallery"),{title:"Galleries",photos})
})

app.get("/contacts",(req,res) => {
    const contact = [
        {link:"https://youtube.com",name:"Youtube"},
        {link:"https://instagram.com",name:"Instagram"},
        {link:"https://facebook.com",name:"Facebook"},
        {link:"https://linkedin.com",name:"Linkedin"},
    ]
    res.render(createViewPath("contacts"),{title:"Contacts",contact})
})
app.use(express.static("img"))
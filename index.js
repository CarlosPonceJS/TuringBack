const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//ROUTES
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userBooksRoutes = require("./routes/userBooksRoutes")

const port = process.env.PORT;

app.get("/",(req,res)=>{res.send("Welcome to the server")});
app.use("/users",userRoutes);
app.use("/books",bookRoutes);
app.use("/userBooks",userBooksRoutes)
app.listen(port,()=>console.log(`Server running at port ${port}`));
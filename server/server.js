const express = require("express")
const cors = require("cors");
const app = express()
require("dotenv").config()
const routes = require("./routes/api")

const port = process.env.PORT
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,  
  }));

app.use("/openai", routes)

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})
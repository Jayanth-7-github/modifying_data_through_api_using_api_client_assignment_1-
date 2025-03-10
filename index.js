const express = require('express');
const { resolve } = require('path');
require("dotenv").config()
const {MenuItem}=require("./Schema")
const mongoose=require("mongoose")

const app = express();
const port = 3010;
app.use(express.json());


mongoose.connect(process.env.mongodb)
.then(()=>{console.log("your are connected to database")})
.catch((err)=>{console.error(err)})




app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/menu', async (req, res) => {
  try {

    const item = new MenuItem(req.body);
    await item.save();
    res.status(200).json({ message: `Your item ${item.name} is saved`, item });
  } catch (error) {
    res.status(500).json({ message: "Your item could not be saved", error:error.message});
  }
});

app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve items",error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
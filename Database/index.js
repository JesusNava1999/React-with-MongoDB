const express = require('express');
const { ObjectId } = require('mongoose');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('./database'); // npm i mongoose 
const Data = require('./model.js');

app.post('/test', async (req, res) => {
    const { value_1, value_2 } = req.body
    console.log(req.body);
    const data = new Data({ value_1, value_2 })
    await data.save()
    res.json({ msg: "Data Saved" });
});

app.get('/test', async (req, res) => {
    let dataSet = await Data.find()
    console.log(dataSet);
    res.json(dataSet);
});

app.delete('/test/:id', async (req, res) => {
    const { id } = req.params
    await Data.deleteOne({ _id: id })
    res.json({ msg:'Data Deleted' })
 })


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
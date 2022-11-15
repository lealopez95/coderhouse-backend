/* const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    comments: [{
        body: String,
        date: Date,
    }],
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean },
    meta: {
        votes: Number,
        favs:  Number,
    }
}); */

const mongoose = require('mongoose');

const { data }  = require('./base/test_data.js');
const {StudentModel} = require('./schemas/student.schema.js');

const DATABASE = "colegio";
const URI = `mongodb://localhost:27017/${DATABASE}`;

(async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to db");
        const student = {...data[0]};
        await new StudentModel(student).save();
        console.log("Document inserted succesfully")
    } catch(error) {
        console.log(error)
    }
})()
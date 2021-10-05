const mongoose = require('mongoose');

mongoose.connect(process.env.URI)
.then(()=>console.log("connection to database established"))
.catch((err)=>console.log(err));

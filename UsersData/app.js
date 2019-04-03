var bodyParser = require("body-parser"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

//CONFIG
mongoose.connect("mongodb://localhost/user_app",{ useNewUrlParser: true });
app.use(express.static("public"));
app.use(bodyParser.json())

//MONGOOSE CONFIG
var userSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    company_name: String,
    age: Number,
    city: String,
    state: String,
    zip: Number,
    email: String,
    web: String
})

var User = mongoose.model("User", userSchema);

// //RESTFULL ROUTES
app.get("/api/users", (req, res) => {
    User.find((err,data) => {
        if(err){
            res.status(400).send()
        } else{
            res.status(200).send(data)
        }
    })  
})

app.get("/api/users/:id", (req, res) => {
    User.findById(req.params.id,(err,result)=>{
        if(err){
            res.status(400).send()
        }
    res.status(200).send(result)
    })
})

app.put("/api/users/:id", (req, res) => {
    User.findOneAndUpdate({_id:req.params.id},{$set:{first_name:req.body.first_name, last_name:req.body.last_name, age:req.body.age}}, (err,result) => {
         if(err){
             res.status(400).send()
         } else{
            res.status(200).send("Successfully updated")
         }
    }) 
})

app.delete("/api/users/:id", (req, res) => {
   User.deleteOne({_id:req.params.id}, (err,data) => {
       if(err){
        res.status(400).send()
       }else{
        res.status(200).send("successfully deleted")
       }
   }) 
})

 // CREATE ROUTES
app.post("/api/users", (req, res) => {
    console.log(req.body)
    User.create(req.body, (err, newUser) => {
        if(err){
            res.status(400).send()
        } else{
            res.status(201).send("Successfully added");
        }
    })  
})

app.listen(2000, process.env.IP, () => {
    console.log("SERVER IS RUNNING!!")
})
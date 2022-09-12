import Express from "express";
import Mongoose from "mongoose";
import Cards from "./dbCards.js";
import Workers from "./workers.js";
import Products from "./products.js";
import Cors from "cors";

// App config

const app = Express();
const port = process.env.PORT || 8001;

//Mongo connection
const pass = "tinchodevelops1234";
const connectionUrl = `mongodb+srv://tinchoDevelops:${pass}@alkemycommerce.ta60zrq.mongodb.net/?retryWrites=true&w=majority`

// Middlewares
    app.use(Express.json());
    app.use(Cors());

//DB config
 Mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
 })

// API Endpoints
app.get("/", (req, res) => {
    res.status(200).send("Server created bien!")
})
app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err,data)=>{
        if(err){ res.status(500).send(err) }
        else{ res.status(201).send(data) }
    })
})

app.get("/tinder/cards", (req, res) => {
    Cards.find( (err,data) => {
        if(err){ 
            res.status(500).send(err)
        }else{ 
            res.status(200).send(data)
        }
    })
})

//workers

app.get("/workers", (req, res) => {
    Workers.find( (err,data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})
app.post("/workers", (req, res) => {
    const workerCard = req.body;

    Workers.create(workerCard, (err,data)=>{
        if(err) {
            res.status(500).send(err) 
        } else {
            res.status(201).send(data);
        }
    })
})
app.delete("/workers/:workerId", (req,res) =>{
    const workerId = req.params.workerId;

    Workers.findById(workerId, (err, worker) =>{
        if(err) {
            res.status(500).send({message: `Error finding worker id: ${err}`});
        } else {
            worker.remove(err => {
                if(err) res.status(500).send({message: `Error REMOVING worker: ${err}`});
                res.status(200).send({message: "Worker SUCCESFULLY removed"})
            })
        }
    })
})
app.put("/workers/:workerId", (req, res) =>{
    let workerId = req.params.workerId;
    let updateBody = req.body;

    Workers.findByIdAndUpdate(workerId, updateBody, (err, workerUpdated) => {
        if(err){
            res.status(500).send({message: `Error finding ID to update: ${err}`});
        }else{
            res.status(200).send({updatedData: updateBody})
        }
    })
})


// Listener
app.listen(port, ()=> {`Listening on port ${port}`})
console.log("bro! running on port " + port)
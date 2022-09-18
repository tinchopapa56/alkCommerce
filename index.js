import Express from "express";
import Mongoose from "mongoose";
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

//Products

app.get("/products", (req, res) => {
    Products.find( (err,data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})
app.post("/products", (req, res) => {
    const productCard = req.body;

    Products.create(productCard, (err,data)=>{
        if(err) {
            res.status(500).send(err) 
        } else {
            res.status(201).send(data);
        }
    })
})
app.delete("/products/:productId", (req,res) =>{
    const productId = req.params.productId;

    Products.findById(productId, (err, product) =>{
        if(err) {
            res.status(500).send({message: `Error finding product id: ${err}`});
        } else {
            product.remove(err => {
                if(err) res.status(500).send({message: `Error REMOVING product: ${err}`});
                res.status(200).send({message: "product SUCCESFULLY removed"})
            })
        }
    })
})
app.put("/products/:productId", (req, res) =>{
    let productId = req.params.productId;
    let updateBody = req.body;

    Products.findByIdAndUpdate(productId, updateBody, (err, productUpdated) => {
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
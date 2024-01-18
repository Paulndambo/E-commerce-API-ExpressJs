const express = require("express")
const morgan = require("morgan");
const PORT = 5000


//Middleware imports
const errorMiddleware = require("./middleware/error-handler");

//DB CONNECTION IMPORT
const connectDB = require("./db/connect");
//Routes Imports
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");


const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(morgan("tiny"))



app.use("/api/v1/products", productRoutes)
app.use("/api/v1/auth", authRoutes)


// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
  
    // Check if the error is a known type, handle accordingly
    if (err instanceof errorMiddleware) {
      return res.status(400).json({ error: 'Bad Request' });
    }
    // Handle other types of errors
    next(err)
});



const start_app = async() => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })

    } catch (error) {
        console.log("Error Connecting to Database")
    }
}

start_app()

// server.js
const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config(); 

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,   // yaha apna test key id daal
    key_secret: process.env.RAZORPAY_KEY_SECRET, // yaha apna secret daal
    
});
// Route: order create
app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: 9 * 100, // paise me (₹9 = 900 paise)
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});


// import multer from "multer"; // agar tum CommonJS use kar rahe ho to const multer = require("multer");
const multer = require("multer")
const upload = multer({ dest: "uploads/" }); // resume upload ke liye

// Form submission API
app.post("/submit-form", upload.single("resume"), (req, res) => {
  try {
    const { name, email, phone, qualification } = req.body;
    const resumeFile = req.file;

    console.log("Form Data:", { name, email, phone, qualification, resumeFile });

    // 🔥 abhi ke liye bas success bhej do
    res.json({ success: true, message: "Form submitted successfully!" });

    // Baad me yaha DB (MongoDB ya Firestore) me save karna hoga
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Form submission failed" });
  }
});



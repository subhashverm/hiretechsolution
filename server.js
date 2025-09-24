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
            console.log("ORDER CREATED:", order);  // 👈 ye add karo
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

// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// // Storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Application submit route
// app.post("/submit-form", upload.single("resume"), (req, res) => {
//   const application = {
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     qualification: req.body.qualification,
//     resume: req.file ? req.file.filename : null,
//     submittedAt: new Date(),
//   };

//   // Save data in JSON file
//   let filePath = "applications.json";
//   let applications = [];

//   if (fs.existsSync(filePath)) {
//     applications = JSON.parse(fs.readFileSync(filePath));
//   }

//   applications.push(application);

//   fs.writeFileSync(filePath, JSON.stringify(applications, null, 2));

//   res.json({ success: true, message: "Application submitted!" });
// });

// app.listen(5000, () => console.log("Server running at http://localhost:5000"));



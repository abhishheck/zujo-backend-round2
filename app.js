const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const schedule = require("./model/schedule.js");

const app = express();
const port = process.env.PORT;

//Midldlewares
app.use(express.json());
app.use(cors());

//Connecting to MongoDB Atlas
mongoose.connect(
    "mongodb+srv://test-user:testpass123@cluster0.fswxu.mongodb.net/zujoDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("connected to DB successfully");
    }
);

//getting all the scheduled
app.get("/schedule", async (req, res) => {
    try {
        const allSchedules = await schedule.find();
        res.json(allSchedules);
    } catch (error) {
        res.json({ message: error });
    }
    res.send("Hello World!");
});

// Student will request on this URL
app.post("/schedule", async (req, res) => {
    var newSchedule = new schedule({
        name: req.body.name,
        date: req.body.date,
        approveStatus: req.body.approveStatus,
    });
    try {
        const savedSchedule = await newSchedule.save();
        res.json(savedSchedule);
    } catch (err) {
        res.json({ message: err });
    }
});

// API to approve or reject the application
app.put("/schedule", async (req, res) => {
    try {
        const updatedScheduleStatus = await schedule.updateOne(
            { _id: req.body.scheduleID },
            {
                $set: {
                    approveStatus: req.body.approveStatus,
                },
            }
        );
        res.json(updatedScheduleStatus);
    } catch (err) {
        res.json({ message: err });
    }
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

const express = require("express");
const app = express();
const PORT = 5000;

const path = require("path");
const authRouter = require("./routes/auth.routes");
const verifyUser = require("./middleware/verify.middleware");

app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", verifyUser,(req, res) => {
    const name ="Tejinder";
    const contacts = [{name:"Contact 1",phone:9876543210}];
    res.render("hello",{name:name,contacts});
	});

app.use("/auth",authRouter);
// app,.use("/user",require("./routes/user.route"))

app.listen(PORT, () => console.log("Server running on port " + PORT));
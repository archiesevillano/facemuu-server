const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = 3010 || process.env.PORT; //SET UP PORT

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//set up database connection
const db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "commentbox",
});

app.post("/comments/new", (req, res) => {

    const { user, text, img } = req.body; //extract or destructure request body contents

    const insertCommand = "INSERT INTO `comments`(`commentID`, `image`, `username`, `comment`, `timestamp`) VALUES (?,?,?,?,?)";

    //inserting the contents of the request inside the database
    db.query(insertCommand, [null, img, user, text, "Just now"], (error, result) => {
        if (error) {
            console.log(`Error message: ${error}`);
        } else {
            res.send(true);
        }
    });

});

app.get("/comments", (req, res) => {
    const readCommand = "SELECT * FROM comments";

    db.query(readCommand, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    })
})

app.delete("/comments/delete/:id", (req, res) => {
    const id = req.params.id;

    const deleteCommand = "DELETE FROM comments WHERE commentID = ?";

    db.query(deleteCommand, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(true);
        }
    })
})


app.listen(PORT, () => {
    console.log(`${PORT} is now running`);
})
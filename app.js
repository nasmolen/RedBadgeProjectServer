require('dotenv').config();
const express = require("express");
// const router = express.Router();
// const validateSession = require('./middleware/validateSession');
const db = require("./db");
const app = express();
const routes = require('./routes');
// const controllers = require("./controllers");

app.use(require('./middleware/headers'));
app.use(express.json());
// app.use("/user", controllers.usercontroller);
// app.use("/campaigns", validateSession, controllers.campaigncontroller);

db.authenticate()
    .then(() => db.sync())
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
})
    .catch((err) => {
        console.log("[Server:] Server Crashed");
        console.error(err);
})

app.use('/', routes);
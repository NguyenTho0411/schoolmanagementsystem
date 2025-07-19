const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

// Import Swagger UI và specs từ swagger.js
const { swaggerUi, specs } = require("./swagger");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Tích hợp Swagger UI tại đường dẫn /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

// Nếu cần test tự động thì export app
module.exports = app;

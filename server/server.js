const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const generateRoutes = require('./routes/generateRoutes');


app.use(cors());

app.use(express.json());

app.use('/api/generate', generateRoutes);

app.get('/', (req, res) => {
  res.send("AI Resume Generator Backend Running");
});

// const models = await genAI.listModels();
// console.log(models);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));

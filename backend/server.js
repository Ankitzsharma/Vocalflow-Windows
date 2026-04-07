const express = require('express');
const cors = require('cors');
const balanceRoutes = require('./routes/balanceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', balanceRoutes);

app.get('/', (req, res) => {
    res.send('VocalFlow Windows Clone Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

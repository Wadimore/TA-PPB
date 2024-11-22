const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Define the proxy route
app.get('/api/csgo/teams', async (req, res) => {
    try {
        const response = await axios.get(`https://api.sportsdata.io/v3/csgo/scores/json/Teams`, {
            headers: {
                'Ocp-Apim-Subscription-Key': '4c7de96cf9f04da9b1e7feb4cfdd8273'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from SportsData API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

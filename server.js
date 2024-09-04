import express from 'express'
import apiRoutes from './routes/api.js';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/ky-blog-api', apiRoutes);

// Start the server
 app.listen(port, () => {
  console.log(`Server running is running at http://localhost:${port}`);
});
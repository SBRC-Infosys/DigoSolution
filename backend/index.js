const http = require('http');
const startServer = require('./src/app.js');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;

async function init() {
  try {
    const app = await startServer(); // Wait for the app to be initialized
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on('error', (error) => {
      console.error(`Error occurred: ${error.message}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

init(); // Start the initialization process

const express = require('express'); // Require express module
const cors = require('cors')
const routerApi = require('./routes')

const { logErrors, errorHandler, boomHandler } = require('./middlewares/error.handler')

const app = express(); // Create an express app
const port = process.env.PORT || 3000; // Set the port to 4000

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(options));
app.get('/api', (req, res) => { // Handle GET request to the root path of the application
  res.send('Hello World'); // Send 'Hello World' as the response
});

app.get('/api/nueva-ruta', (req, res) => { // Handle GET request to the '/nueva-ruta' path
  res.send('Nueva Ruta'); // Send 'Nueva Ruta' as the response
});

routerApi(app);
app.use(logErrors);
app.use(boomHandler);
app.use(errorHandler);






app.listen(port, () => { // Start the server and listen o n the specified port
  console.log(`Example app listening at http://localhost:${port}`); // Log a message to the console when the app is listening
});

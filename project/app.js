const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//connect to database
require('./api/helpers/database');


//routes
const categoriesRouter = require('./api/routes/categories');
const productsRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const accountRouter = require('./api/routes/account');


//routers
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/account', accountRouter);
//url not found
app.use((req, res, next) => {
  next(createError.NotFound());
});

//global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

//setting up the cluster to use all of the server's threads 
if (process.env.ENV == 'production') {
  const cluster = require('cluster');
  const numCPUs = require('os').cpus().length;
  const process = require('process');
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end('hello world\n');
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
  }
}

// if enviroment isn't production start up normally on one thread
else {
  app.listen(3000, () => console.log('the server has started on port 3000'));

}

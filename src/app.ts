import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import express, { Application } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { errorHandler, notFound } from './app/middlewares/errorMiddleware';
import routers from './app/routes';
import config from './config';

// App
const app: Application = express();
app.use(helmet());
app.set('host', config.ip);
app.set('port', config.port);
app.disable('x-powered-by');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

// Set the session cookie option to false
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: config.session_secret as string,
    cookie: { secure: true, httpOnly: true, sameSite: 'strict' }, // Adjust options as needed
  }),
);

// Initialize csrf middleware
const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);

// Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routers);

// Default api
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// CSRF token
app.get('/csrf-token', (req, res) => {
  // Include the CSRF token in the response
  const csrfToken = req.csrfToken();
  res.json({ csrfToken });
});

// 404 error handling
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;

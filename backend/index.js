const express = require('express');
const winston = require('winston');
const db = require('./services/sequelize');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

db.sequelize
    .sync()
    .then(() => {
        logger.info('Synced db.');
    })
    .catch((err) => {
        logger.info(`Failed to sync db: ${err.message}`);
    });

db.User.create({
    name: 'Massi',
    email: 'Massi@gmail.com',
    password: '$2b$10$6e321.3arCR4ugISZhyrjeOgTl6.K7LkFCPZUEwjgVBCpfTEm5Va2',
    verified: 0,
    banned: 0,
    identifier: '@Massi3557733779374202884416334395511602951321980121837',
});

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});

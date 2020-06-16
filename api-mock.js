const os = require('os');
const fs = require('fs');
const express = require('express');
const Busboy = require('busboy');
const _ = require('lodash');

const server = express();

server.use(express.json());
server.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:1337'];
    const requestOrigin = req.headers.origin;
    if (allowedOrigins.indexOf(requestOrigin) >= 0) {
        res.set('Access-Control-Allow-Origin', requestOrigin);
    }

    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-Request-Id', 'localhost-1234567890');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Access-Control-Allow-Headers', 'content-type');
    res.set('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE']);
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Expose-Headers', 'X-Request-Id');
    next();
});

const søkerMock1 = {
    aktørId: '1234567890',
    fødselsnummer: '12345123456',
    fornavn: 'Test',
    mellomnavn: null,
    etternavn: 'Testesen',
};

const barnMock = {
    barn: [
        { aktørId: '1', fødselsnummer: '12345123456', fornavn: 'Barn', mellomnavn: 'Barne', etternavn: 'Barnesen' },
        { aktørId: '2', fødselsnummer: '12345123456', fornavn: 'Mock', etternavn: 'Mocknes' },
    ],
};

const arbeidsgivereMock = {
    organisasjoner: [
        { navn: 'Arbeids- og velferdsetaten', organisasjonsnummer: '123451234' },
        { navn: 'Arbeids- og sosialdepartementet', organisasjonsnummer: '123451235' },
    ],
};

const startServer = () => {
    const port = 1234;

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get('/soker', (req, res) => {
        res.send(søkerMock1);
    });

    server.get('/barn', (req, res) => res.send(barnMock));

    server.get('/arbeidsgiver', (req, res) => {
        res.send(arbeidsgivereMock);
    });

    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startServer();

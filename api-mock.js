const express = require('express');
const path = require('path');
const soknadMock = require('./src/mockdata/soknad.json');

const server = express();

server.use(express.json());
server.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:1337', 'http://localhost:8080'];
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

const soknadMockTom = [];

const isLoggedIn = (req) => req.headers.cookie !== undefined;

const startServer = () => {
    const port = 1234;

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get('/login', (req, res) => {
        let authMockHtmlFilePath = path.resolve(__dirname, 'api-mock-login.html');
        res.sendFile(authMockHtmlFilePath);
    });
    server.get('/login/cookie', (req, res) => {
        res.cookie('localLoginCookie', 'mysecrettoken').sendStatus(201);
    });

    server.get('/soker', (req, res) => {
        if (isLoggedIn(req)) {
            res.send(søkerMock1);
        } else {
            res.status(401).send();
        }
    });

    server.get('/soker-err', (req, res) => {
        res.status(500).send();
    });

    server.get('/barn', (req, res) => res.send(barnMock));

    server.get('/arbeidsgiver', (req, res) => {
        res.send(arbeidsgivereMock);
    });

    server.get('/soknad', (req, res) => {
        if (isLoggedIn(req)) {
            res.send(soknadMock);
        } else {
            res.status(401).send();
        }
    });
    server.get('/soknadNoen', (req, res) => {
        if (isLoggedIn(req)) {
            res.send([soknadMock[0], soknadMock[2]]);
        } else {
            res.status(401).send();
        }
    });
    server.get('/soknadTom', (req, res) => {
        if (isLoggedIn(req)) {
            res.send(soknadMockTom);
        } else {
            res.status(401).send();
        }
    });

    server.get('/soknad-not-logged-in', (req, res) => {
        res.status(401).send();
    });

    server.get('/soknad-umyndig', (req, res) => {
        res.status(451).send();
    });

    server.get('/soknad/:soknadId/dokument', (req, res) => {
        if (isLoggedIn(req)) {
            res.download('eksempel-søknad.pdf', 'søknad.pdf');
        } else {
            res.status(401).send();
        }
    });
    server.get('/dokument/:journalpostId/:dokumentInfoId/:variantFormat', (req, res) => {
        if (isLoggedIn(req)) {
            switch (req.params.dokumentInfoId) {
                case '533438765':
                    res.download(
                        'Ettersending av vedlegg - Pleiepenger sykt barn.pdf',
                        'Ettersending av vedlegg - Pleiepenger sykt barn.pdf'
                    );
                    break;
                case '533438766':
                    res.download('BekreftelseTilKLONELABBEN.pdf', 'BekreftelseTilKLONELABBEN.pdf');
                    break;
                default:
                    res.download('Søknad om pleiepenger.pdf', 'Søknad om pleiepenger.pdf');
                    break;
            }
        } else {
            res.status(401).send();
        }
    });

    server.get('/soknad/:soknadId/arbeidsgivermelding', (req, res) => {
        if (isLoggedIn(req)) {
            res.download('BekreftelseTilKLONELABBEN.pdf', 'BekreftelseTilKLONELABBEN.pdf');
        } else {
            res.status(401).send();
        }
    });

    server.get('/mellomlagring', (req, res) => {
        res.send({});
    });

    server.get('/endringsmelding/mellomlagring', (req, res) => {
        res.send({
            formData: {},
            metadata: { lastStepID: 'tidsrom', version: '6.1', updatedTimestemp: '2021-09-20T14:18:01.060Z' },
        });
    });

    server.listen(port, () => {
        console.log(`Mockserver is listening on port: ${port}`);
    });
};

startServer();

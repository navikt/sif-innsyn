const express = require('express');
const helmet = require('helmet');

const soknaderMock = require('./mockdata/soknader.json');

const server = express();

server.use(express.json());

server.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    })
);

server.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
    next();
});

const startServer = () => {
    const port = 1234;

    server.get('/soknad', (req, res) => {
        res.send(soknaderMock);
    });

    server.get('/soknad/:soknadId/dokument', (req, res) => {
        res.download('./server/mockdata/eksempel-søknad.pdf', 'søknad.pdf');
    });

    server.get('/dokument/:journalpostId/:dokumentInfoId/:variantFormat', (req, res) => {
        switch (req.params.dokumentInfoId) {
            case '533438765':
                res.download(
                    './server/mockdata/Ettersending av vedlegg - Pleiepenger sykt barn.pdf',
                    'Ettersending av vedlegg - Pleiepenger sykt barn.pdf'
                );
                break;
            case '533438766':
                res.download('./server/mockdata/BekreftelseTilKLONELABBEN.pdf', 'BekreftelseTilKLONELABBEN.pdf');
                break;
            default:
                res.download('./server/mockdata/Søknad om pleiepenger.pdf', 'Søknad om pleiepenger.pdf');
                break;
        }
    });

    server.get('/soknad/:soknadId/arbeidsgivermelding', (req, res) => {
        res.download('./server/mockdata/BekreftelseTilKLONELABBEN.pdf', 'BekreftelseTilKLONELABBEN.pdf');
    });

    server.get('/mellomlagring', (req, res) => {
        res.send({
            formData: {},
            metadata: { lastStepID: 'tidsrom', version: '6.1', updatedTimestemp: '2021-09-20T14:18:01.060Z' },
        });
    });

    server.get('/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', (req, res) => {
        res.send({
            formData: {},
            metadata: { lastStepID: 'tidsrom', version: '6.1', updatedTimestamp: '2021-09-20T14:18:01.060Z' },
        });
    });

    server.listen(port, () => {
        console.log(`Mockserver is listening on port: ${port}`);
    });
};

startServer();

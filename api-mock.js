const os = require('os');
const fs = require('fs');
const express = require('express');
const Busboy = require('busboy');
const _ = require('lodash');
const path = require('path');

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

const soknadMock = [
    {
        søknadstype: 'OMP_UTVIDET_RETT',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'Kari',
                aktørId: null,
                fødselsdato: null,
                fødselsnummer: '2323',
            },
            språk: null,
            søker: {
                fornavn: 'Robust',
                aktørId: '1157852636281',
                etternavn: 'STAFFELI',
                mellomnavn: '',
                fødselsnummer: '27118921009',
            },
            frilans: {
                startdato: '2018-02-01',
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2018-01-02T03:04:05',
            fraOgMed: '2018-01-01',
            tilOgMed: '2018-02-02',
            beredskap: {
                beredskap: true,
                tilleggsinformasjon: 'I Beredskap',
            },
            nattevåk: {
                harNattevåk: true,
                tilleggsinformasjon: 'Har Nattevåk',
            },
            søknadId: 'cc644d91-4eff-4679-a7d3-fc57a0c6a1c2',
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: true,
                harBoddIUtlandetSiste12Mnd: true,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            vedleggUrls: ['http://localhost:8080/1234', 'http://localhost:8080/12345'],
            harMedsøker: true,
            arbeidsgivere: {
                organisasjoner: [
                    {
                        navn: 'Nei',
                        skalJobbe: 'nei',
                        skalJobbeProsent: 0.0,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '1212',
                    },
                    {
                        navn: 'Navn',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '54321',
                    },
                ],
            },
            samtidigHjemme: null,
            tilsynsordning: {
                ja: {
                    fredag: 'PT1H30M',
                    mandag: 'PT5H',
                    onsdag: 'PT3H45M',
                    tirsdag: 'PT4H',
                    torsdag: 'PT2H',
                    tilleggsinformasjon: 'Litt tilleggsinformasjon.',
                },
                svar: 'ja',
                vetIkke: null,
            },
            relasjonTilBarnet: 'Mor',
            skalBekrefteOmsorg: true,
            ferieuttakIPerioden: {
                ferieuttak: [],
                skalTaUtFerieIPerioden: false,
            },
            selvstendigVirksomheter: [],
            beskrivelseOmsorgsrollen: 'En kort beskrivelse',
            harBekreftetOpplysninger: true,
            bekrefterPeriodeOver8Uker: true,
            utenlandsoppholdIPerioden: {
                opphold: [],
                skalOppholdeSegIUtlandetIPerioden: false,
            },
            skalPassePaBarnetIHelePerioden: true,
            harForståttRettigheterOgPlikter: true,
        },
        saksId: 'sak-5674839201',
        journalpostId: '68493021',
        opprettet: '2018-01-02T03:04:05',
        endret: '2020-06-23T09:11:21.948652',
        behandlingsdato: null,
    },
    {
        søknadstype: 'PP_SYKT_BARN',
        status: 'UNDER_BEHANDLING',
        søknad: {
            barn: {
                navn: 'Kari',
                aktørId: null,
                fødselsdato: null,
                fødselsnummer: '2323',
            },
            språk: null,
            søker: {
                fornavn: 'Robust',
                aktørId: '1157852636281',
                etternavn: 'STAFFELI',
                mellomnavn: '',
                fødselsnummer: '27118921009',
            },
            frilans: {
                startdato: '2018-02-01',
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2018-01-02T03:04:05',
            fraOgMed: '2018-01-01',
            tilOgMed: '2018-02-02',
            beredskap: {
                beredskap: true,
                tilleggsinformasjon: 'I Beredskap',
            },
            nattevåk: {
                harNattevåk: true,
                tilleggsinformasjon: 'Har Nattevåk',
            },
            søknadId: 'cc644d91-4eff-4679-a7d3-fc57a0c6a1c2',
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: true,
                harBoddIUtlandetSiste12Mnd: true,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            vedleggUrls: ['http://localhost:8080/1234', 'http://localhost:8080/12345'],
            harMedsøker: true,
            arbeidsgivere: {
                organisasjoner: [
                    {
                        navn: 'Nei',
                        skalJobbe: 'nei',
                        skalJobbeProsent: 0.0,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '1212',
                    },
                    {
                        navn: 'Navn',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '54321',
                    },
                ],
            },
            samtidigHjemme: null,
            tilsynsordning: {
                ja: {
                    fredag: 'PT1H30M',
                    mandag: 'PT5H',
                    onsdag: 'PT3H45M',
                    tirsdag: 'PT4H',
                    torsdag: 'PT2H',
                    tilleggsinformasjon: 'Litt tilleggsinformasjon.',
                },
                svar: 'ja',
                vetIkke: null,
            },
            relasjonTilBarnet: 'Mor',
            skalBekrefteOmsorg: true,
            ferieuttakIPerioden: {
                ferieuttak: [],
                skalTaUtFerieIPerioden: false,
            },
            selvstendigVirksomheter: [],
            beskrivelseOmsorgsrollen: 'En kort beskrivelse',
            harBekreftetOpplysninger: true,
            bekrefterPeriodeOver8Uker: true,
            utenlandsoppholdIPerioden: {
                opphold: [],
                skalOppholdeSegIUtlandetIPerioden: false,
            },
            skalPassePaBarnetIHelePerioden: true,
            harForståttRettigheterOgPlikter: true,
        },
        saksId: 'sak-5674839201',
        journalpostId: '68493021',
        opprettet: '2018-01-02T03:04:05',
        endret: '2020-06-23T09:11:21.948652',
        behandlingsdato: null,
    },
    {
        søknadstype: 'PP_SYKT_BARN',
        status: 'FERDIG_BEHANDLET',
        søknad: {
            barn: {
                navn: 'Kari',
                aktørId: null,
                fødselsdato: null,
                fødselsnummer: '2323',
            },
            språk: null,
            søker: {
                fornavn: 'Robust',
                aktørId: '1157852636281',
                etternavn: 'STAFFELI',
                mellomnavn: '',
                fødselsnummer: '27118921009',
            },
            frilans: {
                startdato: '2018-02-01',
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2018-01-02T03:04:05',
            fraOgMed: '2018-01-01',
            tilOgMed: '2018-02-02',
            beredskap: {
                beredskap: true,
                tilleggsinformasjon: 'I Beredskap',
            },
            nattevåk: {
                harNattevåk: true,
                tilleggsinformasjon: 'Har Nattevåk',
            },
            søknadId: 'cc644d91-4eff-4679-a7d3-fc57a0c6a1c2',
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: true,
                harBoddIUtlandetSiste12Mnd: true,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            vedleggUrls: ['http://localhost:8080/1234', 'http://localhost:8080/12345'],
            harMedsøker: true,
            arbeidsgivere: {
                organisasjoner: [
                    {
                        navn: 'Nei',
                        skalJobbe: 'nei',
                        skalJobbeProsent: 0.0,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '1212',
                    },
                    {
                        navn: 'Navn',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '54321',
                    },
                ],
            },
            samtidigHjemme: null,
            tilsynsordning: {
                ja: {
                    fredag: 'PT1H30M',
                    mandag: 'PT5H',
                    onsdag: 'PT3H45M',
                    tirsdag: 'PT4H',
                    torsdag: 'PT2H',
                    tilleggsinformasjon: 'Litt tilleggsinformasjon.',
                },
                svar: 'ja',
                vetIkke: null,
            },
            relasjonTilBarnet: 'Mor',
            skalBekrefteOmsorg: true,
            ferieuttakIPerioden: {
                ferieuttak: [],
                skalTaUtFerieIPerioden: false,
            },
            selvstendigVirksomheter: [],
            beskrivelseOmsorgsrollen: 'En kort beskrivelse',
            harBekreftetOpplysninger: true,
            bekrefterPeriodeOver8Uker: true,
            utenlandsoppholdIPerioden: {
                opphold: [],
                skalOppholdeSegIUtlandetIPerioden: false,
            },
            skalPassePaBarnetIHelePerioden: true,
            harForståttRettigheterOgPlikter: true,
        },
        saksId: 'sak-5674839201',
        journalpostId: '68493021',
        opprettet: '2018-01-02T03:04:05',
        endret: '2020-06-23T09:11:21.948652',
        behandlingsdato: null,
    },
];

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

    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startServer();

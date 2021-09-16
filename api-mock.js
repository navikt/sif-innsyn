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

const soknadMockTom = [];

const soknadMock = [
    {
        søknadId: '0f44f965-e3fb-489c-a757-b0ad46619e33-4',
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
            søknadId: 'cc644d91-4eff-4679-a7d3-fc57a0c6a1c2-5',
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
                        organisasjonsnummer: '73645736727',
                    },
                    {
                        navn: 'Navn',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '846785862386',
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
        saksId: null,
        journalpostId: '68493021',
        opprettet: '2021-03-17T03:04:05',
        endret: '2020-06-23T09:11:21.948652',
        behandlingsdato: null,
    },
    {
        søknadstype: 'OMP_UTBETALING_ARBEIDSTAKER',
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
            mottatt: '2018-11-02T03:04:05',
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
            søknadId: 'cc644d91-4eff-4679-a7d3-fc57a0c6a1c2-a',
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
                        organisasjonsnummer: '73645736727',
                    },
                    {
                        navn: 'Navn',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '846785862386',
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
        søknadId: '9c3a3ebf-e02a-4843-ad2c-9187e2f00cfa-x',
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
            søknadId: 'cc644d91-4eff-4679-a7d3-fc57a0c6a1c2-y',
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
                        organisasjonsnummer: '73645736727',
                    },
                    {
                        navn: 'Navn med mellomrom',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '846785862386',
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
        opprettet: '2021-03-16T03:04:05',
        endret: '2020-06-23T09:11:21.948652',
        behandlingsdato: null,
    },
    {
        søknadId: '9c3a3ebf-e02a-4843-ad2c-9187e2f00cfa-b',
        søknadstype: 'PP_SYKT_BARN',
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
            søknadId: 'cc644d91-4eff-4679-a7d3-fc57a0c6a1c2-3',
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
                        organisasjonsnummer: '73645736727',
                    },
                    {
                        navn: 'Navn med mellomrom',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '846785862386',
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
        opprettet: '2018-06-02T03:04:05',
        endret: '2020-06-23T09:11:21.948652',
        behandlingsdato: null,
    },
    {
        søknadstype: 'PP_ETTERSENDING',
        status: 'MOTTATT',
        søknad: {
            beskrivelse: 'Lorem ipsum doret salah et spurs',
        },
        saksId: 'sak-5674839201',
        søknadId: 'asf',
        journalpostId: '68493021',
        opprettet: '2018-01-01T03:04:05',
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

    server.get('/soknad/:soknadId/dokument', (req, res) => {
        if (isLoggedIn(req)) {
            res.download('eksempel-søknad.pdf', 'søknad.pdf');
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
        res.send(
            '{"formData":{"periodeFra":"2021-09-01","periodeTil":"2021-09-01","barnetsNavn":"","barnetsFødselsnummer":"","barnetSøknadenGjelder":"2284226387980","harForståttRettigheterOgPlikter":true,"harBekreftetOpplysninger":false,"søknadenGjelderEtAnnetBarn":false,"legeerklæring":[],"arbeidsforhold":[],"harBoddUtenforNorgeSiste12Mnd":"unanswered","utenlandsoppholdSiste12Mnd":[],"skalBoUtenforNorgeNeste12Mnd":"unanswered","utenlandsoppholdNeste12Mnd":[],"skalOppholdeSegIUtlandetIPerioden":"no","utenlandsoppholdIPerioden":[],"skalTaUtFerieIPerioden":"no","ferieuttakIPerioden":[],"harMedsøker":"no","samtidigHjemme":"unanswered","harNattevåk":"unanswered","harBeredskap":"unanswered","harHattInntektSomFrilanser":"unanswered","selvstendig_harHattInntektSomSN":"unanswered","andreYtelser":[]},"metadata":{"lastStepID":"tidsrom","version":"6.1","updatedTimestemp":"2021-09-16T23:18:01.060Z"}}'
        );
        // res.send('{}');
    });

    server.listen(port, () => {
        console.log(`Mockserver is listening on port: ${port}`);
    });
};

startServer();

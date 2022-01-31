const express = require('express');
const path = require('path');

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

const soknadMock = [
    {
        søknadId: '66d81400-30fb-44e0-ab52-cb323942b9ce',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: { navn: 'BLÅØYD KAMELEON', fødselsnummer: '31070968161' },
            språk: 'nb',
            søker: {
                fornavn: 'KRIMINELL',
                aktørId: '2391969373424',
                etternavn: 'MULDVARP',
                fødselsnummer: '17097721564',
            },
            frilans: {
                startdato: '2022-01-03',
                arbeidsforhold: {
                    planlagtArbeid: { enkeltdager: [{ tid: 'PT2H', dato: '2022-01-28' }], jobberIPerioden: 'JA' },
                    historiskArbeid: {
                        fasteDager: {
                            fredag: 'PT0S',
                            mandag: 'PT0S',
                            onsdag: 'PT0S',
                            tirsdag: 'PT0S',
                            torsdag: 'PT0S',
                        },
                        erLiktHverUke: true,
                        jobberProsent: 0,
                        jobberIPerioden: 'JA',
                    },
                    jobberNormaltTimer: 20,
                },
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-01-26T09:23:02.510347Z',
            fraOgMed: '2021-12-06',
            tilOgMed: '2022-01-29',
            beredskap: { beredskap: false },
            nattevåk: { harNattevåk: false },
            søknadId: '66d81400-30fb-44e0-ab52-cb323942b9ce',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIyOWZmMTJlMS1mYWJkLTRiOGYtYTg0OC1iMTA0MDliYzQ5MjgifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI1NDlmMTRhYi1mNTAyLTRkNDgtODI4NS1hYzRhZTAwNTE1NzMifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [
                {
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    erAnsatt: true,
                    arbeidsforhold: {
                        planlagtArbeid: { enkeltdager: [{ tid: 'PT5H', dato: '2022-01-26' }], jobberIPerioden: 'JA' },
                        historiskArbeid: {
                            fasteDager: {
                                fredag: 'PT4H',
                                mandag: 'PT4H',
                                onsdag: 'PT4H',
                                tirsdag: 'PT4H',
                                torsdag: 'PT4H',
                            },
                            erLiktHverUke: true,
                            jobberProsent: 100,
                            jobberIPerioden: 'JA',
                        },
                        jobberNormaltTimer: 20,
                    },
                    organisasjonsnummer: '947064649',
                },
            ],
            omsorgstilbud: {
                historisk: {
                    ukedager: { fredag: 'PT1H', mandag: 'PT1H', onsdag: 'PT1H', tirsdag: 'PT1H', torsdag: 'PT1H' },
                },
            },
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '17097721564' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '31070968161' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2021-12-06/2022-01-29': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2021-12-06/2021-12-06': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-07/2021-12-07': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-08/2021-12-08': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-09/2021-12-09': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-10/2021-12-10': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-13/2021-12-13': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-14/2021-12-14': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-15/2021-12-15': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-16/2021-12-16': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-17/2021-12-17': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-20/2021-12-20': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-21/2021-12-21': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-22/2021-12-22': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-23/2021-12-23': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-24/2021-12-24': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-27/2021-12-27': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-28/2021-12-28': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-29/2021-12-29': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-30/2021-12-30': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2021-12-31/2021-12-31': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-03/2022-01-03': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-04/2022-01-04': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-05/2022-01-05': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-06/2022-01-06': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-07/2022-01-07': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-10/2022-01-10': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-11/2022-01-11': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-12/2022-01-12': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-13/2022-01-13': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-14/2022-01-14': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-17/2022-01-17': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-18/2022-01-18': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-19/2022-01-19': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-20/2022-01-20': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-21/2022-01-21': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-24/2022-01-24': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-25/2022-01-25': {
                                            faktiskArbeidTimerPerDag: 'PT4H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-26/2022-01-26': {
                                            faktiskArbeidTimerPerDag: 'PT5H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-27/2022-01-27': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-01-28/2022-01-28': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2021-12-06/2021-12-06': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-07/2021-12-07': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-08/2021-12-08': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-09/2021-12-09': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-10/2021-12-10': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-13/2021-12-13': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-14/2021-12-14': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-15/2021-12-15': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-16/2021-12-16': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-17/2021-12-17': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-20/2021-12-20': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-21/2021-12-21': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-22/2021-12-22': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-23/2021-12-23': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-24/2021-12-24': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-27/2021-12-27': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-28/2021-12-28': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-29/2021-12-29': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-30/2021-12-30': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2021-12-31/2021-12-31': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-03/2022-01-03': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-04/2022-01-04': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-05/2022-01-05': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-06/2022-01-06': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-07/2022-01-07': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-10/2022-01-10': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-11/2022-01-11': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-12/2022-01-12': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-13/2022-01-13': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-14/2022-01-14': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-17/2022-01-17': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-18/2022-01-18': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-19/2022-01-19': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-20/2022-01-20': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-21/2022-01-21': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-24/2022-01-24': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-25/2022-01-25': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-26/2022-01-26': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-27/2022-01-27': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                                '2022-01-28/2022-01-28': {
                                    faktiskArbeidTimerPerDag: 'PT2H',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: {
                            '2021-12-06/2021-12-06': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-07/2021-12-07': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-08/2021-12-08': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-09/2021-12-09': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-10/2021-12-10': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-13/2021-12-13': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-14/2021-12-14': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-15/2021-12-15': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-16/2021-12-16': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-17/2021-12-17': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-20/2021-12-20': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-21/2021-12-21': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-22/2021-12-22': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-23/2021-12-23': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-24/2021-12-24': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-27/2021-12-27': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-28/2021-12-28': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-29/2021-12-29': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-30/2021-12-30': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2021-12-31/2021-12-31': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-03/2022-01-03': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-04/2022-01-04': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-05/2022-01-05': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-06/2022-01-06': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-07/2022-01-07': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-10/2022-01-10': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-11/2022-01-11': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-12/2022-01-12': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-13/2022-01-13': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-14/2022-01-14': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-17/2022-01-17': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-18/2022-01-18': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-19/2022-01-19': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-20/2022-01-20': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-21/2022-01-21': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-24/2022-01-24': { etablertTilsynTimerPerDag: 'PT1H' },
                            '2022-01-25/2022-01-25': { etablertTilsynTimerPerDag: 'PT1H' },
                        },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2021-12-06/2022-01-29'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2022-01-03' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '66d81400-30fb-44e0-ab52-cb323942b9ce',
                mottattDato: '2022-01-26T09:23:02.510Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DMR9RQ',
        journalpostId: '524274824',
        dokumenter: [
            {
                journalpostId: '524274824',
                dokumentInfoId: '548467355',
                sakId: '1DMR9RQ',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'https://sif-innsyn-api.dev.nav.no/dokument/524274824/548467355/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-01-26T10:23:05', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-01-26T10:23:05', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-01-26T10:23:09', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-01-26T01:00', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-01-26T09:23:02.510Z',
        endret: '2022-01-26T10:23:15',
        behandlingsdato: null,
    },
    {
        søknadId: 'e52c31b0-bf61-45c5-b1b2-1a25a5f79c9e',
        søknadstype: 'PP_ETTERSENDELSE',
        status: 'MOTTATT',
        søknad: {
            sprak: 'nb',
            søker: {
                fornavn: 'KRIMINELL',
                aktørId: '2391969373424',
                etternavn: 'MULDVARP',
                fødselsdato: '1977-09-17',
                fødselsnummer: '17097721564',
            },
            titler: ['Skjermbilde 2022-01-06 kl. 10.33.34.png'],
            mottatt: '2022-01-27T14:38:58.790397Z',
            k9Format: {
                søker: { norskIdentitetsnummer: '17097721564' },
                ytelse: 'PLEIEPENGER_SYKT_BARN',
                versjon: '0.0.1',
                søknadId: 'e52c31b0-bf61-45c5-b1b2-1a25a5f79c9e',
                mottattDato: '2022-01-27T14:38:58.790Z',
            },
            soknadId: 'e52c31b0-bf61-45c5-b1b2-1a25a5f79c9e',
            vedleggId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIzNTIwODU4Yy0wOTkxLTQxNzEtODQ2ZC0xYjQ0ZjAwNGQ5NTkifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIwMTJmMzUzMC0xMDMwLTRkZTgtYWM1Mi1kOGQyZGQ1MmEyMmYifQ',
                ],
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIyNzEzZDUwNy1kNDNmLTQxNzEtOTRhOC1iZDI3N2EyMWE2MDkifQ',
                ],
            ],
            beskrivelse: 'sd sdfsdf sd f',
            søknadstype: 'PLEIEPENGER_SYKT_BARN',
            harBekreftetOpplysninger: true,
            harForstattRettigheterOgPlikter: true,
        },
        saksId: null,
        journalpostId: '524276564',
        dokumenter: [
            {
                journalpostId: '524276564',
                dokumentInfoId: '548469149',
                sakId: null,
                tittel: 'Ettersendelse pleiepenger sykt barn',
                filtype: 'PDF',
                harTilgang: true,
                url: 'https://sif-innsyn-api.dev.nav.no/dokument/524276564/548469149/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-01-27T15:39:01', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-01-27T15:39:01', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-01-27T01:00', datotype: 'DATO_REGISTRERT' },
                ],
            },
            {
                journalpostId: '524276564',
                dokumentInfoId: '548469150',
                sakId: null,
                tittel: 'Skjermbilde 2022-01-06 kl. 10.33.34.png',
                filtype: 'PDF',
                harTilgang: true,
                url: 'https://sif-innsyn-api.dev.nav.no/dokument/524276564/548469150/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-01-27T15:39:01', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-01-27T15:39:01', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-01-27T01:00', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-01-27T14:38:58.790Z',
        endret: '2022-01-27T15:39:01',
        behandlingsdato: null,
    },
    {
        søknadId: '9054ab9e-2b82-4998-9f10-9a82827f06e9',
        søknadstype: 'PP_SYKT_BARN_ENDRINGSMELDING',
        status: 'MOTTATT',
        søknad: {
            søker: {
                fornavn: 'KRIMINELL',
                aktørId: '2391969373424',
                etternavn: 'MULDVARP',
                fødselsnummer: '17097721564',
            },
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJiM2VlZDljMy0zNDhjLTQ2NGEtYWRkNS1lYmQ3ZGFlMzU5ZGYifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJmZjMwZGRhZi1lN2M3LTRlY2UtOWZhNC03ODZmZGVhZDg2MDEifQ',
                ],
            ],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '17097721564' },
                ytelse: {
                    barn: { fødselsdato: '2009-07-31', norskIdentitetsnummer: '31070968161' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: {} },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2021-12-07/2021-12-07': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                    },
                    tilsynsordning: { perioder: {} },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: [],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: {},
                },
                versjon: '1.0.0',
                søknadId: '9054ab9e-2b82-4998-9f10-9a82827f06e9',
                mottattDato: '2022-01-31T13:40:00.621Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
        },
        saksId: '1DMR9RQ',
        journalpostId: '524277209',
        dokumenter: [
            {
                journalpostId: '524277209',
                dokumentInfoId: '548469861',
                sakId: '1DMR9RQ',
                tittel: 'Endringsmelding om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'https://sif-innsyn-api.dev.nav.no/dokument/524277209/548469861/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-01-31T14:40:02', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-01-31T14:40:02', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-01-31T14:40:06', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-01-31T01:00', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-01-31T13:40:00.621Z',
        endret: '2022-01-31T14:40:11',
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

export const søkerMock1 = {
    aktørId: '1234567890',
    fødselsnummer: '12345123456',
    fornavn: 'Test',
    mellomnavn: null,
    etternavn: 'Testesen',
};

export const barnMock = {
    barn: [
        { aktørId: '1', fødselsnummer: '12345123456', fornavn: 'Barn', mellomnavn: 'Barne', etternavn: 'Barnesen' },
        { aktørId: '2', fødselsnummer: '12345123456', fornavn: 'Mock', etternavn: 'Mocknes' },
    ],
};

export const arbeidsgivereMock = {
    organisasjoner: [
        { navn: 'Arbeids- og velferdsetaten', organisasjonsnummer: '123451234' },
        { navn: 'Arbeids- og sosialdepartementet', organisasjonsnummer: '123451235' },
    ],
};

export const soknadMock = [
    {
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
            mottatt: '2018-01-02T03:04:05.000000006Z',
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
                        organisasjonsnummer: '167890366646',
                    },
                    {
                        navn: 'Navn',
                        skalJobbe: 'redusert',
                        skalJobbeProsent: 22.512,
                        vetIkkeEkstrainfo: null,
                        jobberNormaltTimer: 0.0,
                        organisasjonsnummer: '1543215647784',
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
        opprettet: null,
        endret: '2020-06-23T09:11:21.948652',
        behandlingsdato: null,
    },
];

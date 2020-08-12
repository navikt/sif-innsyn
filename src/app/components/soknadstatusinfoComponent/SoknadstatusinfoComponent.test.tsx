import React from 'react';
import { shallow } from 'enzyme';
import { Søknad, Søknadsstatus, Søknadstype } from '../../types/apiTypes/søknadTypes';
import SoknadstatusinfoComponent from './SoknadstatusinfoComponent';

describe('<SoknadstatusinfoComponent />', () => {
    let component;
    const søknad: Søknad = {
        saksId: 'sakid-123',
        journalpostId: 'journal-123',
        status: Søknadsstatus.MOTTATT,
        søknadstype: Søknadstype.PP_SYKT_BARN,
        opprettet: '2020-08-12',
        endret: null,
        behandlingsdato: null,
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
    };

    beforeEach(() => {
        component = shallow(<SoknadstatusinfoComponent søknad={søknad} />);
    });

    test('It should mount', () => {
        expect(component.length).toBe(1);
    });
});

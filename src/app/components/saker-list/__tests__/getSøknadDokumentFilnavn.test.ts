import { getSøknadDokumentFilnavn } from '../SakerListElement';

const mockedApiUrl = 'mockedApiUrl';
jest.mock('../../../utils/envUtils.ts', () => {
    return { getEnvironmentVariable: () => mockedApiUrl };
});

describe('getSøknadDokumentFilnavn', () => {
    it('returnerer riktig format på dokument filnavn', () => {
        const result = getSøknadDokumentFilnavn({
            tittel: 'Søknad om pleiepenger',
            dokumentInfoId: 'abc',
            filtype: 'PDF',
            url: 'none',
        });
        expect(result).toEqual('s%C3%B8knad%20om%20pleiepenger%20(01%2E01%2E2021).pdf');
    });
});

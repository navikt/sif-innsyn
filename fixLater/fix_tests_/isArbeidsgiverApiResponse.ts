import { isArbeidsgiverApiResponse } from '../../src/app/types/apiTypes/arbeidsgiverTypes';
import { arbeidsgivereMock } from '../../src/mockdata/apiMockData';

describe('isArbeidsgiverApiResponse', () => {
    it('is arbeidsgiverApiResponse', () => {
        (window as any).appSettings = { API_URL: 'en.url' };
        expect(isArbeidsgiverApiResponse(arbeidsgivereMock)).toBe(true)
    })
})

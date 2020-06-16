import { isArbeidsgiverApiResponse } from '../arbeidsgiverTypes';
import { arbeidsgivereMock } from '../../../../mockdata/apiMockData';

describe('isArbeidsgiverApiResponse', () => {
    it('is arbeidsgiverApiResponse', () => {
        expect(isArbeidsgiverApiResponse(arbeidsgivereMock)).toBe(true)
    })
})

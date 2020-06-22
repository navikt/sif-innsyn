import { isBarnApiResponse } from '../../src/app/types/apiTypes/barnTypes';
import { barnMock } from '../../src/mockdata/apiMockData';

describe('isBarnApiResponse', () => {
    it('isBarnApiResponse', () => {
        (window as any).appSettings = { API_URL: 'en.url' };
        expect(isBarnApiResponse(barnMock)).toBe(true);
    });
});

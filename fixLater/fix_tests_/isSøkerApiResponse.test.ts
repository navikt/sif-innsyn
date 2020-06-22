import { isSøkerApiResponse } from '../../src/app/types/apiTypes/søkerTypes';
import { søkerMock1 } from '../../src/mockdata/apiMockData';

describe('isSøkerApiResponse typeguard test', () => {
    it('is søkerApiResponse', () => {
        (window as any).appSettings = { API_URL: 'en.url' };
        expect(isSøkerApiResponse(søkerMock1)).toBe(true);
    });
    it('is not søkerApiResponse', () => {
        (window as any).appSettings = { API_URL: 'en.url' }
        expect(isSøkerApiResponse({ ...søkerMock1, aktørId: null })).toBe(false);
    });
});

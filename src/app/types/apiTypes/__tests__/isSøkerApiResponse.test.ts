import { isSøkerApiResponse } from '../søkerTypes';
import { søkerMock1 } from '../../../../mockdata/apiMockData';

describe('isSøkerApiResponse typeguard test', () => {
    it('is søkerApiResponse', () => {
        expect(isSøkerApiResponse(søkerMock1)).toBe(true);
    });
    it('is not søkerApiResponse', () => {
        expect(isSøkerApiResponse({ ...søkerMock1, aktørId: null })).toBe(false);
    });
});

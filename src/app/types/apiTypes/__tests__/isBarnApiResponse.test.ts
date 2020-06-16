import { isBarnApiResponse } from '../barnTypes';
import { barnMock } from '../../../../mockdata/apiMockData';

describe('isBarnApiResponse', () => {
    it('isBarnApiResponse', () => {
        expect(isBarnApiResponse(barnMock)).toBe(true);
    });
});

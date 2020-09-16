import { isISODateString } from '../ReducerKalkulator/typeguards';

describe('Test of isISODateString typeguard', () => {
    it('test1 - is of type ISODate string', () => {
        expect(isISODateString('2020-07-20')).toBe(true);
    });
    it('test1 - is NOT of type ISODate string', () => {
        expect(isISODateString('20200720')).toBe(false);
    });
    it('test2 - is NOT of type ISODate string', () => {
        expect(isISODateString('2020.07.20')).toBe(false);
    });
    it('test3 - is NOT of type ISODate string', () => {
        expect(isISODateString({})).toBe(false);
    });
    it('test4 - is NOT of type ISODate string', () => {
        expect(isISODateString(undefined)).toBe(false);
    });
    it('test5 - is NOT of type ISODate string', () => {
        expect(isISODateString(null)).toBe(false);
    });
    it('test6 - is NOT of type ISODate string', () => {
        expect(isISODateString('2020-07-20-20')).toBe(false);
    });
    it('test6 - is NOT of type ISODate string', () => {
        expect(isISODateString('Invalid date')).toBe(false);
    });
});

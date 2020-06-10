import { StringOrNull } from '../types/types';
import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';

export const isStringOrNull = (value: any): value is StringOrNull => {
    return isString(value) || value === null;
};

export function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}

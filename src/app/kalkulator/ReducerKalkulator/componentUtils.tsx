import { Value } from './types';
import * as React from 'react';
import { ISODateString } from 'nav-datovelger';
import { isSome, Option } from 'fp-ts/lib/Option';

export function valueToFeilProps<T>(value: Value<T>, showErrors: boolean): React.ReactNode | boolean {
    if (!showErrors) {
        return false;
    }
    // TODO: Fix!
    return value.errors.length > 0 ? <span>{value.errors[0]}</span> : undefined;
}

export const evaluateDatoErGyldigProp = (datoValue: Value<Option<ISODateString>>, showErrors: boolean): boolean => {
    if (!showErrors) {
        return true;
    }
    return isSome(datoValue.value);
};

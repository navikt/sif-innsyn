import { Value } from './types';
import * as React from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold, isRight } from 'fp-ts/lib/Either';
import { ISODateString } from 'nav-datovelger';

export function valueToFeilProps<T>(value: Value<T>, showErrors: boolean): React.ReactNode | boolean {
    if (!showErrors) {
        return false;
    }
    return pipe(
        value.value,
        fold(
            (error) => {
                return <span>{error.feilmelding}</span>;
            },
            () => {
                return undefined;
            }
        )
    );
}

export const evaluateDatoErGyldigProp = (datoValue: Value<ISODateString>, showErrors: boolean): boolean => {
    if (!showErrors) {
        return true;
    }
    return isRight(datoValue.value);
};

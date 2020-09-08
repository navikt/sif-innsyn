import { BarnInfo, Value } from './types';
import { barnetErOverTolvOgIkkeKroniskSykt, optionalFodselsdatoErOverAtten } from './utils';
import { none, Option, some } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import { errorNotAnswered } from './validationUtils';

// const updateKroniskSyk = (
//     updatedFodselsdato: Option<string>,
//     kroniskSyk: Value<Option<boolean>>
// ): Value<Option<boolean>> => {
//     if (optionalFodselsdatoErOverAtten(updatedFodselsdato)) {
//         return { ...kroniskSyk, value: none, errors: [] };
//     }
// };
//
// const updateBorSammenMed = (
//     borSammenMed: Value<Option<boolean>>,
//     fodselsdato: EitherErrorOr<string>,
//     kroniskSyk: EitherErrorOr<Option<boolean>>
// ) => {
//     if (optionalFodselsdatoErOverAtten(fodselsdato)) {
//         return right(none);
//     }
//     if (barnetErOverTolvOgIkkeKroniskSykt(fodselsdato, kroniskSyk)) {
//         return right(none);
//     }
//     if (isSomeValue(kroniskSyk) && isEmptyValue(borSammenMed.value)) {
//         return left(createFeiloppsummeringFeilNotAnswered(borSammenMed.id));
//     }
//     return borSammenMed.value;
// };
//
// const updateAleneOmOmsorgen = (
//     aleneOmOmsorgen: Value<Option<boolean>>,
//     fodselsdato: EitherErrorOr<string>,
//     kroniskSykt: EitherErrorOr<Option<boolean>>,
//     borSammenMed: EitherErrorOr<Option<boolean>>
// ) => {
//     if (optionalFodselsdatoErOverAtten(fodselsdato)) {
//         return right(none);
//     }
//     if (barnetErOverTolvOgIkkeKroniskSykt(fodselsdato, kroniskSykt)) {
//         return right(none);
//     }
//     if (isSomeValue(borSammenMed) && isEmptyValue(aleneOmOmsorgen.value)) {
//         return left(createFeiloppsummeringFeilNotAnswered(aleneOmOmsorgen.id));
//     }
//     return aleneOmOmsorgen.value;
// };

export const setFodselsdatoOgOppdaterDataForBarnet = (newFodselsdato: ISODateString, barn: BarnInfo): BarnInfo => {
    const { fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen } = barn;

    const updatedFodselsdato: Value<Option<ISODateString>> = {
        ...fodselsdato,
        value: some(newFodselsdato),
        errors: [],
    };

    return {
        ...barn,
        fodselsdato: updatedFodselsdato,
        kroniskSykt: optionalFodselsdatoErOverAtten(updatedFodselsdato.value)
            ? { ...kroniskSykt, value: none, errors: [] }
            : kroniskSykt,
        borSammen:
            optionalFodselsdatoErOverAtten(updatedFodselsdato.value) ||
            barnetErOverTolvOgIkkeKroniskSykt(updatedFodselsdato.value, kroniskSykt.value)
                ? { ...borSammen, value: none, errors: [] }
                : borSammen,
        aleneOmOmsorgen:
            optionalFodselsdatoErOverAtten(updatedFodselsdato.value) ||
            barnetErOverTolvOgIkkeKroniskSykt(updatedFodselsdato.value, kroniskSykt.value)
                ? { ...aleneOmOmsorgen, value: none, errors: [] }
                : aleneOmOmsorgen,
    };
};

export const fjernFodselsdatoOgOppdaterDataForBarnet = (barn: BarnInfo): BarnInfo => {
    return {
        ...barn,
        fodselsdato: {
            ...barn.fodselsdato,
            value: none,
            errors: [errorNotAnswered],
        },
    };
};

export const setKroniskSyktOgOppdaterDataForBarnet = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen } = barn;
    return {
        ...barn,
        kroniskSykt: { ...kroniskSykt, value: some(value), errors: [] },
        borSammen:
            optionalFodselsdatoErOverAtten(fodselsdato.value) ||
            barnetErOverTolvOgIkkeKroniskSykt(fodselsdato.value, kroniskSykt.value)
                ? { ...borSammen, value: none, errors: [] }
                : borSammen,
        aleneOmOmsorgen:
            optionalFodselsdatoErOverAtten(fodselsdato.value) ||
            barnetErOverTolvOgIkkeKroniskSykt(fodselsdato.value, kroniskSykt.value)
                ? { ...aleneOmOmsorgen, value: none, errors: [] }
                : aleneOmOmsorgen,
    };
};

export const setBorSammenOgOppdaterDataForBarnet = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { borSammen, aleneOmOmsorgen } = barn;
    return {
        ...barn,
        borSammen: { ...borSammen, value: some(value), errors: [] },
        aleneOmOmsorgen: !value ? { ...aleneOmOmsorgen, value: none, errors: [] } : aleneOmOmsorgen,
    };
};

export const setAleneOmOmsorgenOgOppdaterDataForBarnet = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { aleneOmOmsorgen } = barn;
    return {
        ...barn,
        aleneOmOmsorgen: { ...aleneOmOmsorgen, value: some(value), errors: [] },
    };
};

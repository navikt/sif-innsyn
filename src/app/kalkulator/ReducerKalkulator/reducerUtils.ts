import { BarnInfo, Value } from './types';
import { barnetErOverTolvOgIkkeKroniskSykt, optionalFodselsdatoErOverAtten } from './utils';
import { isNone, isSome, none, Option, some } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import { errorNotAnswered } from './validationUtils';

export function isNoneAndNoErrors<T>(value: Value<Option<T>>): boolean {
    return isNone(value.value) && value.errors.length === 0;
}

const updateKroniskSykt = (
    updatedFodselsdato: Option<string>,
    kroniskSykt: Value<Option<boolean>>
): Value<Option<boolean>> => {
    if (optionalFodselsdatoErOverAtten(updatedFodselsdato)) {
        return { ...kroniskSykt, value: none, errors: [] };
    }
    if (isNoneAndNoErrors(kroniskSykt)) {
        return { ...kroniskSykt, value: none, errors: [errorNotAnswered] };
    }
    return kroniskSykt;
};

const updateBorSammenMed = (
    borSammenMed: Value<Option<boolean>>,
    fodselsdato: Option<ISODateString>,
    kroniskSyk: Option<boolean>
): Value<Option<boolean>> => {
    if (optionalFodselsdatoErOverAtten(fodselsdato) || barnetErOverTolvOgIkkeKroniskSykt(fodselsdato, kroniskSyk)) {
        return { ...borSammenMed, value: none, errors: [] };
    }
    if (isNoneAndNoErrors(borSammenMed)) {
        return { ...borSammenMed, value: none, errors: [errorNotAnswered] };
    }
    return borSammenMed;
};

const updateAleneOmOmsorgen = (
    aleneOmOmsorgen: Value<Option<boolean>>,
    borSammenMed: Option<boolean>
): Value<Option<boolean>> => {
    if (isSome(borSammenMed) && !borSammenMed.value) {
        return { ...aleneOmOmsorgen, value: none, errors: [] };
    }
    if (isNoneAndNoErrors(aleneOmOmsorgen)) {
        return { ...aleneOmOmsorgen, value: none, errors: [errorNotAnswered] };
    }
    return aleneOmOmsorgen;
};

export const setFodselsdatoOgOppdaterDataForBarnet = (newFodselsdato: ISODateString, barn: BarnInfo): BarnInfo => {
    const { fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen } = barn;

    const updatedFodselsdato: Value<Option<ISODateString>> = {
        ...fodselsdato,
        value: some(newFodselsdato),
        errors: [],
    };

    const updatedKroniskSykt: Value<Option<boolean>> = updateKroniskSykt(updatedFodselsdato.value, kroniskSykt);

    return {
        ...barn,
        fodselsdato: updatedFodselsdato,
        kroniskSykt: updatedKroniskSykt,
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
        borSammen: updateBorSammenMed(borSammen, fodselsdato.value, kroniskSykt.value),
        aleneOmOmsorgen:
            optionalFodselsdatoErOverAtten(fodselsdato.value) ||
            barnetErOverTolvOgIkkeKroniskSykt(fodselsdato.value, kroniskSykt.value)
                ? { ...aleneOmOmsorgen, value: none, errors: [] }
                : aleneOmOmsorgen,
    };
};

export const setBorSammenOgOppdaterDataForBarnet = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { borSammen, aleneOmOmsorgen } = barn;

    const updatedAleneOmOmsorgen = updateAleneOmOmsorgen(aleneOmOmsorgen, borSammen.value);

    return {
        ...barn,
        borSammen: { ...borSammen, value: some(value), errors: [] },
        aleneOmOmsorgen: updatedAleneOmOmsorgen,
    };
};

export const setAleneOmOmsorgenOgOppdaterDataForBarnet = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { aleneOmOmsorgen } = barn;
    return {
        ...barn,
        aleneOmOmsorgen: { ...aleneOmOmsorgen, value: some(value), errors: [] },
    };
};

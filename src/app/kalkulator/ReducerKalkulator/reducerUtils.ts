import { BarnInfo, Value } from './types';
import { barnetErOverAtten, barnetErOverTolvOgIkkeKroniskSykt } from './utils';
import { isNone, isSome, none, Option, some } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import { errorNotAnswered } from './validationUtils';

export function isNoneAndNoErrors<T>(value: Value<Option<T>>): boolean {
    return isNone(value.value) && value.errors.length === 0;
}

const updateKroniskSykt = (barnInfo: BarnInfo, kroniskSykt: Value<Option<boolean>>): Value<Option<boolean>> => {
    if (barnetErOverAtten(barnInfo)) {
        return { ...kroniskSykt, value: none, errors: [] };
    }
    if (isNoneAndNoErrors(kroniskSykt)) {
        return { ...kroniskSykt, value: none, errors: [errorNotAnswered] };
    }
    return kroniskSykt;
};

const updateBorSammenMed = (borSammenMed: Value<Option<boolean>>, barnInfo: BarnInfo): Value<Option<boolean>> => {
    if (barnetErOverAtten(barnInfo) || barnetErOverTolvOgIkkeKroniskSykt(barnInfo)) {
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

export const setFodselsdatoOgOppdaterDataForBarnet = (newFodselsdato: ISODateString, barnInfo: BarnInfo): BarnInfo => {
    const { fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen } = barnInfo;

    const updatedFodselsdato: Value<Option<ISODateString>> = {
        ...fodselsdato,
        value: some(newFodselsdato),
        errors: [],
    };

    const updatedKroniskSykt: Value<Option<boolean>> = updateKroniskSykt(barnInfo, kroniskSykt);

    return {
        ...barnInfo,
        fodselsdato: updatedFodselsdato,
        kroniskSykt: updatedKroniskSykt,
        borSammen:
            barnetErOverAtten(barnInfo) || barnetErOverTolvOgIkkeKroniskSykt(barnInfo)
                ? { ...borSammen, value: none, errors: [] }
                : borSammen,
        aleneOmOmsorgen:
            barnetErOverAtten(barnInfo) || barnetErOverTolvOgIkkeKroniskSykt(barnInfo)
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

export const setKroniskSyktOgOppdaterDataForBarnet = (value: boolean, barnInfo: BarnInfo): BarnInfo => {
    const { kroniskSykt, borSammen, aleneOmOmsorgen } = barnInfo;
    return {
        ...barnInfo,
        kroniskSykt: { ...kroniskSykt, value: some(value), errors: [] },
        borSammen: updateBorSammenMed(borSammen, barnInfo),
        aleneOmOmsorgen:
            barnetErOverAtten(barnInfo) || barnetErOverTolvOgIkkeKroniskSykt(barnInfo)
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

import { BarnInfo } from './types';
import { none, some } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import {
    shouldViewAleneOmOmsorgenQuestion,
    shouldViewBorSammenQuestion,
    shouldViewKroniskSyktQuestion,
} from './viewUtils';

export const setFodselsdatoAndMaybeWipeValues = (newFodselsdato: ISODateString, barnInfo: BarnInfo): BarnInfo => {
    const { fodselsdato } = barnInfo;
    const fodselsdatoUpdated = {
        ...barnInfo,
        fodselsdato: {
            ...fodselsdato,
            value: some(newFodselsdato),
        },
    };
    return evaluateDependantValue(fodselsdatoUpdated, ValueCheckAction.CHECK_KRONISKT_SYK);
};

export const fjernFodselsdatoAndWipeValues = (barnInfo: BarnInfo): BarnInfo => {
    const { fodselsdato } = barnInfo;
    const fodselsdatoUpdated = {
        ...barnInfo,
        fodselsdato: {
            ...fodselsdato,
            value: none,
        },
    };
    return evaluateDependantValue(fodselsdatoUpdated, ValueCheckAction.CHECK_KRONISKT_SYK);
};

export const setKroniskSyktAndMaybeWipeValues = (value: boolean, barnInfo: BarnInfo): BarnInfo => {
    const { kroniskSykt } = barnInfo;
    const updatedKroniskSykt = { ...barnInfo, kroniskSykt: { ...kroniskSykt, value: some(value) } };
    return evaluateDependantValue(updatedKroniskSykt, ValueCheckAction.CHECK_BOR_SAMMEN);
};

export const setBorSammenAndMaybeWipeValues = (value: boolean, barnInfo: BarnInfo): BarnInfo => {
    const { borSammen } = barnInfo;
    const updatedWithBorSammen = { ...barnInfo, borSammen: { ...borSammen, value: some(value) } };
    return evaluateDependantValue(updatedWithBorSammen, ValueCheckAction.CHECK_ALENE_OM_OMSORGEN);
};

export const setAleneOmOmsorgen = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { aleneOmOmsorgen } = barn;
    return {
        ...barn,
        aleneOmOmsorgen: { ...aleneOmOmsorgen, value: some(value) },
    };
};

export enum ValueCheckAction {
    CHECK_KRONISKT_SYK = 'CHECK_KRONISKT_SYK',
    CHECK_BOR_SAMMEN = 'CHECK_BOR_SAMMEN',
    CHECK_ALENE_OM_OMSORGEN = 'CHECK_ALENE_OM_OMSORGEN',
}

export const evaluateDependantValue = (barnInfo: BarnInfo, nextValueToCheckAction: ValueCheckAction): BarnInfo => {
    const { kroniskSykt, borSammen, aleneOmOmsorgen } = barnInfo;
    switch (nextValueToCheckAction) {
        case ValueCheckAction.CHECK_KRONISKT_SYK: {
            const kroniskSyktEvaluated = {
                ...barnInfo,
                kroniskSykt: shouldViewKroniskSyktQuestion(barnInfo) ? kroniskSykt : { ...kroniskSykt, value: none },
            };
            return evaluateDependantValue(kroniskSyktEvaluated, ValueCheckAction.CHECK_BOR_SAMMEN);
        }
        case ValueCheckAction.CHECK_BOR_SAMMEN: {
            const updatedWithMaybeWipedBorSammen = {
                ...barnInfo,
                borSammen: shouldViewBorSammenQuestion(barnInfo) ? borSammen : { ...borSammen, value: none },
            };
            return evaluateDependantValue(updatedWithMaybeWipedBorSammen, ValueCheckAction.CHECK_ALENE_OM_OMSORGEN);
        }
        case ValueCheckAction.CHECK_ALENE_OM_OMSORGEN: {
            const updatedWithMaybeWipedAleneOmOmsorgen = {
                ...barnInfo,
                aleneOmOmsorgen: shouldViewAleneOmOmsorgenQuestion(barnInfo)
                    ? aleneOmOmsorgen
                    : { ...aleneOmOmsorgen, value: none },
            };
            return updatedWithMaybeWipedAleneOmOmsorgen;
        }
    }
};

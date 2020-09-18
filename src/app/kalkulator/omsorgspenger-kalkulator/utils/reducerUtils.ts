import { BarnInfo } from './types';
import { none, some } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import {
    shouldViewAleneOmOmsorgenQuestion,
    shouldViewBorSammenQuestion,
    shouldViewKroniskSyktQuestion,
} from './viewUtils';

export const setFodselsdatoAndMaybeWipeValues = (newFodselsdato: ISODateString, barnInfo: BarnInfo): BarnInfo => {
    const { fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen } = barnInfo;

    return {
        ...barnInfo,
        fodselsdato: {
            ...fodselsdato,
            value: some(newFodselsdato),
        },
        kroniskSykt: shouldViewKroniskSyktQuestion(barnInfo) ? kroniskSykt : { ...kroniskSykt, value: none },
        borSammen: shouldViewBorSammenQuestion(barnInfo) ? borSammen : { ...borSammen, value: none },
        aleneOmOmsorgen: shouldViewAleneOmOmsorgenQuestion(barnInfo)
            ? aleneOmOmsorgen
            : { ...aleneOmOmsorgen, value: none },
    };
};

export const fjernFodselsdatoAndWipeValues = (barn: BarnInfo): BarnInfo => {
    return {
        ...barn,
        fodselsdato: {
            ...barn.fodselsdato,
            value: none,
        },
        kroniskSykt: {
            ...barn.kroniskSykt,
            value: none,
        },
        borSammen: {
            ...barn.borSammen,
            value: none,
        },
        aleneOmOmsorgen: {
            ...barn.aleneOmOmsorgen,
            value: none,
        },
    };
};

export const setKroniskSyktAndMaybeWipeValues = (value: boolean, barnInfo: BarnInfo): BarnInfo => {
    const { kroniskSykt, borSammen, aleneOmOmsorgen } = barnInfo;
    return {
        ...barnInfo,
        kroniskSykt: { ...kroniskSykt, value: some(value) },
        borSammen: shouldViewBorSammenQuestion(barnInfo) ? borSammen : { ...borSammen, value: none },
        aleneOmOmsorgen: shouldViewAleneOmOmsorgenQuestion(barnInfo)
            ? aleneOmOmsorgen
            : { ...aleneOmOmsorgen, value: none },
    };
};

export const setBorSammenAndMaybeWipeValues = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { borSammen } = barn;

    return {
        ...barn,
        borSammen: { ...borSammen, value: some(value) },
        aleneOmOmsorgen: shouldViewAleneOmOmsorgenQuestion(barn)
            ? barn.aleneOmOmsorgen
            : { ...barn.aleneOmOmsorgen, value: none },
    };
};

export const setAleneOmOmsorgen = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { aleneOmOmsorgen } = barn;
    return {
        ...barn,
        aleneOmOmsorgen: { ...aleneOmOmsorgen, value: some(value) },
    };
};

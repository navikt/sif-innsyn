import { BarnInfo } from './types';
import { none, some } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';

export const setFodselsdato = (newFodselsdato: ISODateString, barnInfo: BarnInfo): BarnInfo => {
    const { fodselsdato } = barnInfo;

    return {
        ...barnInfo,
        fodselsdato: {
            ...fodselsdato,
            value: some(newFodselsdato),
        },
    };
};

export const fjernFodselsdato = (barn: BarnInfo): BarnInfo => {
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

export const setKroniskSykt = (value: boolean, barnInfo: BarnInfo): BarnInfo => {
    const { kroniskSykt } = barnInfo;
    return {
        ...barnInfo,
        kroniskSykt: { ...kroniskSykt, value: some(value) },
    };
};

export const setBorSammen = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { borSammen } = barn;

    return {
        ...barn,
        borSammen: { ...borSammen, value: some(value) },
    };
};

export const setAleneOmOmsorgen = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { aleneOmOmsorgen } = barn;
    return {
        ...barn,
        aleneOmOmsorgen: { ...aleneOmOmsorgen, value: some(value) },
    };
};

import { BarnInfo, EitherErrorOr, Value } from './types';
import { left, right } from 'fp-ts/lib/Either';
import { barnetErOverAtten, barnetErOverTolvOgIkkeKroniskSykt, isEmptyValue, isSomeValue } from './utils';
import { createFeiloppsummeringFeilNotAnswered } from './initializers';
import { FjernFodselsdatoForBarnInfo, SetFodselsdatoForBarnInfo } from './actions';
import { none, Option } from 'fp-ts/lib/Option';

const updateKroniskSyk = (updatedFodselsdato: EitherErrorOr<string>, kroniskSyk: Value<Option<boolean>>) => {
    if (barnetErOverAtten(updatedFodselsdato)) {
        return right(none);
    }
    if (isEmptyValue(kroniskSyk.value)) {
        return left(createFeiloppsummeringFeilNotAnswered(kroniskSyk.id));
    }
    return kroniskSyk.value;
};

const updateBorSammenMed = (
    borSammenMed: Value<Option<boolean>>,
    fodselsdato: EitherErrorOr<string>,
    kroniskSyk: EitherErrorOr<Option<boolean>>
) => {
    if (barnetErOverAtten(fodselsdato)) {
        return right(none);
    }
    if (barnetErOverTolvOgIkkeKroniskSykt(fodselsdato, kroniskSyk)) {
        return right(none);
    }
    if (isSomeValue(kroniskSyk) && isEmptyValue(borSammenMed.value)) {
        return left(createFeiloppsummeringFeilNotAnswered(borSammenMed.id));
    }
    return borSammenMed.value;
};

const updateAleneOmOmsorgen = (
    aleneOmOmsorgen: Value<Option<boolean>>,
    fodselsdato: EitherErrorOr<string>,
    kroniskSykt: EitherErrorOr<Option<boolean>>,
    borSammenMed: EitherErrorOr<Option<boolean>>
) => {
    if (barnetErOverAtten(fodselsdato)) {
        return right(none);
    }
    if (barnetErOverTolvOgIkkeKroniskSykt(fodselsdato, kroniskSykt)) {
        return right(none);
    }
    if (isSomeValue(borSammenMed) && isEmptyValue(aleneOmOmsorgen.value)) {
        return left(createFeiloppsummeringFeilNotAnswered(aleneOmOmsorgen.id));
    }
    return aleneOmOmsorgen.value;
};

export const setFodselsdatoOgOppdaterDataForBarnet = (action: SetFodselsdatoForBarnInfo) => (barn: BarnInfo) => {
    if (barn.id === action.barnInfoId) {
        const updatedFodselsdato: EitherErrorOr<string> = right(action.isoDateString);

        const updatedKroniskSyk = {
            ...barn.kroniskSykt,
            value: updateKroniskSyk(updatedFodselsdato, barn.kroniskSykt),
        };

        const updatedBorSammenMed = {
            ...barn.borSammen,
            value: updateBorSammenMed(barn.borSammen, updatedFodselsdato, updatedKroniskSyk.value),
        };

        const updatedAleneOmOmsorgen = {
            ...barn.aleneOmOmsorgen,
            value: updateAleneOmOmsorgen(
                barn.aleneOmOmsorgen,
                updatedFodselsdato,
                updatedKroniskSyk.value,
                updatedBorSammenMed.value
            ),
        };

        return {
            ...barn,
            fodselsdato: { ...barn.fodselsdato, value: updatedFodselsdato },
            kroniskSykt: updatedKroniskSyk,
            borSammen: updatedBorSammenMed,
            aleneOmOmsorgen: updatedAleneOmOmsorgen,
        };
    }
    return barn;
};

export const fjernFodselsdatoOgOppdaterDataForBarnet = (action: FjernFodselsdatoForBarnInfo) => (barn: BarnInfo) => {
    if (barn.id === action.barnInfoId) {
        return {
            ...barn,
            fodselsdato: {
                ...barn.fodselsdato,
                value: left(createFeiloppsummeringFeilNotAnswered(barn.fodselsdato.id)),
            },
        };
    }
    return barn;
};

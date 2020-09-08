import { BarnInfo } from './types';
import { left, right } from 'fp-ts/lib/Either';
import { barnetErOverAtten, barnetErOverTolvOgIkkeKroniskSykt, erOverAtten, isEmptyValue, isSomeValue } from './utils';
import { createFeiloppsummeringFeilNotAnswered } from './initializers';
import { SetFodselsdatoForBarnInfo } from './actions';
import { none } from 'fp-ts/lib/Option';

export const setFodselsdatoOgOppdaterDataForBarnet = (action: SetFodselsdatoForBarnInfo) => (barn: BarnInfo) => {
    if (barn.id === action.barnInfoId) {
        const updatedFodselsdato = right(action.isoDateString);

        const updateKroniskSyk = () => {
            // Alder > 18 => kroniskSyk = none
            if (erOverAtten(action.isoDateString)) {
                return right(none);
            }
            // Alder < 18 && kroniskSyk = none => kroniskSyk = left(error)
            if (isEmptyValue(barn.kroniskSykt.value)) {
                return left(createFeiloppsummeringFeilNotAnswered(barn.kroniskSykt.id));
            }
            // Alder < 18 && kroniskSyk = some => unchanged
            return barn.kroniskSykt.value;
        };
        const updatedKroniskSyk = {
            ...barn.kroniskSykt,
            value: updateKroniskSyk(),
        };

        const updateBorSammenMed = () => {
            // Alder > 18 => none
            if (barnetErOverAtten(updatedFodselsdato)) {
                return right(none);
            }
            // Alder > 12 && kroniskSyk = false => none
            if (barnetErOverTolvOgIkkeKroniskSykt(updatedFodselsdato, updatedKroniskSyk.value)) {
                return right(none);
            }
            // kroniskSyk = some  && borSammenMed = none => left(unansered)
            if (isSomeValue(updatedKroniskSyk.value)) {
                return left(createFeiloppsummeringFeilNotAnswered(barn.borSammen.id));
            }
            // else => unchanged
            return barn.borSammen.value;
        };

        const updatedBorSammenMed = {
            ...barn.borSammen,
            value: updateBorSammenMed(),
        };

        const updateAleneOmOmsorgen = () => {
            // Alder > 18 => none
            if (barnetErOverAtten(updatedFodselsdato)) {
                return right(none);
            }
            // Alder > 12 && kroniskSyk = false => none
            if (barnetErOverTolvOgIkkeKroniskSykt(updatedFodselsdato, updatedKroniskSyk.value)) {
                return right(none);
            }
            // kroniskSyk = some  && borSammenMed = none => left(unansered)
            if (isSomeValue(updatedBorSammenMed.value)) {
                return left(createFeiloppsummeringFeilNotAnswered(barn.aleneOmOmsorgen.id));
            }
            // else => unchanged
            return barn.aleneOmOmsorgen.value;
        };

        const updatedAleneOmOmsorgen = {
            ...barn.aleneOmOmsorgen,
            value: updateAleneOmOmsorgen(),
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

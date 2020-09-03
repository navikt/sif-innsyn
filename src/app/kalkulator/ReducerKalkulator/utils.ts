import { BarnInfo, EitherErrorOr, ValidatedBarnInfo, Value } from './types';
import { Either, fold, left } from 'fp-ts/lib/Either';
import { ISODateString } from 'nav-datovelger';
import Barn, { AlderEnum, AlderType } from '@navikt/omsorgspenger-kalkulator/lib/types/Barn';
import moment from 'moment';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';

export type RadioValue = 'ja' | 'nei' | undefined;
export type DefinedRadioValue = 'ja' | 'nei';

export const valueToJaNeiRadioValue = (value: Value<boolean>): RadioValue =>
    fold(
        () => undefined,
        (v) => (v ? 'ja' : 'nei')
    )(value.value);

export const definedJaOrNeiToBool = (definedRadioValue: DefinedRadioValue): boolean => definedRadioValue === 'ja';

export const toISODateStringOrUndefined = (
    eitherErrorOrIsoDateString: EitherErrorOr<ISODateString>
): ISODateString | undefined =>
    fold(
        () => undefined,
        (isoDateString: ISODateString) => isoDateString
    )(eitherErrorOrIsoDateString);

export const isoDateStringFodselsdatoToAlderType = (isoDateStringFodselsdato: ISODateString): AlderType => {
    const s: number = moment().diff(isoDateStringFodselsdato, 'years');
    return s >= 12 ? AlderEnum.OVER12 : AlderEnum.UNDER12;
};

export const validatedBarnInfoToBarn = (barnInfo: ValidatedBarnInfo): Barn => {
    return {
        alder: isoDateStringFodselsdatoToAlderType(barnInfo.fodselsdato.value),
        kroniskSykt: barnInfo.ekstraOmsorgsdager.value,
        søkerHarAleneomsorgFor: barnInfo.aleneOmOmsorgen.value,
        id: barnInfo.id,
    };
};

export const evaluate = (listeAvBarnInfo: BarnInfo[]): Either<FeiloppsummeringFeil[], Omsorgsprinsipper> => {
    if (listeAvBarnInfo.length === 0) {
        return left([]);
    }

    return left([]);
};

export function toValueOrUndefined<T>(eitherErrorOrValue: EitherErrorOr<T>): T | undefined {
    return fold(
        () => undefined,
        (value: T) => value
    )(eitherErrorOrValue);
}

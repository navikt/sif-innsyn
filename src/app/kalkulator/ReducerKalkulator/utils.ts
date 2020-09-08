import { BarnApi, BarnInfo, YesOrNo } from './types';
import { Either, either, fold, getOrElse, isRight, left, map, right, swap } from 'fp-ts/lib/Either';
import { flatten, separate, sequence } from 'fp-ts/lib/Array';
import { ISODateString } from 'nav-datovelger';
import { AlderEnum, AlderType } from '@navikt/omsorgspenger-kalkulator/lib/types/Barn';
import moment from 'moment';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { pipe } from 'fp-ts/lib/pipeable';
import { Separated } from 'fp-ts/lib/Compactable';
import { createFeiloppsummeringFeilNotAnswered } from './initializers';
import {
    chain as andThen,
    flatten as flattenOption,
    fold as foldOption,
    fromEither,
    isNone,
    isSome,
    map as mapOption,
    Option,
} from 'fp-ts/lib/Option';

export type RadioValue = YesOrNo | undefined;

export const toRadioValue = (optionValue: Option<boolean>): RadioValue =>
    foldOption(
        () => undefined,
        (justValue: boolean) => (justValue ? YesOrNo.Yes : YesOrNo.No)
    )(optionValue);

export const YesOrNoToBool = (yesOrNo: YesOrNo): boolean => yesOrNo === YesOrNo.Yes;

export const yesOrNoRadios = (id: string) => [
    { label: 'Ja', value: YesOrNo.Yes },
    { label: 'Nei', value: YesOrNo.No },
];

export function doOrUndefined<A, B>(f: (x: A) => B, optionValue: Option<A>): B | undefined {
    return foldOption(
        () => undefined,
        (value: A) => f(value)
    )(optionValue);
}

export const toFodselsdatoOrUndefined = (
    eitherErrorOrIsoDateString: Option<ISODateString>
): ISODateString | undefined =>
    foldOption(
        () => undefined,
        (isoDateString: ISODateString) => isoDateString
    )(eitherErrorOrIsoDateString);

export const erOver = (fodselsdato: ISODateString, aar: number): boolean => moment().diff(fodselsdato, 'years') >= aar;
export const erOverTolv = (fodselsdato: ISODateString): boolean => erOver(fodselsdato, 12);
export const erOverAtten = (fodselsdato: ISODateString): boolean => erOver(fodselsdato, 18);

export const fodselsdatoToAlderType = (isoDateStringFodselsdato: ISODateString): AlderType =>
    erOverTolv(isoDateStringFodselsdato) ? AlderEnum.OVER12 : AlderEnum.UNDER12;

export const mapBarnInfoToBarnApi = (barnInfo: BarnInfo): BarnApi => {
    return {
        id: barnInfo.id,
        alder: doOrUndefined(fodselsdatoToAlderType, barnInfo.fodselsdato.value),
        kroniskSykt: doOrUndefined((value: boolean) => value, barnInfo.kroniskSykt.value),
        søkerHarAleneomsorgFor: doOrUndefined((value: boolean) => value, barnInfo.aleneOmOmsorgen.value),
    };
};

export function toValueOrUndefined<T>(optionValue: Option<T>): T | undefined {
    return foldOption(
        () => undefined,
        (value: T) => value
    )(optionValue);
}

export function isSomeValue<T>(eitherValue: Either<FeiloppsummeringFeil, Option<T>>): boolean {
    return pipe(eitherValue, fromEither, flattenOption, isSome);
}
export function isEmptyValue<T>(eitherValue: Either<FeiloppsummeringFeil, Option<T>>): boolean {
    return pipe(eitherValue, fromEither, flattenOption, isNone);
}

export const optionalFodselsdatoErOverAtten = (fodselsdato: Option<string>): boolean =>
    foldOption(
        () => false,
        (fodselsdato: ISODateString) => erOverAtten(fodselsdato)
    )(fodselsdato);

export const barnetErOverTolvOgIkkeKroniskSykt = (
    maybeFodselsdato: Option<string>,
    maybeKroniskSykt: Option<boolean>
): boolean => {
    const optionalIsTrue: Option<boolean> = pipe(
        maybeFodselsdato,
        mapOption((fodselsdato) => erOverTolv(fodselsdato)),
        andThen((merEnnTolv: boolean) =>
            mapOption((kroniskSykt: boolean) => !kroniskSykt && merEnnTolv)(maybeKroniskSykt)
        )
    );

    return foldOption(
        () => false,
        (value: boolean) => value
    )(optionalIsTrue);
};

export const borIkkeSammen = (barnInfo: BarnInfo): boolean => !shouldViewAleneOmOmsorgenQuestion(barnInfo);

export const shouldViewKroniskSyktQuestion = (barnInfo: BarnInfo): boolean =>
    pipe(
        barnInfo.fodselsdato.value,
        foldOption(
            () => false,
            (fodselsdato: string) => !erOverAtten(fodselsdato)
        )
    );

export const shouldViewBorSammenQuestion = (barnInfo: BarnInfo): boolean =>
    !optionalFodselsdatoErOverAtten(barnInfo.fodselsdato.value) &&
    !barnetErOverTolvOgIkkeKroniskSykt(barnInfo.fodselsdato.value, barnInfo.kroniskSykt.value) &&
    isSome(barnInfo.kroniskSykt.value);

export const shouldViewAleneOmOmsorgenQuestion = (barnInfo: BarnInfo): boolean =>
    pipe(
        barnInfo.borSammen.value,
        foldOption(
            () => false,
            (borSammen: boolean) => borSammen
        )
    );

export function getListOfError<T>(input: Either<FeiloppsummeringFeil, T>): FeiloppsummeringFeil[] {
    return getOrElse((): FeiloppsummeringFeil[] => [])(map((e: FeiloppsummeringFeil) => [e])(swap(input)));
}

export const isBarnApi = (barnInfo: BarnInfo): boolean => isRight(validateBarnInfo(barnInfo));

export function mapFromOptionalToValueOrUndefined<T>(optionalValue: Option<T>): T | undefined {
    return foldOption(
        () => undefined,
        (value: T) => value
    )(optionalValue);
}

export const toFeiloppsummeringsFeil = (id: string, error: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: error,
});

export const validateBarnInfo = (barnInfo: BarnInfo): Either<FeiloppsummeringFeil[], BarnApi> => {
    const { fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen }: BarnInfo = barnInfo;
    const samletListeAvFeil: FeiloppsummeringFeil[] = [
        ...fodselsdato.errors.map((error) => toFeiloppsummeringsFeil(fodselsdato.id, error)),
        ...kroniskSykt.errors.map((error) => toFeiloppsummeringsFeil(kroniskSykt.id, error)),
        ...borSammen.errors.map((error) => toFeiloppsummeringsFeil(borSammen.id, error)),
        ...aleneOmOmsorgen.errors.map((error) => toFeiloppsummeringsFeil(aleneOmOmsorgen.id, error)),
    ];
    return samletListeAvFeil.length === 0 ? right(mapBarnInfoToBarnApi(barnInfo)) : left(samletListeAvFeil);
};

export const extractEitherFromList = (
    list: Either<FeiloppsummeringFeil[], BarnApi>[]
): Either<FeiloppsummeringFeil[], BarnApi[]> =>
    pipe(
        sequence(either)(list),
        fold(
            () => {
                const separated: Separated<Array<Array<FeiloppsummeringFeil>>, BarnApi[]> = separate(list);
                const errors: Array<Array<FeiloppsummeringFeil>> = separated.left;
                return left(flatten(errors));
            },
            (r) => right(r)
        )
    );

export const validateInputData = (
    nBarnSelectId: string,
    listeAvBarnInfo?: BarnInfo[]
): Either<FeiloppsummeringFeil[], BarnApi[]> => {
    if (!listeAvBarnInfo || listeAvBarnInfo.length === 0) {
        return left([createFeiloppsummeringFeilNotAnswered(nBarnSelectId)]);
    }
    const listOfEitherErrorOrBarnApi: Either<FeiloppsummeringFeil[], BarnApi>[] = listeAvBarnInfo.map(validateBarnInfo);
    return extractEitherFromList(listOfEitherErrorOrBarnApi);
};

// export const validateAndIfValidCalculate = (state: State): State => {
//     const validatedListOfBarnInfo = validateListOfBarnInfo(state.barn, state.nBarn.id);
//     omsorgsdager();
// };

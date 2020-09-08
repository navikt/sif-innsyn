import { BarnInfo, EitherErrorOr, ValidBarnInfo, Value, YesOrNo } from './types';
import { chain, Either, either, fold, getOrElse, isRight, left, map, right, swap } from 'fp-ts/lib/Either';
import { flatten, separate, sequence } from 'fp-ts/lib/Array';
import { ISODateString } from 'nav-datovelger';
import Barn, { AlderEnum, AlderType } from '@navikt/omsorgspenger-kalkulator/lib/types/Barn';
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

export const mapValueOptionBoolToRadioValue = (value: Value<Option<boolean>>): RadioValue =>
    fold(
        () => undefined,
        (optionalValue: Option<boolean>) =>
            foldOption(
                () => undefined,
                (justValue: boolean) => (justValue ? YesOrNo.Yes : YesOrNo.No)
            )(optionalValue)
    )(value.value);

export const mapValueBoolToRadioValue = (value: Value<boolean>): RadioValue =>
    fold(
        () => undefined,
        (v) => (v ? YesOrNo.Yes : YesOrNo.No)
    )(value.value);

export const YesOrNoToBool = (yesOrNo: YesOrNo): boolean => yesOrNo === YesOrNo.Yes;

export const yesOrNoRadios = (id: string) => [
    { label: 'Ja', value: YesOrNo.Yes },
    { label: 'Nei', value: YesOrNo.No },
];

export const toISODateStringOrUndefined = (
    eitherErrorOrIsoDateString: EitherErrorOr<ISODateString>
): ISODateString | undefined =>
    fold(
        () => undefined,
        (isoDateString: ISODateString) => isoDateString
    )(eitherErrorOrIsoDateString);

export const erOver = (fodselsdato: ISODateString, aar: number): boolean => moment().diff(fodselsdato, 'years') >= aar;
export const erOverTolv = (fodselsdato: ISODateString): boolean => erOver(fodselsdato, 12);
export const erOverAtten = (fodselsdato: ISODateString): boolean => erOver(fodselsdato, 18);

export const isoDateStringFodselsdatoToAlderType = (isoDateStringFodselsdato: ISODateString): AlderType =>
    erOverTolv(isoDateStringFodselsdato) ? AlderEnum.OVER12 : AlderEnum.UNDER12;

export const validatedBarnInfoToBarn = (barnInfo: ValidBarnInfo): Barn => {
    return {
        alder: isoDateStringFodselsdatoToAlderType(barnInfo.fodselsdato.value),
        kroniskSykt: barnInfo.kroniskSykt.value,
        søkerHarAleneomsorgFor: barnInfo.aleneOmOmsorgen.value,
        id: barnInfo.id,
    };
};

export function toValueOrUndefined<T>(eitherErrorOrValue: EitherErrorOr<T>): T | undefined {
    return fold(
        () => undefined,
        (value: T) => value
    )(eitherErrorOrValue);
}

export function isSomeValue<T>(eitherValue: Either<FeiloppsummeringFeil, Option<T>>): boolean {
    return pipe(eitherValue, fromEither, flattenOption, isSome);
}
export function isEmptyValue<T>(eitherValue: Either<FeiloppsummeringFeil, Option<T>>): boolean {
    return pipe(eitherValue, fromEither, flattenOption, isNone);
}

// Rules:
export const barnetErOverAtten = (fodselsdato: EitherErrorOr<string>): boolean =>
    fold(
        () => false,
        (fodselsdato: ISODateString) => erOverAtten(fodselsdato)
    )(fodselsdato);

export const barnetErOverTolvOgIkkeKroniskSykt = (
    fodselsdato: EitherErrorOr<string>,
    kroniskSykt: EitherErrorOr<Option<boolean>>
): boolean => {
    const maybeFodselsdato = fromEither(fodselsdato);
    const maybeKroniskSykt = flattenOption(fromEither(kroniskSykt));
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

export const borIkkeSammen = (barnInfo: BarnInfo): boolean =>
    fold(
        () => false,
        (optionalBorSammen: Option<boolean>) =>
            foldOption(
                () => false,
                (borSammen: boolean) => !borSammen
            )(optionalBorSammen)
    )(barnInfo.borSammen.value);

export const shouldViewKroniskSyktQuestion = (barnInfo: BarnInfo): boolean =>
    pipe(
        barnInfo.fodselsdato.value,
        fromEither,
        foldOption(
            () => false,
            (fodselsdato: string) => !erOverAtten(fodselsdato)
        )
    );

export const shouldViewBorSammenQuestion = (barnInfo: BarnInfo): boolean =>
    !barnetErOverAtten(barnInfo.fodselsdato.value) &&
    !barnetErOverTolvOgIkkeKroniskSykt(barnInfo.fodselsdato.value, barnInfo.kroniskSykt.value) &&
    isSomeValue(barnInfo.kroniskSykt.value);

export const shouldViewAleneOmOmsorgenQuestion = (barnInfo: BarnInfo): boolean =>
    pipe(
        barnInfo.borSammen.value,
        fromEither,
        flattenOption,
        foldOption(
            () => false,
            (borSammen: boolean) => borSammen
        )
    );

export function getListOfError<T>(input: Either<FeiloppsummeringFeil, T>): FeiloppsummeringFeil[] {
    return getOrElse((): FeiloppsummeringFeil[] => [])(map((e: FeiloppsummeringFeil) => [e])(swap(input)));
}

export const isValidBarnInfo = (barnInfo: BarnInfo): boolean => isRight(validateBarnInfo(barnInfo));

export function mapFromOptionalToValueOrUndefined<T>(optionalValue: Option<T>): T | undefined {
    return foldOption(
        () => undefined,
        (value: T) => value
    )(optionalValue);
}

export const validateBarnInfo = (barnInfo: BarnInfo): Either<FeiloppsummeringFeil[], ValidBarnInfo> => {
    const { value: eitherFodselsdato, id: fodselsdatoId } = barnInfo.fodselsdato;
    const { value: eitherKroniskSykt, id: kroniskSyktId } = barnInfo.kroniskSykt;
    const { value: eitherBorSammen, id: borSammenId } = barnInfo.borSammen;
    const { value: eitherAleneOmOmsorgen, id: aleneOmOmsorgenId } = barnInfo.aleneOmOmsorgen;

    const result: Either<FeiloppsummeringFeil, ValidBarnInfo> = pipe(
        eitherFodselsdato,
        map((fodselsdato: ISODateString) => ({ fodselsdato: { id: fodselsdatoId, value: fodselsdato } })),
        chain((partialValidBarnInfo) =>
            map((value: Option<boolean>) => ({
                ...partialValidBarnInfo,
                kroniskSykt: { id: kroniskSyktId, value: mapFromOptionalToValueOrUndefined(value) },
            }))(eitherKroniskSykt)
        ),
        chain((partialValidBarnInfo) =>
            map((value: Option<boolean>) => ({
                ...partialValidBarnInfo,
                borSammen: { id: borSammenId, value: mapFromOptionalToValueOrUndefined(value) },
            }))(eitherBorSammen)
        ),
        chain((partialValidBarnInfo) =>
            map((value: Option<boolean>) => ({
                ...partialValidBarnInfo,
                aleneOmOmsorgen: { id: aleneOmOmsorgenId, value: mapFromOptionalToValueOrUndefined(value) },
            }))(eitherAleneOmOmsorgen)
        ),
        chain((a) => map((id: string) => ({ ...a, id }))(right(barnInfo.id)))
    );

    return pipe(
        result,
        fold(
            (e) =>
                left([
                    ...getListOfError(eitherFodselsdato),
                    ...getListOfError(eitherKroniskSykt),
                    ...getListOfError(eitherBorSammen),
                    ...getListOfError(eitherAleneOmOmsorgen),
                ]),
            (validBarnInfo: ValidBarnInfo) => right(validBarnInfo)
        )
    );
};

export const extractEitherFromList = (
    list: Either<FeiloppsummeringFeil[], ValidBarnInfo>[]
): Either<FeiloppsummeringFeil[], ValidBarnInfo[]> =>
    pipe(
        sequence(either)(list),
        fold(
            () => {
                const separated: Separated<Array<Array<FeiloppsummeringFeil>>, ValidBarnInfo[]> = separate(list);
                const errors: Array<Array<FeiloppsummeringFeil>> = separated.left;
                return left(flatten(errors));
            },
            (r) => right(r)
        )
    );

export const validateListOfBarnInfo = (
    listeAvBarnInfo: BarnInfo[],
    nBarnSelectId: string
): Either<FeiloppsummeringFeil[], ValidBarnInfo[]> => {
    if (listeAvBarnInfo.length === 0) {
        return left([createFeiloppsummeringFeilNotAnswered(nBarnSelectId)]);
    }
    const listOfEitherErrorOrValidBarnInfo: Either<FeiloppsummeringFeil[], ValidBarnInfo>[] = listeAvBarnInfo.map(
        validateBarnInfo
    );
    return extractEitherFromList(listOfEitherErrorOrValidBarnInfo);
};

// export const validateAndIfValidCalculate = (state: State): State => {
//     const validatedListOfBarnInfo = validateListOfBarnInfo(state.barn, state.nBarn.id);
//     omsorgsdager();
// };

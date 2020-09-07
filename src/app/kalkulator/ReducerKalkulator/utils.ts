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

export type RadioValue = YesOrNo | undefined;

export const ValueBoolRadioValue = (value: Value<boolean>): RadioValue =>
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

export const isoDateStringFodselsdatoToAlderType = (isoDateStringFodselsdato: ISODateString): AlderType => {
    const s: number = moment().diff(isoDateStringFodselsdato, 'years');
    return s >= 12 ? AlderEnum.OVER12 : AlderEnum.UNDER12;
};

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

export function getListOfError<T>(input: Either<FeiloppsummeringFeil, T>): FeiloppsummeringFeil[] {
    return getOrElse((): FeiloppsummeringFeil[] => [])(map((e: FeiloppsummeringFeil) => [e])(swap(input)));
}

export const isValidBarnInfo = (barnInfo: BarnInfo): boolean => isRight(validateBarnInfo(barnInfo));

export const validateBarnInfo = (barnInfo: BarnInfo): Either<FeiloppsummeringFeil[], ValidBarnInfo> => {
    const { value: eitherF, id: idF } = barnInfo.fodselsdato;
    const { value: eitherK, id: idK } = barnInfo.kroniskSykt;
    const { value: eitherB, id: idB } = barnInfo.borSammen;
    const { value: eitherA, id: idA } = barnInfo.aleneOmOmsorgen;

    const result: Either<FeiloppsummeringFeil, ValidBarnInfo> = pipe(
        eitherF,
        map((fodselsdato: ISODateString) => ({ fodselsdato: { id: idF, value: fodselsdato } })),
        chain((a) => map((value: boolean) => ({ ...a, kroniskSykt: { id: idK, value } }))(eitherK)),
        chain((a) => map((value: boolean) => ({ ...a, borSammen: { id: idB, value } }))(eitherB)),
        chain((a) => map((value: boolean) => ({ ...a, aleneOmOmsorgen: { id: idA, value } }))(eitherA)),
        chain((a) => map((id: string) => ({ ...a, id }))(right(barnInfo.id)))
    );

    return pipe(
        result,
        fold(
            (e) =>
                left([
                    ...getListOfError(eitherF),
                    ...getListOfError(eitherK),
                    ...getListOfError(eitherB),
                    ...getListOfError(eitherA),
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

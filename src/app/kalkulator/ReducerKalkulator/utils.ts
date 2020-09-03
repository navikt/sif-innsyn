import { BarnInfo, EitherErrorOr, ValidBarnInfo, Value, YesOrNo } from './types';
import { chain, Either, either, fold, left, map, right } from 'fp-ts/lib/Either';
import { sequence } from 'fp-ts/lib/Array';
import { ISODateString } from 'nav-datovelger';
import Barn, { AlderEnum, AlderType } from '@navikt/omsorgspenger-kalkulator/lib/types/Barn';
import moment from 'moment';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { pipe } from 'fp-ts/lib/pipeable';

export type RadioValue = YesOrNo | undefined;

export const ValueBoolToYesOrNo = (value: Value<boolean>): RadioValue =>
    fold(
        () => undefined,
        (v) => (v ? YesOrNo.Yes : YesOrNo.No)
    )(value.value);

export const YesOrNoToBool = (yesOrNo: YesOrNo): boolean => yesOrNo === YesOrNo.Yes;

export const yesOrNoRadios = [
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

interface Tull {
    id: string;
    fodselsdato: ISODateString;
    ekstraOmsorgsdager: boolean;
    borSammen: boolean;
    aleneOmOmsorgen: boolean;
}

export const validateBarnInfo = (barnInfo: BarnInfo): Either<FeiloppsummeringFeil[], ValidBarnInfo> => {
    const ea: Either<FeiloppsummeringFeil, ISODateString> = barnInfo.fodselsdato.value;
    const eb: Either<FeiloppsummeringFeil, boolean> = barnInfo.kroniskSykt.value;
    const ec: Either<FeiloppsummeringFeil, boolean> = barnInfo.borSammen.value;
    const ed: Either<FeiloppsummeringFeil, boolean> = barnInfo.aleneOmOmsorgen.value;

    const result: Either<FeiloppsummeringFeil, Tull> = pipe(
        ea,
        map((d: ISODateString) => ({ fodselsdato: d })),
        chain((a) => map((b: boolean) => ({ ...a, ekstraOmsorgsdager: b }))(eb)),
        chain((a) => map((b: boolean) => ({ ...a, borSammen: b }))(ec)),
        chain((a) => map((b: boolean) => ({ ...a, aleneOmOmsorgen: b }))(ed)),
        chain((a) => map((b: string) => ({ ...a, id: b }))(right(barnInfo.id)))
    );

    return pipe(
        result,
        fold(
            (e) => left([e]),
            (t: Tull) => {
                const validBarnInfo: ValidBarnInfo = {
                    id: t.id,
                    fodselsdato: { id: barnInfo.fodselsdato.id, value: t.fodselsdato },
                    kroniskSykt: { id: barnInfo.kroniskSykt.id, value: t.ekstraOmsorgsdager },
                    borSammen: { id: barnInfo.borSammen.id, value: t.borSammen },
                    aleneOmOmsorgen: { id: barnInfo.aleneOmOmsorgen.id, value: t.aleneOmOmsorgen },
                };
                return right(validBarnInfo);
            }
        )
    );
};

export const extractEitherFromList = (
    list: Either<FeiloppsummeringFeil[], ValidBarnInfo>[]
): Either<FeiloppsummeringFeil[], ValidBarnInfo[]> => {
    return sequence(either)(list);
};

export const evaluateBarnInfo = (listeAvBarnInfo: BarnInfo[]): Either<FeiloppsummeringFeil[], ValidBarnInfo[]> => {
    if (listeAvBarnInfo.length === 0) {
        return left([]);
    }
    const mapped: Either<FeiloppsummeringFeil[], ValidBarnInfo>[] = listeAvBarnInfo.map(validateBarnInfo);
    const extractedEither: Either<FeiloppsummeringFeil[], ValidBarnInfo[]> = extractEitherFromList(mapped);
    return extractedEither;
};

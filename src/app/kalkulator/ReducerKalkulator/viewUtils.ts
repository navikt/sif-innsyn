import {
    barnetErOverAtten,
    barnetErOverTolvOgIkkeKroniskSykt,
    borIkkeSammen,
    erOverAtten,
    validateBarnInfo,
} from './utils';
import { BarnInfo, YesOrNo } from './types';
import { isRight } from 'fp-ts/lib/Either';
import { fold as foldOption, isSome, Option } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import { pipe } from 'fp-ts/lib/pipeable';

export const isNotLastChild = (index: number, listLength: number) => index + 1 < listLength;

export const erFerdigUtfylt = (barnInfo: BarnInfo): boolean => isRight(validateBarnInfo(barnInfo));

export const skalViseGåTilNesteBarnKnapp = (barnInfo: BarnInfo, index: number, listLength: number): boolean =>
    erFerdigUtfylt(barnInfo) && isNotLastChild(index, listLength);

export type RadioValue = YesOrNo | undefined;

export const YesOrNoToBool = (yesOrNo: YesOrNo): boolean => yesOrNo === YesOrNo.Yes;

export const yesOrNoRadios = (id: string) => [
    { label: 'Ja', value: YesOrNo.Yes },
    { label: 'Nei', value: YesOrNo.No },
];

export const toFodselsdatoOrUndefined = (
    eitherErrorOrIsoDateString: Option<ISODateString>
): ISODateString | undefined =>
    foldOption(
        () => undefined,
        (isoDateString: ISODateString) => isoDateString
    )(eitherErrorOrIsoDateString);

export const toRadioValue = (optionValue: Option<boolean>): RadioValue =>
    foldOption(
        () => undefined,
        (justValue: boolean) => (justValue ? YesOrNo.Yes : YesOrNo.No)
    )(optionValue);

export const shouldViewKroniskSyktQuestion = (barnInfo: BarnInfo): boolean =>
    pipe(
        barnInfo.fodselsdato.value,
        foldOption(
            () => false,
            (fodselsdato: string) => !erOverAtten(fodselsdato)
        )
    );

export const shouldViewBorSammenQuestion = (barnInfo: BarnInfo): boolean =>
    !barnetErOverAtten(barnInfo) && !barnetErOverTolvOgIkkeKroniskSykt(barnInfo) && isSome(barnInfo.kroniskSykt.value);

export const shouldViewAleneOmOmsorgenQuestion = (barnInfo: BarnInfo): boolean =>
    !barnetErOverAtten(barnInfo) &&
    !barnetErOverTolvOgIkkeKroniskSykt(barnInfo) &&
    !borIkkeSammen(barnInfo) &&
    isSome(barnInfo.borSammen.value);

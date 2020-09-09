import { validateBarnInfo } from './utils';
import { BarnInfo } from './types';
import { isRight } from 'fp-ts/lib/Either';

export const isNotLastChild = (index: number, listLength: number) => index + 1 < listLength;

export const erFerdigUtfylt = (barnInfo: BarnInfo): boolean => isRight(validateBarnInfo(barnInfo));

export const skalViseGåTilNesteBarnKnapp = (barnInfo: BarnInfo, index: number, listLength: number): boolean =>
    erFerdigUtfylt(barnInfo) && isNotLastChild(index, listLength);

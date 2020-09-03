import { YesOrNo } from './types';

export const isYesOrNo = (value: string): value is YesOrNo => value === YesOrNo.Yes || value === YesOrNo.No;

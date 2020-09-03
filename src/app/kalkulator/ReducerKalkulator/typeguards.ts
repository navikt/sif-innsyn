import { DefinedRadioValue } from './utils';

export const isJaOrNei = (value: string): value is DefinedRadioValue => value === 'ja' || value === 'nei';

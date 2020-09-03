import { none, Option } from 'fp-ts/lib/Option';

export interface BarnInfo {
    fodselsdato: Option<Date>;
    ekstraOmsorgsdager: Option<boolean>;
    borSammen: Option<boolean>;
    aleneOmOmsorgen: Option<boolean>;
}

export const initialBarnInformasjon: BarnInfo = {
    fodselsdato: none,
    ekstraOmsorgsdager: none,
    borSammen: none,
    aleneOmOmsorgen: none,
};

export interface State {
    readonly nBarnMaks: number;
    barn: BarnInfo[];
    showValidationErrorSummary: boolean;
}

export const initialState: State = {
    nBarnMaks: 20,
    barn: [
        initialBarnInformasjon,
        initialBarnInformasjon,
        initialBarnInformasjon,
        initialBarnInformasjon,
        initialBarnInformasjon,
        initialBarnInformasjon,
        initialBarnInformasjon,
        initialBarnInformasjon,
    ],
    showValidationErrorSummary: false,
};

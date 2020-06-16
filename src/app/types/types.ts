import { ArbeidsgiverApiResponse } from './apiTypes/arbeidsgiverTypes';
import { BarnApiResponse } from './apiTypes/barnTypes';
import { SøkerApiResponse } from './apiTypes/søkerTypes';

export enum WillRedirect {
    Yes = 'Yes',
    No = 'No',
}

export type StringOrNull = string | null;

export interface Essentials {
    person: SøkerApiResponse;
    arbeidsgiver: ArbeidsgiverApiResponse;
    barn: BarnApiResponse;
}

import { Either } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ISODateString } from 'nav-datovelger';

export enum YesOrNo {
    Yes = 'Yes',
    No = 'No',
}

export interface ValueWithId<T> {
    id: string;
    value: T;
}
export type EitherErrorOr<T> = Either<FeiloppsummeringFeil, T>;
export type Value<T> = ValueWithId<Either<FeiloppsummeringFeil, T>>;
export type ValidatedValue<T> = ValueWithId<T>;

export interface NBarn {
    id: string;
    value: EitherErrorOr<number>;
}

export interface BarnInfo {
    id: string;
    fodselsdato: Value<ISODateString>;
    kroniskSykt: Value<boolean>;
    borSammen: Value<boolean>;
    aleneOmOmsorgen: Value<boolean>;
}

export interface ValidBarnInfo {
    id: string;
    fodselsdato: ValidatedValue<ISODateString>;
    kroniskSykt: ValidatedValue<boolean>;
    borSammen: ValidatedValue<boolean>;
    aleneOmOmsorgen: ValidatedValue<boolean>;
}

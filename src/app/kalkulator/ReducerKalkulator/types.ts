import { Either } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ISODateString } from 'nav-datovelger';

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
    ekstraOmsorgsdager: Value<boolean>;
    borSammen: Value<boolean>;
    aleneOmOmsorgen: Value<boolean>;
}

export interface ValidatedBarnInfo {
    id: string;
    fodselsdato: ValidatedValue<ISODateString>;
    ekstraOmsorgsdager: ValidatedValue<boolean>;
    borSammen: ValidatedValue<boolean>;
    aleneOmOmsorgen: ValidatedValue<boolean>;
}

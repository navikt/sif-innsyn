import { Either } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ISODateString } from 'nav-datovelger';
import { Option } from 'fp-ts/lib/Option';

export enum YesOrNo {
    Yes = 'Yes',
    No = 'No',
}

export interface ValueWithId<T> {
    id: string;
    value: T;
}
export interface OptionalValueWithId<T> {
    id: string;
    value: T | undefined;
}
export type EitherErrorOr<T> = Either<FeiloppsummeringFeil, T>;
export type Value<T> = ValueWithId<Either<FeiloppsummeringFeil, T>>;

export interface NBarn {
    id: string;
    value: EitherErrorOr<number>;
}

export interface BarnInfo {
    id: string;
    fodselsdato: Value<ISODateString>;
    kroniskSykt: Value<Option<boolean>>;
    borSammen: Value<Option<boolean>>;
    aleneOmOmsorgen: Value<Option<boolean>>;
}

export interface ValidBarnInfo {
    id: string;
    fodselsdato: ValueWithId<ISODateString>;
    kroniskSykt: OptionalValueWithId<boolean>;
    borSammen: OptionalValueWithId<boolean>;
    aleneOmOmsorgen: OptionalValueWithId<boolean>;
}

import { ISODateString } from 'nav-datovelger';
import Barn from '@navikt/omsorgspenger-kalkulator/lib/types/Barn';
import { Option } from 'fp-ts/lib/Option';

export enum YesOrNo {
    Yes = 'Yes',
    No = 'No',
}

export interface Value<T> {
    id: string;
    value: T;
}

export interface BarnInfo {
    id: string;
    fodselsdato: Value<Option<ISODateString>>;
    kroniskSykt: Value<Option<boolean>>;
    borSammen: Value<Option<boolean>>;
    aleneOmOmsorgen: Value<Option<boolean>>;
}

export type BarnApi = Barn;

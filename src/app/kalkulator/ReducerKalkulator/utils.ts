import { BarnApi, BarnInfo } from './types';
import { Either, either, fold, left, right } from 'fp-ts/lib/Either';
import { compact, flatten, separate, sequence } from 'fp-ts/lib/Array';
import { ISODateString } from 'nav-datovelger';
import { AlderEnum, AlderType } from '@navikt/omsorgspenger-kalkulator/lib/types/Barn';
import moment from 'moment';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { pipe } from 'fp-ts/lib/pipeable';
import { Separated } from 'fp-ts/lib/Compactable';
import { fold as foldOption, isNone, isSome, Option } from 'fp-ts/lib/Option';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import { omsorgsdager } from '@navikt/omsorgspenger-kalkulator/lib/components/kalkulerOmsorgsdager';
import {
    beregnButton,
    beregnButtonAndErrorSummary,
    caseResultViewOf,
    empty,
    noValidChildrenOrange,
    resultBox,
    ResultView,
} from './types/ResultView';
import { aleneOmOmsorgenIsValid, borSammenIsValid, fodselsdatoIsValid, kroniskSyktIsValid } from './validationUtils';

export function doOrUndefined<A, B>(f: (x: A) => B, optionValue: Option<A>): B | undefined {
    return foldOption(
        () => undefined,
        (value: A) => f(value)
    )(optionValue);
}

export const erOver = (fodselsdato: ISODateString, aar: number): boolean => moment().diff(fodselsdato, 'years') >= aar;
export const erOverTolv = (fodselsdato: ISODateString): boolean => erOver(fodselsdato, 12);
export const erOverAtten = (fodselsdato: ISODateString): boolean => erOver(fodselsdato, 18);

export const fodselsdatoToAlderType = (isoDateStringFodselsdato: ISODateString): AlderType =>
    erOverTolv(isoDateStringFodselsdato) ? AlderEnum.OVER12 : AlderEnum.UNDER12;

export const mapBarnInfoToBarnApi = (barnInfo: BarnInfo): BarnApi => {
    return {
        id: barnInfo.id,
        alder: doOrUndefined(fodselsdatoToAlderType, barnInfo.fodselsdato.value),
        kroniskSykt: doOrUndefined((value: boolean) => value, barnInfo.kroniskSykt.value),
        søkerHarAleneomsorgFor: doOrUndefined((value: boolean) => value, barnInfo.aleneOmOmsorgen.value),
    };
};

export const barnetErOverAtten = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.fodselsdato.value) && erOverAtten(barnInfo.fodselsdato.value.value);

export const barnetErOverTolvOgIkkeKroniskSykt = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.fodselsdato.value) &&
    erOverTolv(barnInfo.fodselsdato.value.value) &&
    isSome(barnInfo.kroniskSykt.value) &&
    !barnInfo.kroniskSykt.value.value;

export const borIkkeSammen = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.borSammen.value) && !barnInfo.borSammen.value.value;

export const toFeiloppsummeringsFeil = (id: string, error: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: error,
});

export const outInvalidChildren = (barnInfo: BarnInfo): boolean =>
    !(barnetErOverAtten(barnInfo) || barnetErOverTolvOgIkkeKroniskSykt(barnInfo) || borIkkeSammen(barnInfo));

// TODO: Implementasjon av validateBarnInfo burde forbedres. Den gir ingen garanti for at listOfFeiloppsummeringFeil ikke er tom, som den burde.
export const validateBarnInfo = (barnInfo: BarnInfo): Either<FeiloppsummeringFeil[], BarnApi> => {
    const { fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen }: BarnInfo = barnInfo;

    const maybeErrorInFodselsdato: Option<FeiloppsummeringFeil> = fodselsdatoIsValid(fodselsdato);
    const maybeErrorInKroniskSykt: Option<FeiloppsummeringFeil> = kroniskSyktIsValid(kroniskSykt);
    const maybeErrorInBorSammen: Option<FeiloppsummeringFeil> = borSammenIsValid(borSammen);
    const maybeErrorInAleneOmOmsorgen: Option<FeiloppsummeringFeil> = aleneOmOmsorgenIsValid(aleneOmOmsorgen);

    if (
        isNone(maybeErrorInFodselsdato) &&
        isNone(maybeErrorInKroniskSykt) &&
        isNone(maybeErrorInBorSammen) &&
        isNone(maybeErrorInAleneOmOmsorgen)
    ) {
        return right(mapBarnInfoToBarnApi(barnInfo));
    } else {
        const listOfFeiloppsummeringFeil: FeiloppsummeringFeil[] = compact([
            maybeErrorInFodselsdato,
            maybeErrorInKroniskSykt,
            maybeErrorInBorSammen,
            maybeErrorInAleneOmOmsorgen,
        ]);
        return left(listOfFeiloppsummeringFeil);
    }
};

export const extractEitherFromList = (
    list: Either<FeiloppsummeringFeil[], BarnApi>[]
): Either<FeiloppsummeringFeil[], BarnApi[]> =>
    pipe(
        sequence(either)(list),
        fold(
            () => {
                const separated: Separated<Array<Array<FeiloppsummeringFeil>>, BarnApi[]> = separate(list);
                const errors: Array<Array<FeiloppsummeringFeil>> = separated.left;
                return left(flatten(errors));
            },
            (r) => right(r)
        )
    );

export const doItAll = (
    listeAvBarnInfo: BarnInfo[],
    previousResultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>,
    didClickBeregn: boolean
): ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper> => {
    const listeAvBarnUtenInvalids: BarnInfo[] = listeAvBarnInfo.filter(outInvalidChildren);
    const listOfEitherErrorOrBarnApi: Either<FeiloppsummeringFeil[], BarnApi>[] = listeAvBarnUtenInvalids.map(
        validateBarnInfo
    );
    // TODO: tom liste => Right<[]> ? Verifiser at stemmer.
    const validationResult: Either<FeiloppsummeringFeil[], BarnApi[]> = extractEitherFromList(
        listOfEitherErrorOrBarnApi
    );

    const updatedResultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper> = fold<
        FeiloppsummeringFeil[],
        BarnApi[],
        ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>
    >(
        (errors: FeiloppsummeringFeil[]) => beregnButtonAndErrorSummary<FeiloppsummeringFeil[]>(errors),
        (barnApiListe: BarnApi[]) => {
            if (barnApiListe.length === 0) {
                return noValidChildrenOrange;
            }
            const omsorgsprinsipper: Omsorgsprinsipper = omsorgsdager(barnApiListe, false);
            return resultBox<Omsorgsprinsipper>(omsorgsprinsipper);
        }
    )(validationResult);

    return caseResultViewOf(
        () => empty,
        () => {
            if (didClickBeregn) {
                return updatedResultView;
            } else {
                return beregnButton;
            }
        },
        () => (didClickBeregn ? updatedResultView : previousResultView),
        () => updatedResultView,
        () => updatedResultView
    )(previousResultView);
};

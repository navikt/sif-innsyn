import { Value } from './types';
import * as React from 'react';
import { isBeregnButtonAndErrorSummary, ResultView } from './types/ResultView';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';

export function valueToFeilProps<T>(
    value: Value<T>,
    resultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>
): React.ReactNode | boolean {
    // TODO: Fix visning av riktige errors.
    return isBeregnButtonAndErrorSummary(resultView) ? <span>Has error</span> : undefined;
}

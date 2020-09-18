import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

const IntroTextView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn === 0 && (
            <FormBlock>
                <Normaltekst>
                    Kalkulatoren beregner hvor mange omsorgsdager du har ut fra svarene du oppgir. Det betyr at riktig
                    resultat er avhengig av at du gir riktige opplysninger. Kalkulatoren er ment som et hjelpeverktøy
                    for deg, og det er ikke et vedtak eller en bekreftelse fra NAV.
                </Normaltekst>
            </FormBlock>
        )}
    </>
);

export default IntroTextView;

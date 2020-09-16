import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import * as React from 'react';

const FlereBarnUtfyllingsInfoView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn > 1 && (
            <FormBlock>
                <AlertStripeInfo>Legg inn opplysninger for ett barn om gangen.</AlertStripeInfo>
            </FormBlock>
        )}
    </>
);

export default FlereBarnUtfyllingsInfoView;

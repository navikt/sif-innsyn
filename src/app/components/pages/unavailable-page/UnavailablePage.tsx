import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import bemUtils from '../../../utils/bemUtils';
import Box from '../../box/Box';
import Page from '../../page/Page';
import StepBanner from '../../step-banner/StepBanner';
import './unavailablePage.less';

const bem = bemUtils('introPage');

const link =
    'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=333802&languagecode=53&veiledertype=privatperson';

const UnavailablePage: React.FC = (): JSX.Element => {
    const title = 'Søknad om ekstra omsorgsdager';
    return (
        <Page className={bem.block} title={title} topContentRenderer={(): JSX.Element => <StepBanner text={title} />}>
            <Box margin="xxxl">
                <AlertStripeAdvarsel>
                    <p>
                        Den digitale søknaden for omsorgspenger er dessverre ikke tilgjengelig på grunn av teknisk feil.
                        Vi jobber med å løse feilen slik at du kan søke digitalt. Frem til vi får fikset dette, kan du
                        fylle ut vårt{' '}
                        <strong>
                            <Lenke href={link} target="_blank">
                                papirskjema for omsorgspenger
                            </Lenke>
                        </strong>
                        .
                    </p>
                    <p>Vi beklager.</p>
                </AlertStripeAdvarsel>
            </Box>
        </Page>
    );
};

export default UnavailablePage;

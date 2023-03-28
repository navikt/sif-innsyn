import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import getLenker from '../../lenker';
import intlHelper from '../../utils/intlUtils';
import Box from '../elements/box/Box';
import ExpandableInfo from '../expandable-content/ExpandableInfo';

interface Props {
    mode?: 'expandable-panel' | 'expandable-text' | 'text';
}

const InfoManglendeSøknad = ({ mode = 'text' }: Props) => {
    const intl = useIntl();
    const getExpandedContent = () => (
        <p>
            {intlHelper(intl, 'info.manglendeSøknad.text.3.a')}{' '}
            <Lenke href={getLenker(intl.locale).saksoversikt}>
                {intlHelper(intl, 'info.manglendeSøknad.text.3.b')}
            </Lenke>{' '}
            {intlHelper(intl, 'info.manglendeSøknad.text.3.c')}
        </p>
    );
    switch (mode) {
        case 'text':
            return <FormattedMessage tagName="p" id="intlHelper(intl, 'info.manglendeSøknad.shortInfo')" />;
        case 'expandable-panel':
            return <Ekspanderbartpanel tittel={intlHelper(intl, 'c')}>{getExpandedContent()}</Ekspanderbartpanel>;
        case 'expandable-text':
            return (
                <ExpandableInfo title={intlHelper(intl, 'info.manglendeSøknad.title')}>
                    {getExpandedContent()}
                    <Box padBottom="xl">
                        <AlertStripeAdvarsel>
                            <p>
                                Hvis du sendte inn din søknad 21. mars 2023, kan det være søknaden ikke vises her, men
                                du vil finne den på{' '}
                                <Lenke href="https://person.nav.no/mine-saker/">nav.no/mine-saker</Lenke>
                            </p>
                        </AlertStripeAdvarsel>
                    </Box>
                </ExpandableInfo>
            );
    }
};

export default InfoManglendeSøknad;

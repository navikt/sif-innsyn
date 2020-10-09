import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import getLenker from '../../lenker';
import intlHelper from '../../utils/intlUtils';
import ExpandableInfo from '../expandable-content/ExpandableInfo';

interface Props {
    mode?: 'expandable-panel' | 'expandable-text' | 'text';
}

const InfoManglendeSøknad = ({ mode = 'text' }: Props) => {
    const intl = useIntl();
    const getExpandedContent = () => (
        <>
            <FormattedMessage tagName="p" id="info.manglendeSøknad.text.1" />
            <FormattedMessage tagName="p" id="info.manglendeSøknad.text.2" />
            <p>
                {intlHelper(intl, 'info.manglendeSøknad.text.3.a')}{' '}
                <Lenke href={getLenker(intl.locale).saksoversikt}>
                    {intlHelper(intl, 'info.manglendeSøknad.text.3.b')}
                </Lenke>{' '}
                {intlHelper(intl, 'info.manglendeSøknad.text.3.c')}
            </p>
        </>
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
                </ExpandableInfo>
            );
    }
};

export default InfoManglendeSøknad;

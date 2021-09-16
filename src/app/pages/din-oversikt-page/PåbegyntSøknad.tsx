import Box from '../../components/elements/box/Box';
import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { useIntl } from 'react-intl';
import getLenker from '../../lenker';
import {
    getDateStringFromApiDateString,
    getDateTilSlettSøknadString,
    getTimeStringFromApiDateString,
} from '../../utils/dateUtils';
import SectionPanel from '../../components/section-panel/SectionPanel';
import LenkepanelUtenIkon from '../../components/lenkepanel-uten-ikon/LenkepanelUtenIkon';
import BlyantIkon from './blyantIkon';

interface Props {
    updatedTimestemp?: string;
}

const PåbegyntSøknad = ({ updatedTimestemp }: Props) => {
    const intl = useIntl();
    const dato = getDateStringFromApiDateString(updatedTimestemp);
    const tid = getTimeStringFromApiDateString(updatedTimestemp);
    const datoNårSlettes = getDateTilSlettSøknadString(updatedTimestemp);

    return (
        <SectionPanel
            illustration={<BlyantIkon />}
            illustrationPlacement="outside"
            title={intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.title')}>
            {dato && tid && (
                <>
                    <Box>{intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info`)}</Box>
                    <Box margin="m">
                        {intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info.1`, { datoNårSlettes })}
                    </Box>

                    <Box margin="xl">
                        <LenkepanelUtenIkon
                            href={getLenker().pleiepengerURL}
                            tittel={intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.lenkeTittel')}
                            tekst={intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info.2`, { dato, tid })}
                        />
                    </Box>
                </>
            )}
            {!dato && !tid && <Box>{intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.ingenPåbegynt')}</Box>}
        </SectionPanel>
    );
};

export default PåbegyntSøknad;

import Box from '../../components/elements/box/Box';
import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import getLenker from '../../lenker';
import { getDatoOgTidTilSlettSøknadString } from '../../utils/dateUtils';
import SectionPanel from '../../components/section-panel/SectionPanel';
import BlyantIkon from '../../svg/blyantIkon';
import Knappelenke from '../../components/knappelenke/Knappelenke';

interface Props {
    updatedTimestemp?: string;
}

const PåbegyntSøknad = ({ updatedTimestemp }: Props) => {
    const intl = useIntl();
    const datoNårSlettes = getDatoOgTidTilSlettSøknadString(updatedTimestemp);

    return (
        <SectionPanel
            illustration={<BlyantIkon />}
            illustrationPlacement="outside"
            title={intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.title')}>
            {datoNårSlettes && (
                <>
                    <Box>{intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info`, { datoNårSlettes })}</Box>

                    <Box margin="xl">
                        <Knappelenke mini type="hoved" href={getLenker().pleiepengerURL}>
                            <FormattedMessage id="page.dinOversikt.påbegyntSøknad.knappen" />
                        </Knappelenke>
                    </Box>
                </>
            )}
            {!datoNårSlettes && <Box>{intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.ingenPåbegynt')}</Box>}
        </SectionPanel>
    );
};

export default PåbegyntSøknad;

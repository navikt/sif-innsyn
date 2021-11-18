import React from 'react';
import Box from '../../components/elements/box/Box';
import intlHelper from '../../utils/intlUtils';
import { useIntl } from 'react-intl';
import getLenker from '../../lenker';
import { getDatoOgTidTilSlettSøknadString } from '../../utils/dateUtils';
import SectionPanel from '../../components/section-panel/SectionPanel';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import bemUtils from '../../utils/bemUtils';
import './påbegyntSøknad.less';

interface Props {
    updatedTimestemp?: string;
}
const bem = bemUtils('påbegyntSøknad');

const PåbegyntSøknad = ({ updatedTimestemp }: Props) => {
    const intl = useIntl();
    const datoNårSlettes = getDatoOgTidTilSlettSøknadString(updatedTimestemp);

    return (
        <SectionPanel title={intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.title')}>
            {datoNårSlettes && (
                <>
                    <LenkepanelBase href={getLenker().pleiepengerURL} border={true}>
                        <>
                            <div className={bem.element('content')}>
                                <div className={bem.element('title')}>
                                    {intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.info.title')}
                                </div>

                                {intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info`, { datoNårSlettes })}
                            </div>
                        </>
                    </LenkepanelBase>
                </>
            )}
            {!datoNårSlettes && <Box>{intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.ingenPåbegynt')}</Box>}
        </SectionPanel>
    );
};

export default PåbegyntSøknad;

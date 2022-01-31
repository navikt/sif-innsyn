import React from 'react';
import { useIntl } from 'react-intl';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Box from '../../../components/elements/box/Box';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import getLenker from '../../../lenker';
import bemUtils from '../../../utils/bemUtils';
import { getDatoOgTidTilSlettSøknadString } from '../../../utils/dateUtils';
import { Feature, isFeatureEnabled } from '../../../utils/featureToggleUtils';
import intlHelper from '../../../utils/intlUtils';
import './mellomlagringInfo.less';

interface Props {
    søknadUpdatedTimestemp?: string;
    endringUpdatedTimestamp?: string;
}
const bem = bemUtils('mellomlagringInfo');

const MellomlagringInfo = ({ søknadUpdatedTimestemp, endringUpdatedTimestamp }: Props) => {
    const intl = useIntl();
    const datoNårSøknadSlettes = getDatoOgTidTilSlettSøknadString(søknadUpdatedTimestemp);
    const datoNårEndringSlettes = getDatoOgTidTilSlettSøknadString(endringUpdatedTimestamp);

    const title = isFeatureEnabled(Feature.ENDRINGSDIALOG)
        ? intlHelper(intl, 'page.dinOversikt.påbegyntEndringEllerSøknad.title')
        : intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.title');

    const ingenEndringTekst = isFeatureEnabled(Feature.ENDRINGSDIALOG)
        ? intlHelper(intl, 'page.dinOversikt.påbegyntEndringEllerSøknad.ingenPåbegynt')
        : intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.ingenPåbegynt');

    return (
        <SectionPanel title={title}>
            {datoNårSøknadSlettes && (
                <div className={bem.block}>
                    <LenkepanelBase href={getLenker().pleiepengerURL} border={true}>
                        <div className={bem.element('content')}>
                            <div className={bem.element('title')}>
                                {intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.info.title')}
                            </div>

                            {intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info`, {
                                datoNårSlettes: datoNårSøknadSlettes,
                            })}
                        </div>
                    </LenkepanelBase>
                </div>
            )}
            {datoNårEndringSlettes && (
                <div className={bem.block}>
                    <LenkepanelBase href={getLenker().endringsdialogPleiepenger} border={true}>
                        <div className={bem.element('content')}>
                            <div className={bem.element('title')}>
                                {intlHelper(intl, 'page.dinOversikt.påbegyntEndringsmelding.info.title')}
                            </div>

                            {intlHelper(intl, `page.dinOversikt.påbegyntEndringsmelding.info`, {
                                datoNårSlettes: datoNårSøknadSlettes,
                            })}
                        </div>
                    </LenkepanelBase>
                </div>
            )}
            {!datoNårSøknadSlettes && !datoNårEndringSlettes && <Box>{ingenEndringTekst}</Box>}
        </SectionPanel>
    );
};

export default MellomlagringInfo;

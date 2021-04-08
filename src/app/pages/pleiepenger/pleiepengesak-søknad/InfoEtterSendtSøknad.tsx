import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Box from '../../../components/elements/box/Box';
import Title from '../../../components/elements/title/Title';
import ProcessDescription from '../../../components/process-description/ProcessDescription';
import getLenker from '../../../lenker';
import intlHelper from '../../../utils/intlUtils';
import FormattedHtmlMessage from '../../../components/formatted-html-message/FormattedHtmlMessage';
import Knappelenke from '../../../components/knappelenke/Knappelenke';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import './pleiepengesakSøknad.less';

interface StepProps {
    title: string | JSX.Element;
    children?: React.ReactNode;
}

const Step = ({ title, children }: StepProps): JSX.Element => (
    <div>
        <Title tag="h3" titleType="element">
            {title}
        </Title>
        {children && <Box margin="s">{children}</Box>}
    </div>
);

interface Props {
    harArbeidsgiver: boolean;
}

const InfoEtterSendtSøknad = ({ harArbeidsgiver }: Props) => {
    const intl = useIntl();
    const lenker = getLenker(intl.locale);

    return (
        <>
            <SectionPanel>
                <Box>
                    <Title>{intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.title')}</Title>
                    <Box margin="xl">
                        <ProcessDescription
                            steps={[
                                <Step
                                    key="legeerklæring"
                                    title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step1.title')}>
                                    <p>
                                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step1.text.1" />
                                    </p>
                                </Step>,
                                <Step
                                    key="inntektsmelding"
                                    title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step2.title')}>
                                    <FormattedHtmlMessage
                                        tagName="p"
                                        id="page.pleiepengesakSøknad.infoEtterSøknad.step2.text.title"
                                    />
                                    <FormattedHtmlMessage
                                        tagName="p"
                                        id="page.pleiepengesakSøknad.infoEtterSøknad.step2.text.title.2"
                                    />
                                </Step>,
                                <Step
                                    key="behandling"
                                    title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step3.title')}>
                                    <p>
                                        {harArbeidsgiver ? (
                                            <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step3.text.1" />
                                        ) : (
                                            <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step3.text.2" />
                                        )}
                                    </p>
                                </Step>,

                                <Step
                                    key="svar"
                                    title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step4.title.1')}>
                                    <p>
                                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step4.title.2" />{' '}
                                        <Lenke href={lenker.ettersending}>
                                            {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step4.title.3')}
                                        </Lenke>{' '}
                                        {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step4.title.4')}
                                    </p>
                                </Step>,
                                <Step
                                    key="saksoversikt"
                                    title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step5.title')}>
                                    {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step5.info.1')}{' '}
                                    <Lenke href={getLenker().dineUtbetalinger}>
                                        {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step5.lenkeTitel')}
                                    </Lenke>{' '}
                                    {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step5.info.2')}
                                </Step>,
                            ]}
                        />
                    </Box>
                </Box>
            </SectionPanel>
            <SectionPanel>
                <Box>
                    <Title>{intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.melde.title')}</Title>
                    <Box margin="l">
                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.melde.text.1" />{' '}
                        <Lenke href={getLenker().endringerDuMåGiBeskjedOm}>
                            {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.melde.lenkeTitel')}
                        </Lenke>
                        <Box margin="l">
                            <Knappelenke href={getLenker().minInnboksSkrivMelding}>
                                <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.melde.knappTitle" />
                            </Knappelenke>
                        </Box>
                    </Box>
                </Box>
            </SectionPanel>
        </>
    );
};

export default InfoEtterSendtSøknad;

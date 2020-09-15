import * as React from 'react';
import KalkulatorLogoAndTitle from './ReducerKalkulator/components/KalkulatorLogoAndTitle';
import { getRouteUrl, RouteConfig } from '../config/routeConfig';
import { FormattedMessage } from 'react-intl';
import Knappelenke from '@navikt/sif-common-core/lib/components/knappelenke/Knappelenke';
import InnsynPage from '../components/innsyn-page/InnsynPage';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { Element } from 'nav-frontend-typografi';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import Box from '@navikt/sif-common-core/lib/components/box/Box';

const bem = bemUtils('omsorgsdagerkalkulator');

const KalkulatorInfoRoute = () => {
    return (
        <InnsynPage>
            <KalkulatorLogoAndTitle />
            <FormBlock paddingBottom={'l'} margin={'m'}>
                <div className={bem.element('flex-center')}>
                    <div>
                        <Box padBottom={'l'}>
                            <Element>
                                Her kan du regne ut hvor mange omsorgsdager du kan ha rett på fra 1. juli 2020 –
                                31.12.20
                            </Element>
                        </Box>
                        <div>
                            <strong>NB!</strong> Kalkulatoren tar <strong>ikke</strong> hensyn til midlertidige
                            omsorgsdager du eventuelt har fått på grunn av koronasituasjonen.
                        </div>
                    </div>
                </div>
            </FormBlock>
            <FormBlock>
                Kalkulatoren er for deg som barnet bor fast hos. Det vil si der barnet har folkeregistrert adresse. Hvis
                foreldrene ikke bor sammen, men har en avtale om delt bosted, bor barnet fast hos begge.
            </FormBlock>
            <FormBlock>
                <div>Hvis du er samværsforelder som har</div>
                <ul>
                    <li>fått omsorgsdager fra den andre forelderen</li>
                    <li>egne barn som bor fast hos deg</li>
                </ul>
                <div>
                    beregner kalkulatoren hvor mange omsorgsdager du har for egne barn som bor fast hos deg. Du plusser
                    selv på antall omsorgsdager du har fått fra den andre forelderen.
                </div>
            </FormBlock>
            <FormBlock>
                Kalkulatoren vil ikke fungere for deg som er samværsforelder og ikke har egne barn som bor fast hos deg.
            </FormBlock>
            <FormBlock margin={'l'}>
                <div className={bem.element('flex-center')}>
                    <Knappelenke type={'hoved'} href={getRouteUrl(RouteConfig.KALKULATOR)}>
                        <FormattedMessage id="gotoApplicationLink.lenketekst" />
                    </Knappelenke>
                </div>
            </FormBlock>
        </InnsynPage>
    );
};

export default KalkulatorInfoRoute;

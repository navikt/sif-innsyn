import React from 'react';
import uniq from 'lodash.uniq';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Box from '../../../components/elements/box/Box';
import LenkepanelMedIkon from '../../../components/lenkepanel-med-ikon/LenkepanelMedIkon';
import { RouteConfig } from '../../../config/routeConfig';
import { SøknadsIkon } from '../../../svg/FellesIkoner';
import { Søknad, Søknadstype } from '../../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../../types/types';
import { getSakstypeTitle } from '../../../utils/sakstypeUtils';
import { søknadTypeErPleiepenger } from '../../../utils/soknadUtils';
import { IntlShape, useIntl } from 'react-intl';

interface Props {
    søknader: Søknad[];
}

const getSakstypeLenkepanelInfo = (sakstype: Sakstype, intl: IntlShape): SakstypeLenkepanelInfo => {
    switch (sakstype) {
        case Sakstype.PLEIEPENGER:
            return {
                href: RouteConfig.DINE_PLEIEPENGER,
                tittel: getSakstypeTitle(intl, sakstype),
            };
    }
};

interface SakstypeLenkepanelInfo {
    href: string;
    tittel: string;
}

interface SakstypeLenkepanelProps {
    sakstype: Sakstype;
}

const SakstypeLenkepanel = ({ sakstype }: SakstypeLenkepanelProps) => {
    const intl = useIntl();
    const { tittel, href } = getSakstypeLenkepanelInfo(sakstype, intl);
    return <LenkepanelMedIkon ikon={<SøknadsIkon />} href={href} tittel={tittel} />;
};

const DineSakerListe = ({ søknader }: Props) => {
    const søknadstyper: Søknadstype[] | undefined = uniq(søknader.map((value) => value.søknadstype));
    const harPleiepenger = søknadstyper?.filter((type) => søknadTypeErPleiepenger(type)).length !== 0;

    if (søknader.length === 0) {
        return (
            <Box padBottom="l">
                <AlertStripeInfo>Vi finner ingen saker fra deg</AlertStripeInfo>
            </Box>
        );
    }

    return <>{harPleiepenger && <SakstypeLenkepanel sakstype={Sakstype.PLEIEPENGER} />}</>;
};

export default DineSakerListe;

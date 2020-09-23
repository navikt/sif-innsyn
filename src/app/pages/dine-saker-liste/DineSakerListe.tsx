import React from 'react';
import uniq from 'lodash.uniq';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import LenkepanelMedIkon from '../../components/lenkepanel-med-ikon/LenkepanelMedIkon';
import { RouteConfig } from '../../config/routeConfig';
import { SøknadsIkon } from '../../svg/FellesIkoner';
import { Søknad, Søknadstype } from '../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../types/types';
import { søknadTypeErPleiepenger } from '../../utils/soknadUtils';

interface Props {
    søknader: Søknad[];
}

const getSakstypeLenkepanelInfo = (sakstype: Sakstype): SakstypeLenkepanelInfo => {
    switch (sakstype) {
        case Sakstype.DINE_PLEIEPENGER:
            return {
                href: RouteConfig.DINE_PLEIEPENGER,
                tittel: 'Pleiepenger for sykt barn',
            };
        case Sakstype.DINE_OMSORGSPENGER:
            return {
                href: RouteConfig.DINE_OMSORGSPENGER,
                tittel: 'Utvidet rett om omsorgspenger',
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
    const { tittel, href } = getSakstypeLenkepanelInfo(sakstype);
    return <LenkepanelMedIkon ikon={<SøknadsIkon />} href={href} tittel={tittel} />;
};

const DineSakerListe = ({ søknader }: Props) => {
    const søknadstyper: Søknadstype[] | undefined = uniq(søknader.map((value) => value.søknadstype));
    const harPleiepenger = søknadstyper?.filter((type) => søknadTypeErPleiepenger(type)).length !== 0;

    if (søknader.length === 0) {
        return <AlertStripeInfo>Vi finner ingen saker fra deg</AlertStripeInfo>;
    }

    return <>{harPleiepenger && <SakstypeLenkepanel sakstype={Sakstype.DINE_PLEIEPENGER} />}</>;
};

export default DineSakerListe;

import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import LenkepanelMedIkon from '../../../components/lenkepanel-med-ikon/LenkepanelMedIkon';
import { InnsynRouteConfig } from '../../../config/innsynRouteConfig';
import { SøknadsIkon } from '../../../svg/FellesIkoner';
import { Sakstype } from '../../../types/types';
import { getSakstypeTitle } from '../../../utils/sakstypeUtils';

interface Props {
    sakstyper: Sakstype[];
}

const getSakstypeLenkepanelInfo = (sakstype: Sakstype, intl: IntlShape): SakstypeLenkepanelInfo => {
    switch (sakstype) {
        case Sakstype.PLEIEPENGER:
            return {
                href: InnsynRouteConfig.DINE_PLEIEPENGER,
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

const DineSakerListe = ({ sakstyper }: Props) => {
    return (
        <>
            {sakstyper.map((sakstype) => (
                <SakstypeLenkepanel key={sakstype} sakstype={sakstype} />
            ))}
        </>
    );
};

export default DineSakerListe;

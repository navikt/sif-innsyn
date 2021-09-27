import React, { useState } from 'react';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { InnsynRouteConfig } from '../../config/innsynRouteConfig';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import SectionPanel from '../../components/section-panel/SectionPanel';
import { groupByYear } from '../../utils/sortSoknader';
import Box from '../../components/elements/box/Box';
import SoknadList from '../../components/soknad-list/SoknadList';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import { erPleiepenger } from '../../utils/soknadUtils';
import Title from '../../components/elements/title/Title';
import { guid } from 'nav-frontend-js-utils';
import InfoToggleButton from '../../components/expandable-content/InfoToggleButton';
import CollapsableContainer from '../../components/expandable-content/CollapsableContainer';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import { PageKey } from '../../config/pageKey';
import { useIntl } from 'react-intl';
import intlHelper from '../../utils/intlUtils';
import bemUtils from '../../utils/bemUtils';
import './soknader.less';

const bem = bemUtils('soknader');

interface Props {
    søknader: Søknad[];
}

const Søknader = ({ søknader }: Props) => {
    const intl = useIntl();
    const [søknadFilter, setSøknadFilter] = useState<number | undefined>(12);
    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));
    const harSøknader = pleiepengesoknader.length > 0;
    const gruperteSøknader = groupByYear(pleiepengesoknader, søknadFilter);
    const [toggleContentId] = useState(guid());
    useLogSidevisning(PageKey.frontpage);
    const crumbs: Breadcrumb[] = [
        {
            route: InnsynRouteConfig.OVERSIKT,
            title: intlHelper(intl, 'page.søknader.crumbs.dinePP'),
        },
    ];
    return (
        <InnsynPage title={intlHelper(intl, 'page.søknader.tittle')} breadcrumbs={crumbs} focusOnContent={false}>
            <SectionPanel
                title={intlHelper(intl, 'page.søknader.tittle')}
                additionalInfo={<InfoManglendeSøknad mode="expandable-text" />}>
                {harSøknader && (
                    <CollapsableContainer isOpen={true} animated={true} ariaLive="polite">
                        {gruperteSøknader.map((group) => (
                            <Box margin="xl" key={group.år}>
                                <Title tag="h2" titleStyle="normal">
                                    {group.år}
                                </Title>
                                <Box margin="xl">
                                    <SoknadList søknader={group.søknader} link={InnsynRouteConfig.SØKNADER_SØKNAD} />
                                </Box>
                            </Box>
                        ))}
                    </CollapsableContainer>
                )}

                {harSøknader && pleiepengesoknader.length > 11 && (
                    <div className={bem.classNames(bem.block, bem.element('toggle_button'))}>
                        <InfoToggleButton
                            onToggle={() => setSøknadFilter(søknadFilter ? undefined : 12)}
                            isOpen={søknadFilter === undefined}
                            controlsId={toggleContentId}>
                            {intlHelper(intl, søknadFilter ? 'page.søknader.visAlle' : 'page.søknader.visMindre')}
                        </InfoToggleButton>
                    </div>
                )}
            </SectionPanel>
        </InnsynPage>
    );
};

export default Søknader;

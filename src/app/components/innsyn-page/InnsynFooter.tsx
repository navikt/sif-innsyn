import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Title from '../../components/elements/title/Title';
import getLenker from '../../lenker';
import bemUtils from '../../utils/bemUtils';
import './innsynFooter.less';

const bem = bemUtils('innsynFooter');

const InnsynFooter = () => {
    const lenker = getLenker();
    return (
        <aside className={'innsynFooter'} aria-label={'Relatert informasjon'}>
            <Title tag="h2" titleStyle="centerlined" titleType="undertittel">
                Du vil kanskje vite mer om
            </Title>
            <ul className={bem.element('lenker')}>
                <li>
                    <Lenke target="_blank" href={lenker.pleiepenger}>
                        Pleiepenger
                    </Lenke>
                </li>
                <li>
                    <Lenke target="_blank" href={lenker.saksbehandlingstid}>
                        Saksbehandlingstid
                    </Lenke>
                </li>
                <li>
                    <Lenke target="_blank" href={lenker.regelverkFolketrygden}>
                        Regelverk
                    </Lenke>
                </li>
                <li>
                    <Lenke target="_blank" href={lenker.klageInfo}>
                        Klage
                    </Lenke>
                </li>
            </ul>
        </aside>
    );
};

export default InnsynFooter;

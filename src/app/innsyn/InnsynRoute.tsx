import * as React from 'react';
import InnsynEssentialsLoader from './InnsynEssentialsLoader';
import InnsynView from './InnsynView';
import { Søkerdata } from '../types/søkerdataTypes';

const InnsynRoute: React.FC = (): JSX.Element => (
    <InnsynEssentialsLoader
        contentLoadedRenderer={(søkerdata: Søkerdata): JSX.Element => {
            // if (!søkerdata.person.myndig) { // TODO: Fix
            //     return <IkkeMyndigPage />;
            // }
            return <InnsynView søkerdata={søkerdata} />;
        }}
    />
);

export default InnsynRoute;

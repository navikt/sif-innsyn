import * as React from 'react';
import InnsynEssentialsLoader from './InnsynEssentialsLoader';
import InnsynView from './InnsynView';
import { Essentials } from '../types/types';

const InnsynRoute: React.FC = (): JSX.Element => (
    <InnsynEssentialsLoader
        contentLoadedRenderer={(essentials: Essentials): JSX.Element => {
            // if (!søkerdata.person.myndig) { // TODO: Fix
            //     return <IkkeMyndigPage />;
            // }
            return <InnsynView essentials={essentials} />;
        }}
    />
);

export default InnsynRoute;

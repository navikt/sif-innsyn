import * as React from 'react';
import InnsynPage from '../components/innsyn-page/InnsynPage';
import ReducerKalkulator from './ReducerKalkulator/ReducerKalkulator';

const KalkulatorRoute: React.FC = () => {
    return (
        <InnsynPage>
            <ReducerKalkulator />
        </InnsynPage>
    );
};

export default KalkulatorRoute;

import * as React from 'react';
import KalkulatorInput from 'omsorgspenger-kalkulator/lib/components/KalkulatorInput';
import InnsynPage from '../components/innsyn-page/InnsynPage';

const KalkulatorRoute: React.FC = () => {
    return (
        <InnsynPage>
            <KalkulatorInput />
        </InnsynPage>
    );
};

export default KalkulatorRoute;

import * as React from 'react';
import Fetchable from './Fetchable';
import { getApiUrlByResourceType } from '../utils/apiUtils';
import { ResourceType } from '../types/resourceTypes';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { SøkerValidator } from '../types/apiTypes/søkerTypes';
import FpSuccess from './FpSuccess';
import FpError from './FpError';
import Fetchable2 from './Fetchable2';
import { BarnResponseValidator } from '../types/apiTypes/barnTypes';
import FpSuccess2 from './FpSuccess2';

const søkerApiDescription = {
    url: getApiUrlByResourceType(ResourceType.SØKER),
    validator: SøkerValidator,
};

const barnApiDescription = {
    url: getApiUrlByResourceType(ResourceType.BARN),
    validator: BarnResponseValidator,
};

const FpEssentials: React.FC = () => {
    return (
        <>
            <Fetchable
                url={getApiUrlByResourceType(ResourceType.SØKER)}
                loading={() => <LoadingPage />}
                error={(e) => <FpError error={e} />}
                success={(søker) => <FpSuccess data={søker} />}
                validator={SøkerValidator}
            />
            <div>-----------------------------</div>
            <Fetchable2
                t1recipe={søkerApiDescription}
                t2recipe={barnApiDescription}
                loading={() => <LoadingPage />}
                error={(e) => <FpError error={e} />}
                success={(essentialsData2) => <FpSuccess2 data={essentialsData2} />}
            />
        </>
    );
};

export default FpEssentials;

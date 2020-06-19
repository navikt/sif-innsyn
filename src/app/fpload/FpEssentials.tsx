import * as React from 'react';
import Fetchable from './Fetchable';
import { getApiUrlByResourceType } from '../utils/apiUtils';
import { ResourceType } from '../types/resourceTypes';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { SøkerValidator } from '../types/apiTypes/søkerTypes';
import FpSuccess from './FpSuccess';
import FpError from './FpError';

const FpEssentials: React.FC = () => {
    return (
        <Fetchable
            url={getApiUrlByResourceType(ResourceType.SØKER)}
            loading={() => <LoadingPage />}
            error={(e) => <FpError error={e} />}
            success={(søker) => <FpSuccess søker={søker} />}
            validator={SøkerValidator}
        />
    );
};

export default FpEssentials;

import * as React from 'react';
import { SøkerP, søkerRecipe } from '../types/apiTypes/søkerTypes';
import { BarnP, barnRecipe } from '../types/apiTypes/barnTypes';
import { ArbeidsgiverP, arbeidsgiverRecipe } from '../types/apiTypes/arbeidsgiverTypes';
import FpFetcherSuccessView from './FpFetcherSuccessView';
import FpError from './FpError';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import Fetcher3 from './fetcher/Fetcher3';

const FpEssentials: React.FC = () => {
    return (
        <>
            {/*<div>-----------------------------</div>*/}
            {/*<Fetcher<SøkerP>*/}
            {/*    recipies={[søkerRecipe]}*/}
            {/*    loading={() => <LoadingPage />}*/}
            {/*    error={(e) => <FpError error={e} />}*/}
            {/*    success={([søker]: [SøkerP]) => <FpFetcherSuccessView fetchedData={søker} />}*/}
            {/*/>*/}
            {/*<div>-----------------------------</div>*/}
            {/*<Fetcher2<SøkerP, BarnP>*/}
            {/*    recipies={[søkerRecipe, barnRecipe]}*/}
            {/*    loading={() => <LoadingPage />}*/}
            {/*    error={(e) => <FpError error={e} />}*/}
            {/*    success={(data: [SøkerP, BarnP]) => <FpFetcherSuccessView fetchedData={data} />}*/}
            {/*/>*/}
            {/*<div>-----------------------------</div>*/}
            <Fetcher3<SøkerP, BarnP, ArbeidsgiverP>
                recipies={[søkerRecipe, barnRecipe, arbeidsgiverRecipe]}
                loading={() => <LoadingPage />}
                error={(e) => <FpError error={e} />}
                success={(data: [SøkerP, BarnP, ArbeidsgiverP]) => <FpFetcherSuccessView fetchedData={data} />}
            />
        </>
    );
};

export default FpEssentials;

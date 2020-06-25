import * as React from 'react';
import { SøkerApiResponse, SøkerP, søkerRecipe } from '../../../types/apiTypes/søkerTypes';
import FpFetcherSuccessView from './FpFetcherSuccessView';
import FpError from './FpError';
import LoadingPage from '../../../components/pages/loading-page/LoadingPage';
import { BarnApiResponse, BarnP, barnRecipe } from '../../../types/apiTypes/barnTypes';
import Fetcher2 from '../Fetcher2';
import Fetcher from '../Fetcher';
import Fetcher3 from '../Fetcher3';
import { ArbeidsgiverApiResponse, ArbeidsgiverP, arbeidsgiverRecipe } from '../../../types/apiTypes/arbeidsgiverTypes';

const FpEssentialsExample: React.FC = () => {
    return (
        <>
            <div>-----------------------------</div>
            {/* Fetch 1 ressurs */}
            <Fetcher<SøkerP, SøkerApiResponse>
                recipies={[søkerRecipe]}
                loading={() => <LoadingPage />}
                error={(e: Error) => <FpError error={e} />}
                success={([søkerApiResponse]: [SøkerApiResponse]) => (
                    <FpFetcherSuccessView søkerApiResponse={søkerApiResponse} />
                )}
            />
            <div>-----------------------------</div>
            {/* Fetch 2 ressurser */}
            <Fetcher2<SøkerP, SøkerApiResponse, BarnP, BarnApiResponse>
                recipies={[søkerRecipe, barnRecipe]}
                loading={() => <LoadingPage />}
                error={(e: Error) => <FpError error={e} />}
                success={([søkerApiResponse, barnApiResponse]: [SøkerApiResponse, BarnApiResponse]) => (
                    <FpFetcherSuccessView søkerApiResponse={søkerApiResponse} barnApiResponse={barnApiResponse} />
                )}
            />
            <div>-----------------------------</div>
            {/* Fetch 3 ressurser */}
            <Fetcher3<SøkerP, SøkerApiResponse, BarnP, BarnApiResponse, ArbeidsgiverP, ArbeidsgiverApiResponse>
                recipies={[søkerRecipe, barnRecipe, arbeidsgiverRecipe]}
                loading={() => <LoadingPage />}
                error={(e: Error) => <FpError error={e} />}
                success={([søkerApiResponse, barnApiResponse, arbeidsgiverApiResponse]: [
                    SøkerApiResponse,
                    BarnApiResponse,
                    ArbeidsgiverApiResponse
                ]) => (
                    <FpFetcherSuccessView
                        søkerApiResponse={søkerApiResponse}
                        barnApiResponse={barnApiResponse}
                        arbeidsgiverApiResponse={arbeidsgiverApiResponse}
                    />
                )}
            />
            <div>-----------------------------</div>
        </>
    );
};

export default FpEssentialsExample;

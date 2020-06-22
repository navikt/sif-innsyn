import * as React from 'react';
import { SøkerApiResponse, SøkerP, søkerRecipe } from '../types/apiTypes/søkerTypes';
import FpFetcherSuccessView from './FpFetcherSuccessView';
import FpError from './FpError';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { BarnApiResponse, BarnP, barnRecipe } from '../types/apiTypes/barnTypes';
import Fetcher2 from './fetcher/Fetcher2';
import Fetcher from './fetcher/Fetcher';
import Fetcher3 from './fetcher/Fetcher3';
import { ArbeidsgiverApiResponse, ArbeidsgiverP, arbeidsgiverRecipe } from '../types/apiTypes/arbeidsgiverTypes';

const FpEssentials: React.FC = () => {
    return (
        <>
            <div>-----------------------------</div>
            <Fetcher<SøkerP, SøkerApiResponse>
                recipies={[søkerRecipe]}
                loading={() => <LoadingPage />}
                error={(e: Error) => <FpError error={e} />}
                success={([søkerApiResponse]: [SøkerApiResponse]) => (
                    <FpFetcherSuccessView søkerApiResponse={søkerApiResponse} />
                )}
            />
            <div>-----------------------------</div>
            <Fetcher2<SøkerP, SøkerApiResponse, BarnP, BarnApiResponse>
                recipies={[søkerRecipe, barnRecipe]}
                loading={() => <LoadingPage />}
                error={(e: Error) => <FpError error={e} />}
                success={([søkerApiResponse, barnApiResponse]: [SøkerApiResponse, BarnApiResponse]) => (
                    <FpFetcherSuccessView søkerApiResponse={søkerApiResponse} barnApiResponse={barnApiResponse} />
                )}
            />
            <div>-----------------------------</div>
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

export default FpEssentials;

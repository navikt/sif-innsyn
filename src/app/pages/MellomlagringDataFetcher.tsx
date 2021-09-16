import React from 'react';
import Fetcher from '../functional/fetcher/Fetcher';
import LoadingPage from './support-pages/LoadingPage';
import { MellomlagringApiResponse, mellomlagringRecipe } from '../types/apiTypes/mellomlagringTypes';
import PåbegyntSøknad from './din-oversikt-page/PåbegyntSøknad';

const MellomlagringDataFetcher = () => {
    return (
        <Fetcher<MellomlagringApiResponse>
            recipies={[mellomlagringRecipe]}
            loading={() => <LoadingPage />}
            error={() => {
                //return <PåbegyntSøknad />;
                return <></>;
            }}
            success={([mellomlagringApiResponse]: [MellomlagringApiResponse]) => {
                return <PåbegyntSøknad updatedTimestemp={mellomlagringApiResponse.metadata.updatedTimestemp} />;
            }}
        />
    );
};

export default MellomlagringDataFetcher;

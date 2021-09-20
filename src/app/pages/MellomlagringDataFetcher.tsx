import React from 'react';
import Fetcher from '../functional/fetcher/Fetcher';
import LoadingPage from './support-pages/LoadingPage';
import { MellomlagringApiResponse, mellomlagringRecipe } from '../types/apiTypes/mellomlagringTypes';
import PåbegyntSøknad from './din-oversikt-page/PåbegyntSøknad';
import Box from '../components/elements/box/Box';

const MellomlagringDataFetcher = () => {
    return (
        <Fetcher<MellomlagringApiResponse>
            recipies={[mellomlagringRecipe]}
            loading={() => <LoadingPage />}
            error={() => {
                return (
                    <Box margin="l">
                        <></>
                    </Box>
                );
            }}
            success={([mellomlagringApiResponse]: [MellomlagringApiResponse]) => {
                return <PåbegyntSøknad updatedTimestemp={mellomlagringApiResponse.metadata.updatedTimestemp} />;
            }}
        />
    );
};

export default MellomlagringDataFetcher;

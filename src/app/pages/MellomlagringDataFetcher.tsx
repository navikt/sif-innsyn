import React from 'react';
import {
    MellomlagringEndringApiResponse,
    mellomlagringEndringRecipe,
    MellomlagringSøknadApiResponse,
    mellomlagringSøknadRecipe,
} from '../types/apiTypes/mellomlagringTypes';
import MellomlagringInfo from './din-oversikt-page/mellomlagring-info/MellomlagringInfo';
import Fetcher2 from '../functional/fetcher/Fetcher2';
import Box from '../components/elements/box/Box';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';
import { Feature, isFeatureEnabled } from '../utils/featureToggleUtils';
import Fetcher from '../functional/fetcher/Fetcher';

const MellomlagringDataFetcher = () => {
    if (isFeatureEnabled(Feature.ENDRINGSDIALOG)) {
        return (
            <Fetcher2<MellomlagringSøknadApiResponse, MellomlagringEndringApiResponse>
                recipies={[mellomlagringSøknadRecipe, mellomlagringEndringRecipe]}
                loading={() => (
                    <Box margin="xl" padBottom="xl">
                        <LoadingSpinner />
                    </Box>
                )}
                error={() => {
                    console.log('fetch mellomlagring feilet');
                    return <></>;
                }}
                success={([mellomlagretSøknad, mellomlagretEndring]: [
                    MellomlagringSøknadApiResponse,
                    MellomlagringEndringApiResponse
                ]) => {
                    if (
                        mellomlagretSøknad.metadata?.updatedTimestemp ||
                        mellomlagretEndring.metadata?.updatedTimestemp
                    ) {
                        return (
                            <MellomlagringInfo
                                søknadUpdatedTimestemp={mellomlagretSøknad.metadata?.updatedTimestemp}
                                endringUpdatedTimestamp={mellomlagretEndring.metadata?.updatedTimestemp}
                            />
                        );
                    }
                    return <></>;
                }}
            />
        );
    }
    return (
        <Fetcher<MellomlagringSøknadApiResponse>
            recipies={[mellomlagringSøknadRecipe]}
            loading={() => (
                <Box margin="xl" padBottom="xl">
                    <LoadingSpinner />
                </Box>
            )}
            error={() => {
                return <></>;
            }}
            success={([mellomlagretSøknad]: [MellomlagringSøknadApiResponse]) => {
                if (mellomlagretSøknad.metadata?.updatedTimestemp) {
                    return <MellomlagringInfo søknadUpdatedTimestemp={mellomlagretSøknad.metadata.updatedTimestemp} />;
                }
                return <></>;
            }}
        />
    );
};

export default MellomlagringDataFetcher;

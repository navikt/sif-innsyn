import * as React from 'react';
import { getApiUrlByResourceType } from '../utils/apiUtils';
import { ResourceType } from '../types/resourceTypes';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { Søker, SøkerValidator } from '../types/apiTypes/søkerTypes';
import FpError from './FpError';
import { BarnFp, BarnResponseValidator } from '../types/apiTypes/barnTypes';
import { ArbeidsgiverFp, ArbeidsgiverResponseValidator } from '../types/apiTypes/arbeidsgiverTypes';
import Fetcher from './Fetcher';
import FpFetcherSuccessView from './FpFetcherSuccessView';

const søkerApiDescription = {
    url: getApiUrlByResourceType(ResourceType.SØKER),
    validator: SøkerValidator,
};

const barnApiDescription = {
    url: getApiUrlByResourceType(ResourceType.BARN),
    validator: BarnResponseValidator,
};

const arbeidsgiverDescription = {
    url: getApiUrlByResourceType(ResourceType.ARBEIDSGIVER),
    validator: ArbeidsgiverResponseValidator,
};

const FpEssentials: React.FC = () => {
    return (
        <>
            {/*<Fetchable*/}
            {/*    url={getApiUrlByResourceType(ResourceType.SØKER)}*/}
            {/*    loading={() => <LoadingPage />}*/}
            {/*    error={(e) => <FpError error={e} />}*/}
            {/*    success={(søker) => <FpSuccess data={søker} />}*/}
            {/*    validator={SøkerValidator}*/}
            {/*/>*/}
            {/*<div>-----------------------------</div>*/}
            {/*<Fetchable2*/}
            {/*    t1recipe={søkerApiDescription}*/}
            {/*    t2recipe={barnApiDescription}*/}
            {/*    loading={() => <LoadingPage />}*/}
            {/*    error={(e) => <FpError error={e} />}*/}
            {/*    success={(essentialsData2) => (*/}
            {/*        <FpSuccess2 søker={essentialsData2.t1} listeAvBarn={essentialsData2.t2.barn} />*/}
            {/*    )}*/}
            {/*/>*/}
            {/*<div>-----------------------------</div>*/}
            {/*<Fetchable3*/}
            {/*    t1recipe={søkerApiDescription}*/}
            {/*    t2recipe={barnApiDescription}*/}
            {/*    t3recipe={arbeidsgiverDescription}*/}
            {/*    loading={() => <LoadingPage />}*/}
            {/*    error={(e) => <FpError error={e} />}*/}
            {/*    success={(essentialsData3) => (*/}
            {/*        <FpSuccess3*/}
            {/*            søker={essentialsData3.t1}*/}
            {/*            listeAvBarn={essentialsData3.t2.barn}*/}
            {/*            organisasjoner={essentialsData3.t3.organisasjoner}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*/>*/}
            <div>-----------------------------</div>
            <Fetcher
                fetch={[søkerApiDescription, barnApiDescription, arbeidsgiverDescription]}
                loading={() => <LoadingPage />}
                error={(e) => <FpError error={e} />}
                success={([søker, barnFp, arbeidsgiver]: [Søker, BarnFp, ArbeidsgiverFp]) => (
                    <FpFetcherSuccessView søker={søker} listeAvBarn={barnFp} organisasjoner={arbeidsgiver} />
                )}
            />
        </>
    );
};

export default FpEssentials;

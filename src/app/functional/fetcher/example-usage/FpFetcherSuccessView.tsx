import * as React from 'react';
import ReactJson from 'react-json-view';
import { BarnApiResponse } from '../../../types/apiTypes/barnTypes';
import { SøkerApiResponse } from '../../../types/apiTypes/søkerTypes';
import { ArbeidsgiverApiResponse } from '../../../types/apiTypes/arbeidsgiverTypes';

interface Props {
    søkerApiResponse?: SøkerApiResponse;
    barnApiResponse?: BarnApiResponse;
    arbeidsgiverApiResponse?: ArbeidsgiverApiResponse;
}

const FpFetcherSuccessView: React.FC<Props> = ({
    søkerApiResponse,
    barnApiResponse,
    arbeidsgiverApiResponse,
}: Props) => {
    return (
        <div>
            <div>Data:</div>
            {søkerApiResponse && <ReactJson src={søkerApiResponse} />}
            {barnApiResponse && <ReactJson src={barnApiResponse} />}
            {arbeidsgiverApiResponse && <ReactJson src={arbeidsgiverApiResponse} />}
        </div>
    );
};

export default FpFetcherSuccessView;

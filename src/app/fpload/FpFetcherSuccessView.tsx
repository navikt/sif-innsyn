import * as React from 'react';
import ReactJson from 'react-json-view';

interface Props {
    fetchedData: any;
}

const FpFetcherSuccessView: React.FC<Props> = ({ fetchedData }: Props) => {
    return (
        <div>
            <div>Data:</div>
            <ReactJson src={fetchedData} />
        </div>
    );
};

export default FpFetcherSuccessView;

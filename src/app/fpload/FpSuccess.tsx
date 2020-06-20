import * as React from 'react';

interface Props {
    data: any;
}

const FpSuccess: React.FC<Props> = ({ data }: Props) => {
    return <div>Søker: {JSON.stringify(data, null, 4)}</div>;
};

export default FpSuccess;

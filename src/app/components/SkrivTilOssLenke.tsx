import Lenke from 'nav-frontend-lenker';
import React from 'react';
import getLenker from '../lenker';

interface Props {
    label?: string;
}
const SkrivTilOssLenke = ({ label }: Props) => {
    return <Lenke href={getLenker().skrivTilOss}>{label || 'Gå til Skriv til oss'}</Lenke>;
};

export default SkrivTilOssLenke;

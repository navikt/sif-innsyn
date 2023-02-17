import Lenke from 'nav-frontend-lenker';
import React from 'react';
import getLenker from '../lenker';

const SkrivTilOssLenke = () => {
    return <Lenke href={getLenker().skrivTilOss}>Skriv til oss</Lenke>;
};

export default SkrivTilOssLenke;

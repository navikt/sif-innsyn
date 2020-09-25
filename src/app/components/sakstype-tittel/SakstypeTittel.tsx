import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Sakstype } from '../../types/types';

interface Props {
    sakstype: Sakstype;
}

const SakstypeTittel = ({ sakstype }: Props) => <FormattedMessage id={`sakstype.${sakstype}.tittel`} />;

export default SakstypeTittel;

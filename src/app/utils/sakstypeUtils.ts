import { IntlShape } from 'react-intl';
import { Sakstype } from '../types/types';
import intlHelper from './intlUtils';

export const getSakstypeTitle = (intl: IntlShape, sakstype: Sakstype): string => {
    return intlHelper(intl, `sakstype.${sakstype}.title`);
};

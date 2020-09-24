import React, { ReactNode } from 'react';
import classnames from 'classnames';
import Lenke from 'nav-frontend-lenker';
import { Props as LenkeProps } from 'nav-frontend-lenker/lib/lenke';
import './knappelenke.less';

export type KnappeLenkeType = 'hoved' | 'standard' | 'fare';

interface Props extends LenkeProps {
    href: string;
    children: ReactNode;
    mini?: boolean;
    type?: KnappeLenkeType;
}

const Knappelenke = ({ href, type, mini, children, ...restProps }: Props) => (
    <Lenke
        href={href}
        className={classnames('knapp', `knapp--${type || 'standard'}`, 'knappelenke', mini ? 'knapp--mini' : '')}
        {...restProps}>
        <span>{children}</span>
    </Lenke>
);

export default Knappelenke;

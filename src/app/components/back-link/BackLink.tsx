import { VenstreChevron } from 'nav-frontend-chevron';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    to: string;
    children: React.ReactNode;
}

const BackLink = ({ to, children }: Props) => (
    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '-.25rem' }}>
        <span style={{ marginRight: '.25rem' }}>
            <VenstreChevron />
        </span>
        <Link to={to} className="lenke">
            {children}
        </Link>
    </span>
);

export default BackLink;

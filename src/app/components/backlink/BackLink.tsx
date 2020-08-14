import React from 'react';
import './BackLink.module.less';
import { ArrowBack } from '../../svg/FellesIkoner';
import { Link } from 'react-router-dom';

interface Props {
    href: string;
    tittel: string;
}

const BackLink: React.FC<Props> = ({ href, tittel }: Props) => (
    <div>
        <Link to={href}>
            <ArrowBack /> <span> {tittel}</span>
        </Link>
    </div>
);

export default BackLink;

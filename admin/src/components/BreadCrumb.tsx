import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

type TBreadCrumbProps = {
    homeElement: ReactNode;
    separator: ReactNode;
    containerClasses?: string;
    listClasses?: string;
    activeClasses?: string;
    capitalizeLinks?: boolean;
};

const BreadCrumb = ({
    homeElement,
    separator,
    capitalizeLinks,
}: TBreadCrumbProps) => {
    const location = useLocation();
    const paths = location.pathname;
    const pathNames = paths.split('/').filter((path) => path);

    return (
        <div>
            <ul style={{
                display:"flex",
                gap:"20px",
                listStyle:"none"
            }}>
                <li  >
                    <Link to="/">{homeElement}</Link>
                </li>
                {pathNames.length > 0 && separator}
                {pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`;
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1) : link;
                    return (
                        <React.Fragment key={index}>
                            <li >
                                <Link to={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default BreadCrumb;

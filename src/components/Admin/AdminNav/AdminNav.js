import React from 'react';
import './adminNav.scss';
import {Link, withRouter, useParams} from 'react-router-dom';
import classNames from 'classnames';

function AdminNav({match}) {
    const { itemID, page } = useParams();

    let firstLevelPath = match.path;

    if ( itemID ) {
        firstLevelPath = firstLevelPath.replace('/:itemID', '');
    }
    if ( page ) {
        firstLevelPath = firstLevelPath.replace('/:page', '');
    }

    const adminNavList = [
        {
            id: 0,
            title: 'Dashboard',
            link: '/admin',
            icon: 'fas fa-home'
        },
        {
            id: 1,
            title: 'Pages',
            link: '/admin-pages',
            icon: 'fas fa-file'
        },
        {
            id: 2,
            title: 'Uploads',
            link: '/admin-uploads',
            icon: 'fas fa-cloud-upload-alt'
        },
        {
            id: 3,
            title: 'Work',
            link: '/admin-work',
            icon: 'fas fa-laptop-code'
        },
        {
            id: 4,
            title: 'Life',
            link: '/admin-life',
            icon: 'fas fa-id-card'
        },
        {
            id: 5,
            title: 'Media',
            link: '/admin-media',
            icon: 'fas fa-camera-retro'
        }
    ];

    return (
        <nav className="adminNav">
            <ul className="adminNav__list">
                {
                    adminNavList.map(item => _renderNavItem(item))
                }
            </ul>
        </nav>
    );

    function _renderNavItem(item) {
        return (
            <li className="adminNav__list-item" key={item.id}>
                <Link className={classNames('adminNav__list-link', {active: item.link === firstLevelPath})} to={item.link}>
                    <div className="adminNav__list-icon">
                        <i className={ item.icon }/>
                    </div>
                    <div className="adminNav__list-text">
                        { item.title }
                    </div>
                </Link>
            </li>
        )
    }
}
export default withRouter(AdminNav);
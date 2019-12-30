import React, { useEffect } from 'react';
import './pagination.scss';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

function Pagination({totalCount, showPerPage, location, history}) {
    const currentPage = location.search ? location.search.replace('?p=', '') - 1 : 0;

    useEffect(() => {
        const totalControlsLength = Math.ceil(totalCount / showPerPage);

        if ( currentPage + 1 > totalControlsLength && totalControlsLength > 0 ) {
            setPage(totalControlsLength);
        }
    });

    return (
        <div className="pagination">
            {
                totalCount > showPerPage ?
                    createControls().map(item => _renderControl(item))
                    :
                    null
            }
        </div>
    );

    function _renderControl(item) {
        return (
            <div className={classNames('pagination__num', {isCurrent: currentPage === item - 1})} key={item} onClick={() => setPage(item)}>
                { item }
            </div>
        )
    }

    function createControls() {
        const newControls = [];

        for ( let i = 0; i < Math.ceil(totalCount / showPerPage); i++ ) {
            newControls.push(i + 1);
        }

        return newControls;
    }

    function setPage(newPage) {
        if ( currentPage !== newPage - 1 ) {
            if ( newPage === 1 ) {
                history.push(location.pathname);
            }
            else {
                history.push(location.pathname + '?p=' + newPage);
            }
        }
    }
}
export default withRouter(Pagination);
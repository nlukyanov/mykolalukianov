import React, { useState, useEffect } from 'react';
import './context.scss';
import classNames from 'classnames';

export default function Context({children, actions}) {
    const [ showContext, setShowContext ] = useState(false);
    const [ contextPos, setContextPos ] = useState({left: 0, top: 0});

    useEffect(() => {
        document.addEventListener('contextmenu', hideContext);
        document.addEventListener('click', hideContext);
        document.addEventListener('keyup', handleEsc);
        return () => {
            document.removeEventListener('contextmenu', hideContext);
            document.removeEventListener('click', hideContext);
            document.removeEventListener('keyup', handleEsc);
        }
    }, []);

    return (
        <div className={classNames('context', {isOpen: showContext})} onContextMenu={handleContextMenu}>
            { children }
            {
                showContext ?
                    <div className="context__menu" style={{left: contextPos.left, top: contextPos.top}}>
                        {
                            actions
                        }
                    </div>
                    :
                    null
            }
        </div>
    );

    function hideContext(e) {
        if ( !e.target.closest('.context') || !e.target.closest('.context').classList.contains('isOpen') ) {
            setShowContext(false);
        }
    }

    function handleContextMenu(e) {
        e.preventDefault();

        setContextPos({left: e.pageX, top: e.pageY});
        setTimeout(() => {
            setShowContext(true);
        }, 0);
    }

    function handleEsc(e) {
        if ( e.keyCode === 27 ) {
            setShowContext(false);
        }
    }
}
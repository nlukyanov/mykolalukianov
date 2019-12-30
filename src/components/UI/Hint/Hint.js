import React from 'react';
import './hint.scss';

export default function Hint({children, text}) {
    return (
        <div className="hint">
            <div className="hint__text">
                { text }
            </div>
            { children }
        </div>
    )
}
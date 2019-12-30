import React, {useEffect} from 'react';
import './confirm.scss';

export default function Confirm({message, onConfirm, onCancel}) {
    useEffect(() => {
        document.addEventListener('keyup', handleKeyup);
        return () => {
            document.removeEventListener('keyup', handleKeyup);
        }
    }, []);

    return (
        <div className="confirm">
            <div className="confirm__box">
                <div className="confirm__message">
                    { message }
                </div>
                <div className="confirm__actions">
                    <div className="btn btn-error" onClick={onCancel}>Cancel</div>
                    <div className="btn btn-primary" onClick={onConfirm}>Confirm</div>
                </div>
            </div>
        </div>
    );

    function handleKeyup(e) {
        if ( e.keyCode === 27 ) {
            onCancel();
        }
        if ( e.keyCode === 13 ) {
            onConfirm();
        }
    }
}
import React, { useEffect } from 'react';
import './modal.scss';
import Preloader from "../Preloader/Preloader";

export default function Modal({title, img, imgThumb, children, width, onHideModal}) {
    useEffect(() => {
        document.addEventListener('keyup', handleEsc);
        return () => {
            document.removeEventListener('keyup', handleEsc);
        }
    }, []);

    return (
        <div className="modal">
            <div className="modal__close" onClick={onHideModal}>
                <i className="fas fa-times"/>
            </div>
            <div className="modal__box" style={{maxWidth: width}}>
                {
                    img ?
                        <div className="modal__img">
                            {
                                img.url ?
                                    <Preloader/>
                                    :
                                    null
                            }
                            <img src={img.url} alt={img.alt}/>
                        </div>
                        :
                        null
                }
                {
                    title || children ?
                        <div className="modal__content">
                            {
                                title ?
                                    <div className="modal__title">{ title }</div>
                                    :
                                    null
                            }
                            { children ? children : null }
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );

    function handleEsc(e) {
        if ( e.keyCode === 27 ) {
            onHideModal();
        }
    }
}
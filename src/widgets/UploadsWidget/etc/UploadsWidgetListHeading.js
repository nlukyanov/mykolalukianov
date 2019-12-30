import React from 'react';

export default function UploadsWidgetListHeading({ isSelected, title, setShowConfirm }) {
    return (
        <div className="uploadsWidget__actions">
            <h2 className="uploadsWidget__heading">{ title }</h2>
            { _renderWidgetItemsActions() }
        </div>
    );

    function _renderWidgetItemsActions() {
        return (
            isSelected.length ?
                <div className="error uploadsWidget__actions-item" onClick={() => setShowConfirm(true)}>
                    <i className="fas fa-trash"/>
                    Remove
                </div>
                :
                null
        )
    }
}
import React  from 'react';
import withUploadsItem from "../HOCS/withUploadsImage";
import Confirm from "../../../components/UI/Confirm/Confirm";
import Modal from "../../../components/UI/Modal/Modal";
import Preloader from "../../../components/UI/Preloader/Preloader";
import Context from "../../../components/UI/Context/Context";
import classNames from 'classnames';

function UploadsWidgetImage(
{
    itemURL,
    item,
    handleDeleteItem,
    showConfirm,
    setShowConfirm,
    confirmDeleteFile,
    showOpenImage,
    setShowOpenImage,
    selectImage,
    isSelected,
    startDragging,
    isDragged,
    endDragging
}) {
    return (
        <>
            <Context actions={[
                <div className="uploadeWidget__item-action" onClick={() => setShowOpenImage(true)} key={0}>
                    <i className="fas fa-external-link-alt"/>
                    Open image
                </div>,
                <div className="uploadeWidget__item-action error" onClick={handleDeleteItem} key={1}>
                    <i className="fas fa-trash"/>
                    Remove image
                </div>
            ]}>
                <div
                    className={classNames('uploadsWidget__item', {
                        isSelected: isSelected.indexOf(item.fullPath) > -1,
                        isDragged: isDragged.indexOf(item.fullPath) > -1
                    })}
                    onDoubleClick={() => setShowOpenImage(true)}
                    onClick={selectImage}
                    draggable={true}
                    onDragStart={() => startDragging(item.fullPath)}
                    onDragEnd={endDragging}
                >
                    <div className="uploadsWidget__item-placeholder">
                        <Preloader/>
                    </div>
                    <div className="uploadsWidget__item-img" style={{backgroundImage: 'url(' + itemURL + ')'}}/>
                </div>
            </Context>
            {
                showConfirm ?
                    <Confirm
                        message="Are you sure you want to remove this image?"
                        onConfirm={() => confirmDeleteFile()}
                        onCancel={() => setShowConfirm(false)}
                    />
                    :
                    null
            }
            {
                showOpenImage ?
                    <Modal
                        img={{url: itemURL.replace('thumb_', ''), alt: item.name}}
                        onHideModal={() => setShowOpenImage(false)}
                    >
                        <div className="btn btn-error" onClick={handleDeleteItem}><i className="fas fa-trash" />Remove image</div>
                    </Modal>
                    :
                    null
            }
        </>
    );
}

export default withUploadsItem(UploadsWidgetImage);
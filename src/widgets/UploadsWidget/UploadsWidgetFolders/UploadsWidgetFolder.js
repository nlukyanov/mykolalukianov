import React from 'react';
import { withRouter } from 'react-router-dom';
import Context from "../../../components/UI/Context/Context";
import Confirm from "../../../components/UI/Confirm/Confirm";
import {deleteFolder, moveFiles} from "../../../redux/actions/uploadsActions";
import {connect} from "react-redux";
import { compose } from 'redux';
import withUploadsFolder from "../HOCS/withUploadsFolder";
import classNames from 'classnames';
import Modal from "../../../components/UI/Modal/Modal";

function UploadsWidgetFolder(
{
    folder,
    showConfirm,
    setShowConfirm,
    openFolder,
    confirmDeleteFile,
    isSelected,
    selectFolder,
    dragOver,
    isDraggedOver,
    dragLeave,
    folderThumb,
    showRenameModal,
    setShowRenameModal,
    newFolderName,
    setNewFolderName,
    handleRenameFolder,
    folderList
}) {
    return (
        <>
            <Context actions={[
                <div className="uploadeWidget__item-action" onClick={() => openFolder(true)} key={0}>
                    <i className="fas fa-external-link-alt"/>
                    Open folder
                </div>,
                <div className="uploadeWidget__item-action" onClick={() => setShowRenameModal(true)} key={1}>
                    <i className="fas fa-pencil-alt"/>
                    Rename folder
                </div>,
                <div className="uploadeWidget__item-action error" onClick={() => setShowConfirm(true)} key={2}>
                    <i className="fas fa-trash"/>
                    Remove folder
                </div>
            ]}>
                <div
                    className={classNames('uploadsWidget__folder', {
                        isSelected: isSelected.indexOf(folder.name) > -1,
                        isDraggedOver: isDraggedOver === folder.name
                    })}
                    onDoubleClick={() => openFolder(true)}
                    onClick={selectFolder}
                    onDragOver={() => dragOver(folder.name)}
                    onDragLeave={dragLeave}
                >
                    <div className="uploadsWidget__folder-inner">
                        <i className="fas fa-folder"/>
                        <div className="uploadsWidget__folder-thumb" style={{backgroundImage: 'url(' + folderThumb + ')'}}/>
                        <span className="uploadsWidget__folder-count">{ folderList ? folderList.length : null }</span>
                    </div>
                    <div className="uploadsWidget__folder-title">
                        {folder.name}
                    </div>
                </div>
            </Context>
            {
                showConfirm ?
                    <Confirm
                        message="Are you sure you want to remove this folder?"
                        onConfirm={() => confirmDeleteFile()}
                        onCancel={() => setShowConfirm(false)}
                    />
                    :
                    null
            }
            {
                showRenameModal ?
                    <Modal onHideModal={() => setShowRenameModal(false)}>
                        <div className="form">
                            <div className="form__field">
                                <h3 className="form__title">Rename folder</h3>
                            </div>
                            <div className="form__field">
                                <input type="text" placeholder="Enter new folder title" value={newFolderName} onChange={e => setNewFolderName(e.target.value)}/>
                            </div>
                            {
                                newFolderName !== folder.name ?
                                    <div className="form__field">
                                        <div className="btn btn-primary" onClick={handleRenameFolder}>
                                            <i className="fas fa-save" />
                                            Rename
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </Modal>
                    :
                    null
            }
        </>
    );
}
const mapDispatchToProps = dispatch => ({
    deleteFolder: folder => dispatch(deleteFolder(folder)),
    moveFiles: (files, newFolder, isRenaming) => dispatch(moveFiles(files, newFolder, isRenaming))
});

export default compose(withRouter, connect(null, mapDispatchToProps), withUploadsFolder)(UploadsWidgetFolder);

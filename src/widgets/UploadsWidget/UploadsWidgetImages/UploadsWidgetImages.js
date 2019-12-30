import React from 'react';
import {Link, withRouter} from "react-router-dom";
import UploadsWidgetItem from "./UploadsWidgetImage";
import Confirm from "../../../components/UI/Confirm/Confirm";
import {deleteFile, moveFiles} from "../../../redux/actions/uploadsActions";
import { connect } from 'react-redux';
import withUploadsImages from "../HOCS/withUploadsImages";
import { compose } from 'redux';
import UploadsWidgetListHeading from "../etc/UploadsWidgetListHeading";
import Modal from "../../../components/UI/Modal/Modal";

function UploadsWidgetImages(
{
    folder,
    uploads,
    isSelected,
    handleIsSelected,
    showConfirm,
    setShowConfirm,
    confirmDeleteFiles,
    loading,
    _renderWidgetActions,
    startDragging,
    isDragged,
    endDragging,
    showRenameModal,
    setShowRenameModal,
    newFolderName,
    handleRenameFolder,
    setNewFolderName
 }) {
    return (
        <>
            <UploadsWidgetListHeading isSelected={isSelected} title={
                folder ?
                    <>
                        <Link to="/admin-uploads" className="back-link">&lt; Back</Link>
                        <span className="uploadsWidget__heading-separator">&nbsp;|&nbsp;</span>Folder:&nbsp;
                        { folder.replace('/', '') }
                        <span className="uploadsWidget__heading-btn" onClick={() => setShowRenameModal(true)}><i className="fas fa-pencil-alt" />Rename</span>
                    </>
                    :
                    'Images'
            } setShowConfirm={setShowConfirm} />
            {
                loading === false && !uploads.length ?
                    <div className="adminSection__info">
                        <p>There are no images here yet</p>
                        {
                            _renderWidgetActions(['UPLOAD_IMAGES'])
                        }
                    </div>
                    :
                    <div className="uploadsWidget__list">
                        {
                            uploads.map(item => {
                                return <UploadsWidgetItem
                                    item={item}
                                    key={item.name}
                                    folder={folder}
                                    handleIsSelected={handleIsSelected}
                                    isSelected={isSelected.length ? isSelected.split(',') : []}
                                    startDragging={startDragging}
                                    endDragging={endDragging}
                                    isDragged={isDragged}
                                />
                            })
                        }
                    </div>
            }
            {
                showConfirm ?
                    <Confirm
                        message="Are you sure you want to remove these images?"
                        onConfirm={() => confirmDeleteFiles()}
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
    deleteFile: (filePath, folder) => dispatch(deleteFile(filePath, folder)),
    moveFiles: (files, newFolder, isRenaming) => dispatch(moveFiles(files, newFolder, isRenaming))
});

export default compose(withRouter, connect(null, mapDispatchToProps), withUploadsImages)(UploadsWidgetImages);
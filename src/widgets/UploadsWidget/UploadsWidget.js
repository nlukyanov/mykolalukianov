import React from 'react';
import { connect } from 'react-redux';
import {deleteFolder, fetchUploads, uploadNewFile, moveFiles} from "../../redux/actions/uploadsActions";
import Preloader from "../../components/UI/Preloader/Preloader";
import './uploadsWidget.scss';
import Pagination from "../../components/UI/Pagination/Pagination";
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import UploadsWidgetNewFolder from "./etc/UploadsWidgetNewFolder";
import Confirm from "../../components/UI/Confirm/Confirm";
import UploadsWidgetFolders from "./UploadsWidgetFolders/UploadsWidgetFolders";
import UploadsWidgetImages from "./UploadsWidgetImages/UploadsWidgetImages";
import withUploadsWidget from "./HOCS/withUploadsWidget";
import classNames from 'classnames';

function UploadsWidget(
{
    loading,
    loadingCount,
    folders,
    error,
    folder,
    showPerPage,
    currentPage,
    showCreateFolder,
    setShowCreateFolder,
    showConfirmRemoveFolder,
    setShowConfirmRemoveFolder,
    handleUploadNewFiles,
    uploadsSorted,
    confirmDeleteFolder,
    triggerUploadFile,
    isDragged,
    handleIsDragging,
    handleIsDraggingEnd,
    dragOver,
    isDraggedOver,
    dragLeave
}) {
    return (
        <section className="adminSection uploadsWidget">
            <div className="adminSection__header">
                <h2 className="adminSection__title">
                    <i className="fas fa-cloud-upload-alt adminSection__title-icon" />
                    Uploads { folder ? <strong>&nbsp;|&nbsp;Folder: { folder.replace('/', '') }</strong> : null }
                </h2>
                <div className="adminSection__header-actions">
                    <input type="file" hidden id="uploadFileBtn" accept=".jpg,.jpeg,.png,.gif" onChange={handleUploadNewFiles} multiple={true}/>
                    {
                        _renderWidgetActions(['CREATE_FOLDER', 'REMOVE_FOLDER', 'UPLOAD_IMAGES'])
                    }
                </div>
            </div>
            <div className="uploadsWidget__box">
                <div className="uploadsWidget__content">
                    {
                        error ?
                            <div className="adminSection__error">
                                { error }
                            </div>
                            :
                            <>
                                {
                                    !folder ?
                                        <UploadsWidgetFolders
                                            folders={folders}
                                            loading={loading}
                                            _renderWidgetActions={_renderWidgetActions}
                                            dragOver={dragOver}
                                            isDraggedOver={isDraggedOver}
                                            dragLeave={dragLeave}
                                        />
                                        :
                                        null
                                }
                                <UploadsWidgetImages
                                    folder={folder}
                                    uploads={uploadsSorted().filter((item, index) => index + 1 > showPerPage * currentPage && index < showPerPage * (currentPage + 1))}
                                    loading={loading}
                                    _renderWidgetActions={_renderWidgetActions}
                                    isDragged={isDragged}
                                    handleIsDragging={handleIsDragging}
                                    handleIsDraggingEnd={handleIsDraggingEnd}
                                />
                            </>
                    }
                    {
                        loading ?
                            <Preloader text={loadingCount ? loadingCount.text + (loadingCount.total ? `<strong>${loadingCount.item} / ${loadingCount.total}</strong>` : '') : null}/>
                            :
                            null
                    }
                    <Pagination totalCount={uploadsSorted().length} showPerPage={showPerPage}/>
                    {
                        showCreateFolder ?
                            <UploadsWidgetNewFolder setShowCreateFolder={setShowCreateFolder}/>
                            :
                            null
                    }
                    <p>
                        - Fix esc button when exiting folder - doesn't work at certain conditions<br/>
                        - Move images to any folder by selecting them and hitting "move to" button in actions bar<br/>
                        - Prevent page reload when any loading action is on<br/>
                        - Validating album name + checking if album name already exists<br/>
                        - Validating album name + checking if album name already exists upon folder rename<br/>
                        - Optimize duplicate code from withUploadsFolders and withUploadsImages<br/>
                        - Pagination should only show limited amount of numbers<br/>
                        - Style draggable image ???<br/>
                        - Images should be centered always if there are at least two rows of them ???<br/>
                    </p>
                </div>
            </div>
            {
                showConfirmRemoveFolder ?
                    <Confirm
                        message="Are you sure you want to remove this folder?"
                        onConfirm={() => confirmDeleteFolder()}
                        onCancel={() => setShowConfirmRemoveFolder(false)}
                    />
                    :
                    null
            }
        </section>
    );

    function _renderWidgetActions(btns) {
        return (
            <div className="btn-holder">
                {
                    !folder ?
                        btns.indexOf('CREATE_FOLDER') > -1 ?
                            <div className={classNames('btn btn-primary', {disabled: loading})} onClick={() => !loading ? setShowCreateFolder(true) : false}><i className="far fa-images"/>Create folder</div>
                            :
                            null
                        :
                        btns.indexOf('REMOVE_FOLDER') > -1 ?
                            <div className={classNames('btn btn-error', {disabled: loading})} onClick={() => !loading ? setShowConfirmRemoveFolder(true) : false}><i className="fas fa-trash"/>Remove folder</div>
                            :
                            null
                }
                {
                    btns.indexOf('UPLOAD_IMAGES') > -1 ?
                        <div className={classNames('btn btn-primary', {disabled: loading})} onClick={() => !loading ? triggerUploadFile() : false}><i className="fas fa-cloud-upload-alt"/>Upload images</div>
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.uploadsReducer.loading,
    loadingCount: state.uploadsReducer.loadingCount,
    uploads: state.uploadsReducer.uploads,
    folders: state.uploadsReducer.folders,
    error: state.uploadsReducer.error
});

const mapDispatchToProps = dispatch => ({
    fetchUploads: folder => dispatch(fetchUploads(folder)),
    uploadNewFile: (file, folder) => dispatch(uploadNewFile(file, folder)),
    deleteFolder: folder => dispatch(deleteFolder(folder)),
    moveFiles: (files, newFolder) => dispatch(moveFiles(files, newFolder))
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps), withUploadsWidget)(UploadsWidget);
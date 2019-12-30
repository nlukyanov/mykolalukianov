import React from 'react';
import UploadsWidgetFolder from "./UploadsWidgetFolder";
import withUploadsFolders from "../HOCS/withUploadsFolders";
import UploadsWidgetListHeading from "../etc/UploadsWidgetListHeading";
import Confirm from "../../../components/UI/Confirm/Confirm";
import {deleteFolder} from "../../../redux/actions/uploadsActions";
import { compose } from 'redux';
import { connect } from 'react-redux';

function UploadsWidgetFolders(
{
    isSelected,
    showConfirm,
    setShowConfirm,
    foldersSorted,
    loading,
    _renderWidgetActions,
    handleIsSelected,
    confirmDeleteFolders,
    dragOver,
    isDraggedOver,
    dragLeave
}) {
    return (
        <>
            <div className="uploadsWidget__folders">
                <UploadsWidgetListHeading isSelected={isSelected} title="Folders" setShowConfirm={setShowConfirm} />
                {
                    loading === false && !foldersSorted().length ?
                        <div className="adminSection__info">
                            <p>There are no folders here yet</p>
                            {
                                _renderWidgetActions(['CREATE_FOLDER'])
                            }
                        </div>
                        :
                        <div className="uploadsWidget__folders-list">
                            {
                                foldersSorted().map(folder => {
                                    return <UploadsWidgetFolder
                                        folder={folder}
                                        key={folder.name}
                                        handleIsSelected={handleIsSelected}
                                        isSelected={isSelected.length ? isSelected.split(',') : []}
                                        dragOver={dragOver}
                                        isDraggedOver={isDraggedOver}
                                        dragLeave={dragLeave}
                                        loading={loading}
                                    />
                                })
                            }
                        </div>
                }
            </div>
            {
                showConfirm ?
                    <Confirm
                        message="Are you sure you want to remove these folders?"
                        onConfirm={() => confirmDeleteFolders()}
                        onCancel={() => setShowConfirm(false)}
                    />
                    :
                    null
            }
        </>
    );
}
const mapDispatchToProps = dispatch => ({
    deleteFolder: (folders) => dispatch(deleteFolder(folders)),
});

export default compose(connect(null, mapDispatchToProps), withUploadsFolders)(UploadsWidgetFolders);
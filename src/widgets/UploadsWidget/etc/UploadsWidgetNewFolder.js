import React, { useState } from 'react';
import Modal from "../../../components/UI/Modal/Modal";
import {uploadNewFile} from "../../../redux/actions/uploadsActions";
import {connect} from "react-redux";

function UploadsWidgetNewFolder({setShowCreateFolder, uploadNewFile}) {
    const [ folderTitle, setFolderTitle ] = useState('');

    return (
        <Modal onHideModal={() => setShowCreateFolder(false)}>
            <input type="file" hidden id="uploadFileToFolderBtn" accept=".jpg,.jpeg,.png,.gif" onChange={handleUploadNewFiles} multiple={true}/>
            <div className="form">
                <div className="form__field">
                    <h3 className="form__title">Create folder</h3>
                </div>
                <div className="form__field">
                    <input type="text" placeholder="Enter folder title" value={folderTitle} onChange={e => setFolderTitle(e.target.value)}/>
                </div>
                {
                    folderTitle ?
                        <div className="form__field">
                            <div className="btn btn-primary" onClick={triggerUploadFile}>
                                <i className="fas fa-cloud-upload-alt" />
                                Upload images
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        </Modal>
    );

    function triggerUploadFile() {
        document.getElementById('uploadFileToFolderBtn').click();
    }

    function handleUploadNewFiles() {
        const files = document.getElementById('uploadFileToFolderBtn').files;

        if ( files.length ) {
            setShowCreateFolder(false);
            uploadNewFile(files, folderTitle);
        }
    }
}
const mapDispatchToProps = dispatch => ({
    uploadNewFile: (file, dir) => dispatch(uploadNewFile(file, dir, true))
});

export default connect(null, mapDispatchToProps)(UploadsWidgetNewFolder);
import firebase from "../../db/firestore";

export function fetchUploads(album) {
    const uploadsListRef = firebase.storage().ref('uploads' + album);

    return dispatch => {
        dispatch(fetchUploadsBegin());
        return uploadsListRef.list().then((res) => {
            dispatch(fetchUploadsSuccess(res.items, res.prefixes));
        }).catch((error) => {
            dispatch(fetchUploadsError(error.message));
        });
    }
}

export const FETCH_UPLOADS_BEGIN = 'FETCH_UPLOADS_BEGIN';
export const FETCH_UPLOADS_SUCCESS = 'FETCH_UPLOADS_SUCCESS';
export const FETCH_UPLOADS_ERROR = 'FETCH_UPLOADS_ERROR';

export const fetchUploadsBegin =() => {
    return {
        type: FETCH_UPLOADS_BEGIN
    }
};
export const fetchUploadsSuccess = (uploads, folders, loading = false, loadingCount = null) => {
    return {
        type: FETCH_UPLOADS_SUCCESS,
        payload: { uploads, folders, loading, loadingCount }
    }
};
export const fetchUploadsError = error => {
    return {
        type: FETCH_UPLOADS_ERROR,
        payload: { error }
    }
};

const storageRef = firebase.storage().ref();

export function uploadNewFile(files, dir, stayInUploads) {
    const uploadsListRef = firebase.storage().ref('uploads' + (stayInUploads ? '' : dir));

    return dispatch => {
        dispatch(uploadFileBegin({text: 'Uploading' + (dir ? ' to folder "' + dir + '"' : '') + ': ', total: files.length, item: 0}));
        let iOriginal = 0;
        let iThumb = 0;

        return uploadFileStart(null, true);

        function uploadFileStart(name, isOriginal) {
            const fileName = name ? name : new Date().getTime();

            if ( isOriginal ) {
                const file = files[files.length - (iOriginal + 1)];
                resizer(file, 1920, 1080, '.' + file.name.split('.').pop(), fileName);
                iOriginal++;
            }
            else {
                const file = files[files.length - (iThumb + 1)];
                resizer(file, 300, 300, '.' + file.name.split('.').pop(), 'thumb_' + fileName);
                iThumb++;
            }
        }

        function upload(blob, file, fileName) {
            const newFileRef = storageRef.child('uploads/' + (dir ? dir + '/' : '') + fileName + '.' + file.name.split('.').pop());
            const fileToUpload = blob.size > file.size ? file : blob;

            return newFileRef.put(fileToUpload).then(snapshot => {
                return uploadsListRef.list().then((res) => {
                    if ( iOriginal > iThumb ) {
                        dispatch(fetchUploadsSuccess(res.items, res.prefixes, true, {text: 'Uploading' + (dir ? ' to folder "' + dir + '"' : '') + ': ', total: files.length, item: iOriginal}));
                        return uploadFileStart(fileName);
                    }
                    if ( files.length > iOriginal ) {
                        dispatch(fetchUploadsSuccess(res.items, res.prefixes, true, {text: 'Uploading' + (dir ? ' to folder "' + dir + '"' : '') + ': ', total: files.length, item: iOriginal}));
                        return uploadFileStart(null,  true);
                    }
                    dispatch(fetchUploadsSuccess(res.items, res.prefixes, false, null));
                }).catch((error) => {
                    dispatch(fetchUploadsError(error.message));
                });
            });
        }

        function resizer(file, max_width, max_height, imageEncoding, fileName) {
            let fileLoader = new FileReader(),
                canvas = document.createElement('canvas'),
                context = null,
                imageObj = new Image(),
                blob = null;

            canvas.id     = "hiddenCanvas";
            canvas.style.visibility   = "hidden";
            document.body.appendChild(canvas);

            context = canvas.getContext('2d');

            if (file.type.match('image.*')) {
                fileLoader.readAsDataURL(file);
            } else {
                alert('File is not an image');
            }

            fileLoader.onload = function() {
                imageObj.src = this.result;
            };

            fileLoader.onabort = function() {
                alert("The upload was aborted.");
            };

            fileLoader.onerror = function() {
                alert("An error occured while reading the file.");
            };

            imageObj.onload = function() {
                if( this.width === 0 || this.height === 0 ) {
                    alert('Image is empty');
                }
                else {
                    let newMaxWidth = max_width,
                        newMaxHeight = max_height;

                    if ( max_width > this.width ) {
                        newMaxWidth = this.width
                    }
                    if ( max_height > this.height ) {
                        newMaxHeight = this.height;
                    }

                    if ( this.width / this.height > newMaxWidth / newMaxHeight ) {
                        canvas.width  = newMaxWidth;
                        canvas.height = newMaxWidth * this.height / this.width;
                        context.clearRect(0,0,newMaxWidth,newMaxWidth * this.height / this.width);
                        context.drawImage(imageObj, 0, 0, this.width, this.height, 0, 0, newMaxWidth, newMaxWidth * this.height / this.width);
                    }
                    else if ( this.width / this.height < newMaxWidth / newMaxHeight ) {
                        canvas.width  = this.width * newMaxHeight / this.height;
                        canvas.height = newMaxHeight;
                        context.clearRect(0,0,this.width * newMaxHeight / this.height,newMaxHeight);
                        context.drawImage(imageObj, 0, 0, this.width, this.height, 0, 0, this.width * newMaxHeight / this.height, newMaxHeight);
                    }
                    else {
                        canvas.width  = newMaxWidth;
                        canvas.height = newMaxHeight;
                        context.clearRect(0,0,newMaxWidth,newMaxHeight);
                        context.drawImage(imageObj, 0, 0, this.width, this.height, 0, 0, newMaxWidth, newMaxHeight);
                    }

                    blob = dataURItoBlob(canvas.toDataURL(imageEncoding));
                    upload(blob, file, fileName);
                    document.getElementById('hiddenCanvas').remove();
                }
            };

            imageObj.onabort = function() {
                alert("Image load was aborted.");
            };

            imageObj.onerror = function() {
                alert("An error occured while loading image.");
            };

        }
    }
}

export const UPLOAD_FILE_BEGIN = 'UPLOAD_FILE_BEGIN';

export const uploadFileBegin = (loadingCount) => {
    return {
        type: UPLOAD_FILE_BEGIN,
        payload: { loadingCount }
    }
};

export function deleteFile(filePath, album) {
    const uploadsListRef = firebase.storage().ref('uploads' + album);
    let i = 0;

    return dispatch => {
        dispatch(deleteFileBegin({text: 'Removing: ', total: filePath.length, item: 0}));
        return deleteItem();

        function deleteItem() {
            const deleteFileRef = firebase.storage().ref(filePath[i]);
            const deleteFileOriginalRef = firebase.storage().ref(filePath[i].replace('thumb_', ''));
            i++;

            return deleteFileRef.delete().then(() => {
                return deleteFileOriginalRef.delete().then(() => {
                    if ( filePath[i] ) {
                        return uploadsListRef.list().then((res) => {
                            dispatch(fetchUploadsSuccess(res.items, res.prefixes, true, {text: 'Removing: ', total: filePath.length, item: i}));
                            return deleteItem();
                        });
                    }
                    else {
                        return uploadsListRef.list().then((res) => {
                            dispatch(fetchUploadsSuccess(res.items, res.prefixes));
                        });
                    }
                });
            });
        }
    }
}

export const DELETE_FILE_BEGIN = 'DELETE_FILE_BEGIN';

export const deleteFileBegin =(loadingCount) => {
    return {
        type: DELETE_FILE_BEGIN,
        payload: { loadingCount }
    }
};

export function deleteFolder(folders) {
    return dispatch => {
        let i = 0;

        return deleteFolder(folders[i]);

        function deleteFolder(folder) {
            i++;
            const uploadsListRef = firebase.storage().ref('uploads/' + folder.replace('/', ''));

            dispatch(deleteFolderBegin({text: 'Removing folder "' + folder.replace('/', '') +  '"...'}));
            return uploadsListRef.list().then((res) => {
                const items = res.items;

                return deleteItem(items[0]);
            });

            function deleteItem(item) {
                const deleteFileRef = firebase.storage().ref(item.fullPath);

                return deleteFileRef.delete().then(() => {
                    return uploadsListRef.list().then((res) => {
                        const items = res.items;

                        if ( items.length ) {
                            return deleteItem(items[0]);
                        }
                        else {
                            if ( folders[i] ) {
                                return deleteFolder(folders[i]);
                            }
                            else {
                                const uploadsListRef = firebase.storage().ref('uploads');
                                return uploadsListRef.list().then((res) => {
                                    dispatch(fetchUploadsSuccess(res.items, res.prefixes));
                                });
                            }
                        }
                    });
                });
            }
        }
    };
}

export const DELETE_FOLDER_BEGIN = 'DELETE_FOLDER_BEGIN';

export const deleteFolderBegin = (loadingCount) => {
    return {
        type: DELETE_FOLDER_BEGIN,
        payload: { loadingCount }
    }
};

export function moveFiles(files, newFolder, isRenaming) {
    const uploadsListRef = firebase.storage().ref('uploads');
    let i = 0;

    return dispatch => {
        dispatch(moveFilesBegin(isRenaming ? {text: 'Renaming...'} : {text: 'Moving: ', item: i, total: files.length}));

        return moveFile(files[i]);

        function moveFile(file) {
            i++;

            return moveThumb(file);
        }

        function moveThumb(file) {
            const itemRef = firebase.storage().ref(file);

            return itemRef.getDownloadURL().then(res => {
                fetch(res).then(r => {
                    r.blob().then(blob => {
                        return upload(blob, file, true);
                    });
                });
            });
        }

        function moveOriginal(file) {
            const itemRef = firebase.storage().ref(file);

            return itemRef.getDownloadURL().then(res => {
                fetch(res).then(r => {
                    r.blob().then(blob => {
                        return upload(blob, file);
                    });
                });
            });
        }

        function deleteItem(file) {
            const deleteFileRef = firebase.storage().ref(file);
            const filePath = file.includes('thumb_') ? file : file.split('/').splice(0, file.split('/').length - 1).join('/') + ('/thumb_' + file.split('/').pop());
            const deleteFileThumbRef = firebase.storage().ref(filePath);

            return deleteFileRef.delete().then(() => {
                return deleteFileThumbRef.delete().then(() => {
                    return uploadsListRef.list().then((res) => {
                        if ( files[i] ) {
                            if ( !isRenaming ) {
                                dispatch(fetchUploadsSuccess(res.items, res.prefixes, true, isRenaming ? {text: 'Renaming...'} : {text: 'Moving: ', item: i, total: files.length}));
                            }
                            return moveFile(files[i]);
                        }
                        dispatch(fetchUploadsSuccess(res.items, res.prefixes, false, null));
                    });
                });
            });
        }

        function upload(blob, file, isThumb) {
            const fileName = 'uploads/' + (newFolder ? newFolder + '/' : '') + file.split('/').pop();
            const newFileRef = storageRef.child(fileName);

            return newFileRef.put(blob).then(snapshot => {
                if ( isThumb ) {
                    return moveOriginal(file.replace('thumb_', ''));
                }
                else {
                    return deleteItem(file);
                }
            });
        }
    };
}

export const MOVE_FILES_BEGIN = 'MOVE_FILES_BEGIN';

export const moveFilesBegin = (loadingCount) => {
    return {
        type: MOVE_FILES_BEGIN,
        payload: { loadingCount }
    }
};

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}

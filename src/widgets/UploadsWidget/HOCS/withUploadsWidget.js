import React, {useEffect, useState} from 'react';

export default function withUploadsWidget(WrappedComponent) {
    return function(props) {
        const { location, match, history, fetchUploads, loading, uploads, uploadNewFile, deleteFolder, moveFiles } = props;

        const showPerPage = 40;
        const currentPage = location.search ? location.search.replace('?p=', '') - 1 : 0;

        const [ showCreateFolder, setShowCreateFolder ] = useState(false);
        const [ folder, setFolder ] = useState(match.params.itemID ? '/' + match.params.itemID : '');
        const [ showConfirmRemoveFolder, setShowConfirmRemoveFolder ] = useState(false);
        const [ isDragged, setIsDragged ] = useState('');
        const [ isDraggedOver, setIsDraggedOver ] = useState(null);

        useEffect(() => {
            document.addEventListener('keyup', handleEsc);
            return () => {
                document.removeEventListener('keyup', handleEsc);
            }
        }, []);

        useEffect(() => {
            setFolder(match.params.itemID ? '/' + match.params.itemID : '');
        }, [window.location.pathname]);

        useEffect(() => {
            fetchUploads(folder);
        }, [folder]);

        useEffect(() => {
            if ( folder && loading === false && (!uploads.length || uploads[0].parent.fullPath === 'uploads') ) {
                history.push('/admin-uploads');
            }
        }, [uploads]);

        const newProps = {
            ...props,
            folder,
            showCreateFolder,
            showConfirmRemoveFolder,
            showPerPage,
            currentPage,
            setShowCreateFolder,
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
        };

        return (
            <WrappedComponent {...newProps}/>
        );

        function triggerUploadFile() {
            document.getElementById('uploadFileBtn').click();
        }

        function uploadsSorted() {
            return uploads
                .sort((a, b) => {
                    if ( a.name > b.name ) {
                        return -1;
                    }
                    else if ( a.name < b.name ) {
                        return 1;
                    }
                    return 0;
                })
                .filter(item => item.name.includes('thumb_'));
        }

        function handleUploadNewFiles() {
            const files = document.getElementById('uploadFileBtn').files;

            if ( files.length ) {
                uploadNewFile(files, folder);
            }
        }

        function confirmDeleteFolder() {
            setShowConfirmRemoveFolder(false);
            deleteFolder([folder]);
        }

        function handleIsDragging(list) {
            setIsDragged(list);
        }

        function handleIsDraggingEnd() {
            if ( isDraggedOver ) {
                moveFiles(isDragged.split(','), isDraggedOver);
            }
            setIsDragged('');
        }

        function dragOver(folderName) {
            setIsDraggedOver(folderName);
        }

        function dragLeave() {
            setTimeout(() => {
                setIsDraggedOver(null);
            }, 0);
        }

        function handleEsc(e) {
            if ( e.keyCode === 27 && folder ) {
                if ( !document.querySelector('.modal') && !document.querySelector('.context__menu') && !document.querySelector('.confirm') ) {
                    history.push('/admin-uploads');
                }
            }
        }
    }
}

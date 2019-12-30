import React, {useEffect, useState} from 'react';

export default function withUploadsImages(WrappedComponent) {
    return function(props) {
        const { deleteFile, folder, handleIsDragging, handleIsDraggingEnd, moveFiles, uploads } = props;

        const [ isSelected, setIsSelected ] = useState('');
        const [ showConfirm, setShowConfirm ] = useState(false);
        const [ showRenameModal, setShowRenameModal ] = useState(false);
        const [ newFolderName, setNewFolderName ] = useState(folder.replace('/', ''));

        useEffect(() => {
            document.addEventListener('click', deselectAll);
            document.addEventListener('keyup', handleEsc);
            return () => {
                document.removeEventListener('click', deselectAll);
                document.removeEventListener('keyup', handleEsc);
            }
        }, []);

        useEffect(() => {
            setNewFolderName(folder.replace('/', ''));
        }, [folder]);

        useEffect(() => {
            document.addEventListener('keyup', handleDeleteButton);
            return () => {
                document.removeEventListener('keyup', handleDeleteButton);
            }
        }, [isSelected]);

        useEffect(() => {
            setIsSelected('');
        }, [window.location.pathname, folder]);

        const newProps = {
            ...props,
            isSelected,
            handleIsSelected,
            showConfirm,
            setShowConfirm,
            confirmDeleteFiles,
            startDragging,
            endDragging,
            showRenameModal,
            setShowRenameModal,
            newFolderName,
            setNewFolderName,
            handleRenameFolder
        };

        return (
            <WrappedComponent {...newProps}/>
        );

        function handleIsSelected(item) {
            const newIsSelected = isSelected.length ? isSelected.split(',') : [];

            if ( newIsSelected.indexOf(item) > -1 ) {
                newIsSelected.splice(newIsSelected.indexOf(item), 1);
            }
            else {
                newIsSelected.push(item);
            }
            setIsSelected(newIsSelected.join(','));
        }

        function deselectAll(e) {
            if ( !e.target.closest('.uploadsWidget__item') && !e.target.closest('.uploadsWidget__actions-item') ) {
                setIsSelected('');
            }
        }

        function handleDeleteButton(e) {
            if ( e.keyCode === 46 ) {
                if ( isSelected.length ) {
                    setShowConfirm(true);
                }
            }
        }

        function confirmDeleteFiles() {
            setShowConfirm(false);
            setIsSelected('');
            deleteFile(isSelected.split(','), folder);
        }

        function startDragging(item) {
            const draggingList = isSelected.length ? isSelected.split(',') : [item];
            setIsSelected('');

            if ( draggingList.indexOf(item) === -1 ) {
                draggingList.push(item);
            }
            handleIsDragging(draggingList.join(','));
        }

        function endDragging() {
            handleIsDraggingEnd();
        }

        function handleRenameFolder() {
            const fileNames = [];

            uploads.forEach(item => fileNames.push(item.fullPath));

            setShowRenameModal(false);
            moveFiles(fileNames, newFolderName, true);
        }

        function handleEsc(e) {
            if ( e.keyCode === 27 ) {
                setIsSelected('');
            }
        }
    }
}

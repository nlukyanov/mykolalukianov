import React, {useEffect, useState} from 'react';

export default function withUploadsFolders(WrappedComponent) {
    return function(props) {
        const { folders, deleteFolder } = props;

        const [ isSelected, setIsSelected ] = useState('');
        const [ showConfirm, setShowConfirm ] = useState(false);

        useEffect(() => {
            document.addEventListener('click', deselectAll);
            document.addEventListener('keyup', handleEsc);
            return () => {
                document.removeEventListener('click', deselectAll);
                document.removeEventListener('keyup', handleEsc);
            }
        }, []);

        useEffect(() => {
            document.addEventListener('keyup', handleDeleteButton);
            return () => {
                document.removeEventListener('keyup', handleDeleteButton);
            }
        }, [isSelected]);

        const newProps = {
            ...props,
            isSelected,
            setIsSelected,
            showConfirm,
            setShowConfirm,
            foldersSorted,
            handleIsSelected,
            confirmDeleteFolders
        };

        return (
            <WrappedComponent {...newProps}/>
        );

        function foldersSorted() {
            return folders
                .sort((a, b) => {
                    if ( a.name < b.name ) {
                        return -1;
                    }
                    else if ( a.name > b.name ) {
                        return 1;
                    }
                    return 0;
                });
        }

        function handleIsSelected(folderName) {
            const newIsSelected = isSelected.length ? isSelected.split(',') : [];

            if ( newIsSelected.indexOf(folderName) > -1 ) {
                newIsSelected.splice(newIsSelected.indexOf(folderName), 1);
            }
            else {
                newIsSelected.push(folderName);
            }
            setIsSelected(newIsSelected.join(','));
        }

        function deselectAll(e) {
            if ( !e.target.closest('.uploadsWidget__folder') && !e.target.closest('.uploadsWidget__actions-item') ) {
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

        function confirmDeleteFolders() {
            setShowConfirm(false);
            setIsSelected('');
            deleteFolder(isSelected.split(','));
        }

        function handleEsc(e) {
            if ( e.keyCode === 27 ) {
                setIsSelected('');
            }
        }
    }
}

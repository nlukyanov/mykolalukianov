import React, {useState, useEffect} from 'react';
import firebase from "../../../db/firestore";

export default function withUploadsFolder(WrappedComponent) {
    return function(props) {
        const { history, folder, deleteFolder, loading, moveFiles } = props;

        const [ showConfirm, setShowConfirm ] = useState(false);
        const [ folderThumb, setFolderThumb ] = useState(null);
        const [ showRenameModal, setShowRenameModal ] = useState(false);
        const [ newFolderName, setNewFolderName ] = useState(folder.name);
        const [ folderList, setFolderList ] = useState(null);

        const uploadsInFolderRef = firebase.storage().ref('uploads/' + folder.name);

        useEffect(() => {
            if ( !folderThumb ) {
                uploadsInFolderRef.listAll().then(snapshot => {
                    const list = snapshot.items
                        .sort((a, b) => {
                            if ( a.name > b.name ) {
                                return -1;
                            }
                            else if ( a.name < b.name ) {
                                return 1;
                            }
                            return 0;
                        })
                        .filter(item => item.name.includes('thumb_'))[0];

                    if ( list ) {
                        let newList = [];

                        snapshot.items.filter(item => item.name.includes('thumb_')).forEach(item => newList.push(item.fullPath));

                        setFolderList(newList);
                        list.getDownloadURL().then(item => {
                            setFolderThumb(item);
                        });
                    }
                });
            }
        }, [loading]);

        const newProps = {
            ...props,
            showConfirm,
            setShowConfirm,
            openFolder,
            confirmDeleteFile,
            selectFolder,
            folderThumb,
            showRenameModal,
            setShowRenameModal,
            newFolderName,
            setNewFolderName,
            handleRenameFolder,
            folderList
        };

        return (
            <WrappedComponent {...newProps}/>
        );

        function openFolder() {
            history.push('/admin-uploads/' + folder.name);
        }

        function confirmDeleteFile() {
            setShowConfirm(false);
            deleteFolder([folder.name]);
        }

        function selectFolder() {
            props.handleIsSelected(props.folder.name);
        }

        function handleRenameFolder() {
            setShowRenameModal(false);
            moveFiles(folderList, newFolderName, true);
        }
    }
}

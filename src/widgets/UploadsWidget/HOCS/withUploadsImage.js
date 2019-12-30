import React, { useState, useEffect } from 'react';
import firebase from "../../../db/firestore";
import {deleteFile} from "../../../redux/actions/uploadsActions";
import { connect } from 'react-redux';
import { compose } from 'redux';

function withUploadsImage(WrappedComponent) {
    return function(props) {
        const uploadsItemRef = firebase.storage().ref(props.item.fullPath);

        const [ uploadsItem, setUploadsItem ] = useState(null);
        const [ showConfirm, setShowConfirm ] = useState(false);
        const [ showOpenImage, setShowOpenImage ] = useState(false);

        useEffect(() => {
            fetchUploadsItem().then(res => {
                if ( !uploadsItem ) {
                    setUploadsItem(res);
                }
            });
        }, []);

        const newProps = {
            ...props,
            itemURL: uploadsItem,
            handleDeleteItem: handleDeleteItem,
            showConfirm: showConfirm,
            setShowConfirm: setShowConfirm,
            confirmDeleteFile: confirmDeleteFile,
            showOpenImage: showOpenImage,
            setShowOpenImage: setShowOpenImage,
            selectImage: selectImage
        };

        return (
            <WrappedComponent {...newProps}/>
        );

        async function fetchUploadsItem() {
            return await uploadsItemRef.getDownloadURL();
        }

        function handleDeleteItem() {
            setShowConfirm(true);
        }

        function confirmDeleteFile() {
            setShowConfirm(false);
            props.deleteFile([props.item.fullPath], props.folder);
        }

        function selectImage() {
            props.handleIsSelected(props.item.fullPath);
        }
    }
}
const mapDispatchToProps = dispatch => ({
    deleteFile: (filePath, folder) => dispatch(deleteFile(filePath, folder))
});

export default compose(connect(null, mapDispatchToProps), withUploadsImage);

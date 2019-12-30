import {
    FETCH_UPLOADS_BEGIN,
    FETCH_UPLOADS_SUCCESS,
    FETCH_UPLOADS_ERROR,
    UPLOAD_FILE_BEGIN,
    DELETE_FILE_BEGIN,
    DELETE_FOLDER_BEGIN,
    MOVE_FILES_BEGIN
} from '../actions/uploadsActions';

const initialState = {
    uploads: [],
    folders: [],
    error: null,
    loading: null,
    loadingCount: null
};

export default function configReducer(state = initialState, action) {
    switch ( action.type ) {
        case FETCH_UPLOADS_BEGIN:
            return {
                ...state,
                loading: true
            };

        case FETCH_UPLOADS_SUCCESS:
            return {
                ...state,
                loading: action.payload.loading,
                loadingCount: action.payload.loadingCount,
                uploads: action.payload.uploads,
                folders: action.payload.folders
            };

        case FETCH_UPLOADS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case UPLOAD_FILE_BEGIN:
            return {
                ...state,
                loading: true,
                loadingCount: action.payload.loadingCount
            };

        case DELETE_FILE_BEGIN:
            return {
                ...state,
                loading: true,
                loadingCount: action.payload.loadingCount
            };

        case DELETE_FOLDER_BEGIN:
            return {
                ...state,
                loading: true,
                loadingCount: action.payload.loadingCount
            };

        case MOVE_FILES_BEGIN:
            return {
                ...state,
                loading: true,
                loadingCount: action.payload.loadingCount
            };

        default:
            return state;
    }
}

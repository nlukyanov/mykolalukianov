import React from 'react';
import { Provider } from 'react-redux';
import AdminBar from "../../components/Admin/AdminBar/AdminBar";
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import './adminContainer.scss';
import {mainStore} from "../../redux/stores/mainStore";

export default function AdminContainer({children}) {
    return (
        <div className="adminContainer">
            <AdminBar/>
            <div className="adminContainer__wrapper">
                <AdminNav/>
                <div className="adminContainer__content">
                    <Provider store={mainStore}>
                        { children }
                    </Provider>
                </div>
            </div>
        </div>
    )
}
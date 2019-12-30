import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminContainer from './containers/AdminContainer/AdminContainer';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminUploads from './pages/Admin/AdminUploads/AdminUploads';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin">
            <AdminContainer>
                <AdminDashboard/>
            </AdminContainer>
          </Route>
            <Route exact path="/admin-pages">
                <AdminContainer>
                    Pages
                </AdminContainer>
            </Route>
            <Route exact path="/admin-uploads">
                <AdminContainer>
                    <AdminUploads/>
                </AdminContainer>
            </Route>
            <Route exact path="/admin-uploads/:itemID" children={<AdminContainer><AdminUploads/></AdminContainer>}/>
            <Route exact path="/admin-work">
                <AdminContainer>
                    Work
                </AdminContainer>
            </Route>
            <Route exact path="/admin-life">
                <AdminContainer>
                    Life
                </AdminContainer>
            </Route>
            <Route exact path="/admin-media">
                <AdminContainer>
                    Media
                </AdminContainer>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

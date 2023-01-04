import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursesPage from "./CoursePage";
import ManageCoursePage from "./ManageCoursePage";
import NotFoundPage from "./NotFoundPage";

function App() {

    return (
        <div className="container-fluid">
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/courses" component={CoursesPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/course/:slug" component={ManageCoursePage} />
                <Redirect from="/about-page" to="/about" />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );

}
export default App;
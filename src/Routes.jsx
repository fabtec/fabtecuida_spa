import React from 'react';

const Routes = () => {

    return (
        <Router>
            <Switch>
                <Route component={ DashboardPage } path="/" exact/>
                <Route component={ LoginPage } path="/login" exact/>
            </Switch>
        </Router>
    )
}

export default Routes

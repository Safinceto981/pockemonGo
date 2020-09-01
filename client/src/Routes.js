import React from "react"
import { Route, Switch } from "react-router-dom"

const Routes = () => (
    <Switch>
        <Route
            exact
            path="/"
            render={() => <div>works !!!</div>}
        />
    </Switch>
);
export default Routes; 
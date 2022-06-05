import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../../App';
import {
    // BrowserRouter as Router,
    Route
  } from "react-router-dom";

const PrivateRoute = (children, ...rest) => {
    const [ loggedInUser ]=useContext(userContext);
    console.log(children);
    console.log(rest);
    return (
        <div>
            <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (
                 children.toString()
                 ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
        </div>
    );
};

export default PrivateRoute;
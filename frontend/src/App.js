import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import isEmpty from "lodash/isEmpty";
import { parseCookies } from "nookies";
import { useUserTools } from "./hooks/useUserTools";
import {setUser} from './redux/action'

function App() {
  const [initialized, setInitialized] = useState(false);
  const user = useSelector((state) => state.user);
  const { accessToken } = parseCookies();
  const { fetchUserHttp } = useUserTools();
  const dispatch= useDispatch()
  const history = useHistory();

  //Method to fetch user details at initialization
  const fetchUserDetails = async () => {
    try {
      const rData = await fetchUserHttp();
      dispatch(setUser(rData))
      setInitialized(true)
    } catch (err) {
      if (err === "Unauthorized") {
        setInitialized(true);
      }
      console.log("Error", err);
    }
  };

  useEffect(() => {
    //Initialization
    if (!initialized && isEmpty(user)) {
      fetchUserDetails();
    }
  }, [initialized, accessToken, user]);

  return (
    <>
      {!initialized && <h1>Loading...</h1>}
      {initialized && (
        <Router>
          <Switch>
            {!isEmpty(user) ? (
              <Switch>
                <Route render={() => <Profile />} exact path="/profile" />
                <Route render={() => <Dashboard />} exact path="/dashboard" />
                <Route render={() => <Redirect to="/dashboard/" />} path="/" />
              </Switch>
            ) : (
              <Switch>
                <Route render={() => <Login />} exact path="/login" />
                <Route render={() => <Register />} exact path="/register" />
                <Route render={() => <Redirect to="/login" />} path="/" />
              </Switch>
            )}
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;

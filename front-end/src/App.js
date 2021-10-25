import Auth from "@aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import taskApi from "./services/taskApi";
import apiClient from "./utils/api";
import "./App.css";

import Tasks from "./components/Tasks";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const taskClient = taskApi(apiClient(token));

  async function getUserInfo() {
    return await Auth.currentAuthenticatedUser();
  }

  async function getUserToken() {
    return Auth.currentSession().then((res) => {
      let accessToken = res.getAccessToken();
      return accessToken.getJwtToken();
    });
  }

  useEffect(() => {
    getUserInfo().then((user) => setUser(user));
    getUserToken().then((token) => setToken(token))
  }, []);

  if (!user && !token) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <Tasks taskClient={taskClient} user={user}></Tasks>
    </div>
  );
}

export default withAuthenticator(App);

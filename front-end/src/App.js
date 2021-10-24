// import { withAuthenticator } from '@aws-amplify/ui-react';
import "./App.css";

import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <Tasks></Tasks>
    </div>
  );
}

// export default withAuthenticator(App);
export default App;

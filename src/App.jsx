import ControlPanel from "./ControlPanel.jsx";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./App.css";

function App() {
  return (
    <main className="login-shell">
      <div className="auth-wrapper">
        <Authenticator>
          {({ signOut }) => <ControlPanel onLogout={signOut} />}
        </Authenticator>
      </div>
    </main>
  );
}

export default App;

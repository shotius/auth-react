import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const { loginWithRedirect, logout, user, isLoading, getAccessTokenSilently } =
    useAuth0();

  const handleLogin = () => loginWithRedirect();

  const handleLogout = () => logout({ returnTo: window.location.origin });

  const handleCall = async () => {
    try {
      const token = await getAccessTokenSilently();
      localStorage.setItem("token", token);
      axios
        .get("http://localhost:4000", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCallApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      axios
        .get("http://localhost:4000/without")
        .then((data) => console.log(data))
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    console.log(user);
  }
  return (
    <div className="App">
      <h1>App</h1>
      <div>
        <button onClick={handleLogin}>LOGIN</button>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <h1>API Calls</h1>
      <button onClick={handleCall}>axios Get</button>
      <br />
      <button onClick={handleCallApi}>Without token</button>
      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <div>{user.name}</div>
        </div>
      )}
    </div>
  );
}

export default App;

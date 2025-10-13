import "./App.css";
import logo from "../assets/holberton-logo.jpg";
import { getFullYear, getFooterCopy } from "../utils/utils";

const App = () => {
  return (
    <>
      <div className="App-header">
        <img src={logo} alt="Holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">email</label>
          <input id="email" autoComplete="email" />
          <label htmlFor="pswd">password</label>
          <input
            id="pswd"
            type="password"
            autoComplete="current-password"
          />
          <button>OK</button>
        </form>
      </div>
      <div className="App-footer">
        <p>
          Copyright {getFullYear()} - {getFooterCopy(true)}
        </p>
      </div>
    </>
  );
};
export default App;

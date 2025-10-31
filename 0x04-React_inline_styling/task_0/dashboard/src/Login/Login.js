import "./Login.css";

const Login = () => (
  <>
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
  </>
);
export default Login;

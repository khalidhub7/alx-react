import "./Header.css";
import logo from "../assets/holberton-logo.jpg";

const Header = () => (
  <>
    <div className="App-header">
      <img src={logo} alt="Holberton logo" />
      <h1>School dashboard</h1>
    </div>
  </>
);

export default Header;

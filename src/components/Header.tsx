import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <Link to={"/"}>Home</Link>
      <Link to={"/auth"}>Login</Link>
    </header>
  );
}
export default Header;

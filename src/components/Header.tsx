import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedIn } from "../atoms";

const TopBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  font-weight: 600;
  font-size: 20px;
`;
const Col = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px;
  margin: 0px auto;
`;
const Logout = styled.span`
  cursor: pointer;
`;

function Header() {
  const [logIn, setLogIn] = useRecoilState(isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("TOKEN");
    setLogIn(Boolean(localStorage.getItem("isLoggedIn")));
    navigate("/auth");
  };

  useEffect(() => {
    setLogIn(Boolean(localStorage.getItem("isLoggedIn")));
  });

  return (
    <TopBox>
      <Col>
        <Link to={logIn ? "/todo" : "/"}>Home</Link>
        {logIn ? (
          <Logout onClick={handleLogout}>LogOut</Logout>
        ) : (
          <Link to={"/auth"}>Login</Link>
        )}
      </Col>
    </TopBox>
  );
}
export default Header;

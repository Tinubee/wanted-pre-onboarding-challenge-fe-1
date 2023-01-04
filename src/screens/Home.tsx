import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Title } from "./CreateAccount";
import { isLoggedIn } from "../atoms";
import Login from "./Login";
import Layout from "../components/Layout";

const Wrapper = styled.div`
  text-align: center;
  a {
    cursor: pointer;
    :hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Text = styled.div`
  font-size: 18px;
  margin: 10px 0px;
  font-weight: 400;
`;

const LittleText = styled.span`
  margin-right: 10px;
  font-weight: 400;
`;

function Home() {
  const check = useRecoilValue(isLoggedIn);
  return (
    <Layout>
      {check ? (
        <Login />
      ) : (
        <Wrapper>
          <Title>Todo List</Title>
          <Text>로그인 후 이용하실 수 있습니다.</Text>
          <Link to={"/auth"}>
            <LittleText> 로그인 하러 가기</LittleText>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </Link>
        </Wrapper>
      )}
    </Layout>
  );
}

export default Home;

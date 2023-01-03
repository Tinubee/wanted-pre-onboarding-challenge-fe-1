import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Title } from "./CreateAccount";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  max-width: 600px;
  margin: 10px auto;
  border: 1px solid white;
  height: 80vh;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  text-align: center;
  a {
    cursor: pointer;
    :hover {
      color: #48c435;
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
  return (
    <Container>
      <Wrapper>
        <Title>Todo List</Title>
        <Text>로그인 후 이용하실 수 있습니다.</Text>
        <Link to={"/auth"}>
          <LittleText> 로그인 하러 가기</LittleText>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </Link>
      </Wrapper>
    </Container>
  );
}

export default Home;

import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

interface ITodoDataProps {
  id: string;
  title: string;
}

const TodoTitle = styled.div<{ isActive: boolean }>`
  display: flex;
  border: 1px solid white;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  font-weight: 400;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  background-color: ${(props) =>
    props.isActive ? props.theme.hoverColor : props.theme.bgColor};
  a {
    display: block;
  }
`;

function CTodo({ id, title }: ITodoDataProps) {
  const { todoId } = useParams();

  return (
    <Link to={`${id}`}>
      <TodoTitle isActive={todoId === id}>
        <div>{title}</div>
        <FontAwesomeIcon icon={faArrowCircleRight} />
      </TodoTitle>
    </Link>
  );
}
export default CTodo;

import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getTodos } from "../api";
import { toDosListAtom } from "../atoms";
import CreateTodo from "../components/CreateTodo";

export const Container = styled.div`
  padding: 0 20px;
  max-width: 600px;
  margin: 10px auto;
  border: 1px solid white;
  height: 80vh;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
`;

const TodoListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 65%;
`;

export const TodoList = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  overflow-y: auto;
  width: 48.5%;
`;

const TodoTitle = styled.div`
  display: flex;
  border: 1px solid white;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  font-weight: 400;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    background-color: #48c435;
  }
`;

function Todo() {
  const [toDos, setToDos] = useRecoilState(toDosListAtom);

  const getTodoList = async () => {
    const todoList = await getTodos().then((res) => res);
    setToDos(todoList.data);
  };

  useEffect(() => {
    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toDos]);

  return (
    <Container>
      <Title>할 일 목록</Title>
      <hr />
      <CreateTodo />
      <hr />
      <TodoListContainer>
        <TodoList>
          {toDos.map((todo) => (
            <Link key={todo.id} to={`${todo.id}`}>
              <TodoTitle>
                <div>{todo.title}</div>
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </TodoTitle>
            </Link>
          ))}
        </TodoList>
        <Outlet />
      </TodoListContainer>
    </Container>
  );
}

export default Todo;

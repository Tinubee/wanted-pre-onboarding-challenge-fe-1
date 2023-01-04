import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getTodos } from "../api";
import { toDosListAtom } from "../atoms";
import CTodo from "../components/CTodo";
import CreateTodo from "./CreateTodo";

const Wrapper = styled.div`
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
  height: 60%;
`;

export const TodoList = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  overflow-y: auto;
  width: 48.5%;
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
  }, []);

  return (
    <Wrapper>
      <Title>할 일 목록</Title>
      <hr />
      <CreateTodo />
      <hr />
      <TodoListContainer>
        <TodoList>
          {toDos.map((todo) => (
            <CTodo key={todo.id} id={todo.id} title={todo.title} />
          ))}
        </TodoList>
        <Outlet />
      </TodoListContainer>
    </Wrapper>
  );
}

export default Todo;

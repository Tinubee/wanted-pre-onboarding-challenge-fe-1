import {
  faPen,
  faSave,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { deleteTodo, getTodoById, updateTodo } from "../api";
import { toDoAtom, toDosListAtom } from "../atoms";
import { TodoList } from "./Todo";

const Wrapper = styled.div`
  text-align: center;
  overflow-x: hidden;
`;

const InputData = styled.input`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  width: 100%;
`;

const InputDataText = styled.textarea`
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  height: 270px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  svg {
    padding: 10px;
    border: 1px solid white;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #48c435;
    }
  }
`;

const Button = styled.button`
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  border-radius: 5px;
`;

function TodoContent() {
  const { todoId } = useParams();
  const [todo, setTodo] = useRecoilState(toDoAtom);
  const setToDos = useSetRecoilState(toDosListAtom);
  const [isChange, setIsChange] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const getContent = async () => {
    const result = await getTodoById(todoId);
    setTodo(result.data);
  };

  const handleChangeTitleInput = (event: any) => {
    setTodo({ ...todo, title: event.target.value });
  };

  const handleChangeContentInput = (event: any) => {
    setTodo({ ...todo, content: event.target.value });
  };

  const handleModify = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    getContent();
    setValue("toDoTitle", todo?.title);
    setValue("toDoContent", todo?.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoId, isChange]);

  const onSubmitValid = async () => {
    const { toDoTitle, toDoContent } = getValues();
    setIsChange(!isChange);
    const data = {
      title: toDoTitle,
      content: toDoContent,
    };
    await updateTodo(data, todoId);
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(todoId);
    setToDos((arr) => {
      return arr.filter((data) => data.id !== todoId);
    });
    navigate(`/todo`);
  };

  return (
    <TodoList>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Icon>
            {isChange ? (
              <FontAwesomeIcon icon={faPen} onClick={handleModify} />
            ) : (
              <FontAwesomeIcon icon={faXmark} onClick={handleModify} />
            )}

            {isChange ? (
              ""
            ) : (
              <Button type="submit">
                <FontAwesomeIcon icon={faSave} />
              </Button>
            )}
            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteTodo} />
          </Icon>
          <hr />
          <InputData
            {...register("toDoTitle")}
            value={todo?.title || ""}
            onChange={handleChangeTitleInput}
            disabled={isChange}
          />
          <hr />
          <InputDataText
            {...register("toDoContent")}
            autoComplete="off"
            value={todo?.content || ""}
            onChange={handleChangeContentInput}
            disabled={isChange}
          />
        </form>
      </Wrapper>
    </TodoList>
  );
}

export default TodoContent;

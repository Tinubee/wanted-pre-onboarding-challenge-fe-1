import {
  faCheck,
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
import { deleteTodo, getTodoById, getTodos, updateTodo } from "../api";
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
  height: 200px;
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
      background-color: ${(props) => props.theme.hoverColor};
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

const Box = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  color: black;
  font-weight: 600;
  svg {
    border: 1px solid black;
  }
`;

function TodoContent() {
  const { todoId } = useParams();
  const [todo, setTodo] = useRecoilState(toDoAtom);
  const setToDos = useSetRecoilState(toDosListAtom);
  const [isChange, setIsChange] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [deleteClicked, setDeleteClicked] = useState(false);

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

  const getTodoList = async () => {
    const todoList = await getTodos().then((res) => res);
    setToDos(todoList.data);
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

    getTodoList();
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(todoId);
    setToDos((arr) => {
      return arr.filter((data) => data.id !== todoId);
    });
    navigate(`/todo`);
  };

  const handleCheckDelete = () => {
    setDeleteClicked(true);
  };

  const handleCancleDelete = () => {
    setDeleteClicked(false);
  };

  return (
    <>
      <TodoList>
        <Wrapper>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Icon>
              {isChange ? (
                <FontAwesomeIcon icon={faPen} onClick={handleModify} />
              ) : (
                <FontAwesomeIcon icon={faXmark} onClick={handleModify} />
              )}

              {isChange ? null : (
                <Button type="submit">
                  <FontAwesomeIcon icon={faSave} />
                </Button>
              )}
              <FontAwesomeIcon icon={faTrash} onClick={handleCheckDelete} />
              {deleteClicked ? (
                <Box style={{ width: 300, height: 60 }}>
                  <Icon>
                    <div>정말로 삭제 하시겠습니까 ?</div>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={handleCancleDelete}
                    />
                    <FontAwesomeIcon
                      icon={faCheck}
                      onClick={handleDeleteTodo}
                    />
                  </Icon>
                </Box>
              ) : null}
            </Icon>
            <hr />
            <InputData
              {...register("toDoTitle")}
              value={todo?.title || ""}
              onChange={handleChangeTitleInput}
              disabled={isChange}
              autoComplete="off"
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
    </>
  );
}

export default TodoContent;

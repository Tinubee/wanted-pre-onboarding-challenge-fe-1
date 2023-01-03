import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button, Input } from "../screens/CreateAccount";
import { createTodo } from "../api";
import { useSetRecoilState } from "recoil";
import { toDosListAtom } from "../atoms";

const Form = styled.form``;

function CreateTodo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const setToDos = useSetRecoilState(toDosListAtom);
  const handleValid = async () => {
    const { todo, content } = getValues();

    const data = {
      title: todo,
      content,
    };
    const result = await createTodo(data);
    setToDos((oldToDos) => [...oldToDos, result.data]);
    setValue("todo", "");
    setValue("content", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("todo", {
          required: "제목을 적어주세요.",
        })}
        placeholder="제목을 적어주세요."
        hasError={Boolean(errors?.todo?.message)}
      />
      <Input
        {...register("content")}
        placeholder="내용을 적어주세요."
        hasError={Boolean(errors?.content?.message)}
      />
      <Button type="submit">등록하기</Button>
    </Form>
  );
}

export default CreateTodo;

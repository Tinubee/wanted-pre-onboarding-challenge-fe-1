import { useForm } from "react-hook-form";
import { Error } from "./CreateAccount";
import { createTodo } from "../api";
import { useSetRecoilState } from "recoil";
import { toDosListAtom } from "../atoms";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

function CreateTodo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      todo: "",
      content: "",
    },
  });
  const navigate = useNavigate();
  const setToDos = useSetRecoilState(toDosListAtom);
  const handleValid = async () => {
    const { todo, content } = getValues();

    const data = {
      title: todo,
      content,
    };
    const result = await createTodo(data);
    setToDos((oldToDos) => [...oldToDos, result.data]);
    navigate(`/todo/${result.data.id}`);
    setValue("todo", "");
    setValue("content", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("todo", {
          required: "제목은 필수사항 입니다.",
        })}
        placeholder="제목을 적어주세요."
        hasError={Boolean(errors?.todo?.message)}
        autoComplete="off"
      />
      <Error>{errors?.todo?.message}</Error>
      <Input
        {...register("content")}
        placeholder="내용을 적어주세요."
        hasError={Boolean(errors?.content?.message)}
        autoComplete="off"
      />
      <Button value="등록하기" type="submit" />
    </form>
  );
}

export default CreateTodo;

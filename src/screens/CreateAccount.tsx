import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createAccount } from "../api";

export const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 1.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export const FormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled.button`
  border: none;
  border-radius: 3px;
  margin: 12px 0px;
  color: black;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`;

function CreateAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      password2: "",
    },
  });

  const onSubmitValid = async () => {
    const userInfo = getValues();
    if (userInfo.password !== userInfo.password2) {
      setError("password2", { message: "비밀번호가 일치 하지 않습니다." });
      return;
    }

    const result = await createAccount(userInfo);
    if (result.details) {
      setError("email", { message: result.details });
      return;
    }
    setValue("email", "");
    setValue("password", "");
    setValue("password2", "");
    navigate("/auth");
  };

  return (
    <FormBox>
      <h1>회원 가입</h1>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "이메일의 형식이 맞지 않습니다.",
            },
          })}
          placeholder="Email"
          hasError={Boolean(errors?.email?.message)}
        />
        <span>{errors?.email?.message}</span>
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "최소 8자 이상의 비밀번호를 입력해주세요.",
            },
          })}
          placeholder="Password"
          hasError={Boolean(errors?.password?.message)}
        />
        <span>{errors?.password?.message}</span>
        <Input
          {...register("password2", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "최소 8자 이상의 비밀번호를 입력해주세요.",
            },
          })}
          placeholder="Password Again"
          hasError={Boolean(errors?.password2?.message)}
        />
        <span>{errors?.password2?.message}</span>
        <Button disabled={Object.keys(errors).length !== 0} type="submit">
          Create Account
        </Button>
        <Link to={"/auth"}>계정이 있습니까 ? ➡️</Link>
      </form>
    </FormBox>
  );
}

export default CreateAccount;

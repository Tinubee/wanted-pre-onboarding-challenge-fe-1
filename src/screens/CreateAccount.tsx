import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createAccount } from "../api";
import { Container } from "./Todo";

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;

export const Error = styled.span`
  color: red;
  font-size: 18px;
  font-weight: 400;
  margin-top: 5px;
`;

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
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.borderColor};
  }
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
    <Container>
      <FormBox>
        <Title>회원 가입</Title>
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
          <Error>{errors?.email?.message}</Error>
          <Input
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "최소 8자 이상의 비밀번호를 입력해주세요.",
              },
            })}
            placeholder="Password"
            type="password"
            hasError={Boolean(errors?.password?.message)}
          />
          <Error>{errors?.password?.message}</Error>
          <Input
            {...register("password2", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "최소 8자 이상의 비밀번호를 입력해주세요.",
              },
            })}
            placeholder="Password Again"
            type="password"
            hasError={Boolean(errors?.password2?.message)}
          />
          <Error>{errors?.password2?.message}</Error>
          <Button disabled={Object.keys(errors).length !== 0} type="submit">
            Create Account
          </Button>
          <Link to={"/auth"}>계정이 있습니까 ? ➡️</Link>
        </form>
      </FormBox>
    </Container>
  );
}

export default CreateAccount;

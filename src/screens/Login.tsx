import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { login } from "../api";
import { isLoggedIn } from "../atoms";
import { Button, Error, FormBox, Input, Title } from "./CreateAccount";
import { Container } from "./Todo";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [logIn, setLogIn] = useRecoilState(isLoggedIn);
  const onSubmitValid = async () => {
    const userInfo = getValues();
    const result = await login(userInfo);

    const { details, token } = result;
    console.log(result);
    if (details !== undefined) {
      setLoginError(true);
      setValue("email", "");
      setValue("password", "");
      return;
    }

    setLoginError(false);
    localStorage.setItem("TOKEN", token);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/todo");
    setValue("email", "");
    setValue("password", "");
  };

  useEffect(() => {
    console.log(errors);
  });

  useEffect(() => {
    setLogIn(Boolean(localStorage.getItem("isLoggedIn")));
    if (logIn) {
      console.log("로그인");
      navigate("/todo");
    }
  }, [logIn, setLogIn, navigate]);

  return (
    <Container>
      <FormBox>
        <Title>{loginError ? "로그인에 실패했습니다" : "로그인"}</Title>
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
          <Button disabled={Object.keys(errors).length !== 0} type="submit">
            Login
          </Button>
        </form>
        <Link to={"/sign"}>계정이 없습니까 ? ➡️</Link>
      </FormBox>
    </Container>
  );
}

export default Login;

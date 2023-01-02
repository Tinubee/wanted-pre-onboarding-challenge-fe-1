import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { login } from "../api";
import { isLoggedIn } from "../atoms";
import { Button, FormBox, Input } from "./CreateAccount";

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
  const [logIn, setLogIn] = useRecoilState(isLoggedIn);

  const onSubmitValid = async () => {
    const userInfo = getValues();
    const result = await login(userInfo);

    const { message, token } = result;
    console.log(message);
    console.log(token);
    localStorage.setItem("TOKEN", token);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/todo");
    setValue("email", "");
    setValue("password", "");
  };

  useEffect(() => {
    setLogIn(Boolean(localStorage.getItem("isLoggedIn")));
    if (logIn) {
      console.log("로그인");
      navigate("/todo");
    }
  }, [logIn, setLogIn, navigate]);

  return (
    <FormBox>
      <h1>로그인</h1>
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
        <Button disabled={Object.keys(errors).length !== 0} type="submit">
          Login
        </Button>
      </form>
      <Link to={"/sign"}>계정이 없습니까 ? ➡️</Link>
    </FormBox>
  );
}

export default Login;

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createAccount } from "../api";
import Button from "../components/Button";
import FormBox from "../components/FormBox";
import Input from "../components/Input";
import Layout from "../components/Layout";

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;

export const Error = styled.span`
  color: ${(props) => props.theme.errorColor};
  font-size: 18px;
  font-weight: 400;
  margin-top: 5px;
`;

function CreateAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
    <Layout>
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
          />
          <Error>{errors?.password2?.message}</Error>
          <Button value={"회원가입"} disabled={!isValid} type="submit" />
          <Link to={"/auth"}>계정이 있습니까 ? ➡️</Link>
        </form>
      </FormBox>
    </Layout>
  );
}

export default CreateAccount;

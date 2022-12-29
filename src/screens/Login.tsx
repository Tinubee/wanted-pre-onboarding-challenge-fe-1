import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api";

const Input = styled.input`
  font-size: 18px;
  border-radius: 5px;
  padding: 5px;
  width: 30%;
`;

function Login() {
  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitValid = async () => {
    const userInfo = getValues();
    const result = await login(userInfo);

    const { message, token } = result;

    setValue("email", "");
    setValue("password", "");
  };
  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("email", {
            required: "Please write a email",
          })}
          placeholder="Username"
        />
        <Input
          {...register("password", {
            required: "Please write a Password",
          })}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <Link to={"/sign"}>Create Account</Link>
    </div>
  );
}

export default Login;

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { createAccount } from "../api";

const Input = styled.input`
  font-size: 18px;
  border-radius: 5px;
  padding: 5px;
  width: 30%;
`;

function CreateAccount() {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitValid = async () => {
    const userInfo = getValues();
    const result = await createAccount(userInfo);
    console.log(result);
  };
  return (
    <div>
      <h1>CreateAccount Form</h1>
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
        <button type="submit">CreateAccount</button>
      </form>
    </div>
  );
}

export default CreateAccount;

import styled from "styled-components";

export const FormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
    a {
      cursor: pointer;
      :hover {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;

export default FormBox;

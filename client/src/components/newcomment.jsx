import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 5px;
`;
const InputBox = styled.textarea`
  height: 100%;
  flex: 1 0 0;
  resize: none;
  padding: 5px;
`;
const ButtonBox = styled.button`
  width: 10%;
  height: 100%;
`;

export default function NewComment() {
  return (
    <Frame>
      <InputBox></InputBox>
      <ButtonBox>작성</ButtonBox>
    </Frame>
  );
}

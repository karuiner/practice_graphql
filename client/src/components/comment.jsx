import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 5px;
`;
const UserName = styled.div`
  height: 100%;
  width: 10%;
  border: solid 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Etc = styled.div`
  height: 100%;
  width: 20%;
  border: solid 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  height: 100%;
  width: 70%;
  border: solid 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Comment() {
  return (
    <Frame>
      <UserName>name</UserName>
      <Content>content</Content>
      <Etc>time + button</Etc>
    </Frame>
  );
}

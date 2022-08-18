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
  height: 20px;
  width: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

const Sub = styled.div`
  height: 100%;
  flex: 1 0 1;
  display: flex;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  height: calc(100% - 20px);
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentBox = styled.div`
  height: 100%;
  width: calc(90% - 20px);
  border-bottom: solid 1px black;
  border-top: solid 1px black;
  display: flex;
  flex-direction: column;
`;
const RemoveButtonBox = styled.div`
  height: 100%;
  width: 20px;
  display: flex;
  flex-drection: column;
  border-bottom: solid 1px black;
  border-top: solid 1px black;
  border-right: solid 1px black;
`;
const RemoveButton = styled.button`
  height: 20px;
  width: 20px;
`;

export default function Comment({
  noReply,
  showReply,
  writeReply,
  setShowReply,
  setWriteReply,
}) {
  return (
    <Frame>
      <UserName>name</UserName>
      <ContentBox>
        <Content>content</Content>
        <Etc>
          <Sub>작성 시간 : time</Sub>
          {noReply ? null : (
            <Sub
              onClick={() => {
                setShowReply(!showReply);
              }}
            >
              답글보기
            </Sub>
          )}
          {!noReply ? (
            <Sub
              onClick={() => {
                if (setWriteReply !== undefined) {
                  setWriteReply(!writeReply);
                }
              }}
            >
              답글쓰기
            </Sub>
          ) : null}
        </Etc>
      </ContentBox>

      <RemoveButtonBox>
        <RemoveButton>X</RemoveButton>
      </RemoveButtonBox>
    </Frame>
  );
}

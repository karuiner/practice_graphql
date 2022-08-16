import styled from "styled-components";

const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerFrame = styled.div`
  max-width: 800px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  border: solid 1px black;
  display: flex;
`;

const ArticleArea = styled.div`
  width: 100%;
  height: calc(50%);
  border: solid 1px black;
  display: flex;
`;
const ContentArea = styled.div`
  width: 100%;
  min-height: calc(50% - 80px);
  display: flex;
  border: solid 1px black;
  flex-direction: column;
  align-items: center;
`;

const Dummy = styled.div`
  height: 200px;
  width: 500px;
  border: solid 1px black;
`;

function App() {
  return (
    <Frame>
      <InnerFrame>
        <Header></Header>
        <ArticleArea></ArticleArea>
        <ContentArea>
          {Array(10)
            .fill(1)
            .map((x, i) => {
              return <Dummy key={i}></Dummy>;
            })}
        </ContentArea>
      </InnerFrame>
    </Frame>
  );
}

export default App;

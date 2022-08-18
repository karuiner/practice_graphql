import { useState } from "react";
import styled from "styled-components";
import Comment from "./comment";
import NewComment from "./newcomment";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommentInnerBox = styled.div`
  height: ${({ sub }) => (sub ? "90px" : "100px")};
  width: ${({ sub }) => (sub ? "90%" : "100%")};

  padding: 5px;
`;
const NewSubCommentBox = styled.div`
  height: 90px;
  width: 90%;
  padding: 5px;
`;

const CoomentOuterBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default function CommentList({
  comments,
  sub,
  noReply,
  setShowReply,
  writeReply,
  setWriteReply,
}) {
  let [data, setData] = useState(Array(10).fill([false, false]));
  return (
    <Frame>
      {comments.map(([x, y], i) => (
        <CoomentOuterBox key={i}>
          <CommentInnerBox sub={sub}>
            <Comment
              noReply={noReply}
              showReply={x}
              setShowReply={(x) => {
                let z = y;
                if (!x) {
                  z = false;
                }
                setShowReply([
                  ...comments.slice(0, i),
                  [x, z],
                  ...comments.slice(i + 1),
                ]);
              }}
              writeReply={y}
              setWriteReply={(y) => {
                if (x) {
                  setShowReply([
                    ...comments.slice(0, i),
                    [x, y],
                    ...comments.slice(i + 1),
                  ]);
                }
              }}
            ></Comment>
          </CommentInnerBox>
          {x && y ? (
            <NewSubCommentBox>
              <NewComment usb></NewComment>
            </NewSubCommentBox>
          ) : null}
          {!sub && data.length && x > 0 ? (
            <CommentList comments={data} sub noReply></CommentList>
          ) : null}
        </CoomentOuterBox>
      ))}
    </Frame>
  );
}

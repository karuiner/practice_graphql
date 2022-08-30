import { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./comment";
import NewComment from "./newcomment";
import { useQuery } from "graphql-hooks";
import axios from "axios";
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

const getSubComments = `query getSubComments($id: ID!)  {
	subcomments(id: $id) {
	  _id
    writerId {
      _id
      userName
    }
	  comment
	  createdAt
	  updatedAt
	} 
}
`;
const serverURI = "http://localhost:4000/graphql";

export default function CommentList({
  userInfo,
  comments,
  sub,
  noReply,
  setShowReply,
  writeReply,
  setWriteReply,
}) {
  let [tdata, setData] = useState({});
  useEffect(() => {
    if (tdata.length === 0 && comments.length !== 0) {
      let ntdata = {};
      comments.forEach((x) => {
        ntdata[x._id] = [];
      });
      setData(tdata);
    } else if (tdata.length > 0 && tdata.length !== comments.length) {
      let ntdata = {};
      comments.forEach((x) => {
        if (tdata[x._id]) {
          ntdata[x._id] = [];
        }
      });
      setData({ ...tdata, ...ntdata });
    }
  }, [tdata, comments]);

  return (
    <Frame>
      {comments.map(([x, y, cmt], i) => {
        return (
          <CoomentOuterBox key={i}>
            <CommentInnerBox sub={sub}>
              <Comment
                canDelete={userInfo?.userName === cmt?.writerId?.userName}
                data={cmt || {}}
                noReply={noReply}
                showReply={x}
                setShowReply={(x) => {
                  axios
                    .post(serverURI, {
                      query: getSubComments,
                      variables: {
                        id: cmt._id,
                      },
                    })
                    .then((x) => {
                      let newcomments = x.data.data.subcomments.map((x) => [
                        false,
                        false,
                        x,
                      ]);
                      if (newcomments.length > 0) {
                        setData({ ...tdata, [cmt._id]: newcomments });
                      }
                    });
                  let z = y;
                  if (!x) {
                    z = false;
                  }
                  setShowReply([
                    ...comments.slice(0, i),
                    [x, z, cmt],
                    ...comments.slice(i + 1),
                  ]);
                }}
                writeReply={y}
                setWriteReply={(y) => {
                  if (x) {
                    setShowReply([
                      ...comments.slice(0, i),
                      [x, y, cmt],
                      ...comments.slice(i + 1),
                    ]);
                  }
                }}
              ></Comment>
            </CommentInnerBox>
            {x && y && userInfo.status ? (
              <NewSubCommentBox>
                <NewComment usb></NewComment>
              </NewSubCommentBox>
            ) : null}
            {!sub && tdata[cmt._id]?.length > 0 && x ? (
              <CommentList
                userInfo={userInfo}
                id={cmt._id}
                comments={tdata[cmt._id]}
                sub
                noReply
              ></CommentList>
            ) : null}
          </CoomentOuterBox>
        );
      })}
    </Frame>
  );
}

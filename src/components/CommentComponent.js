import { useState } from "react";

function CommentComponent({ parentId, publishReply }) {
  const [commentForm, setCommentForm] = useState({
    name: "",
    comment: "",
    parentId,
  });
  const updateComment = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };
  const submitForm = (e) => {
    if (e.keyCode === 13) {
      publishReply({ ...commentForm, id: Date.now(), replies: [] });
    }
  };
  return (
    <div className="form">
      <form onKeyDown={submitForm}>
        <div className="formGrid">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            value={commentForm.name}
            onChange={updateComment}
          />
          <label htmlFor="comment">Comment</label>
          <input
            name="comment"
            value={commentForm.comment}
            onChange={updateComment}
          />
        </div>
      </form>
    </div>
  );
}
export default CommentComponent;

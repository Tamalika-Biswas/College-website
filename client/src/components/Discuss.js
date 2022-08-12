import Comments from "./comments/Comments";

const Discuss = () => {
  return (
    <div>
      <Comments
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default Discuss;

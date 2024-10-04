import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/types';

interface CommentComponentProps {
  comment: Comment;
}
const CommentComponent = ({ comment }: CommentComponentProps) => {
  //TODO comment DELETE && UPDATE

  return (
    <div data-id={comment.id} className="comment-container flex items-center space-x-4 !my-8">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div>
        <div className="text-gray-500 text-sm">
          <span className="font-bold cursor-pointer hover:underline">
            @{comment.author?.username}
          </span>
          <br />
          <span>Published on {new Date(comment.publishedAt).toLocaleDateString()}</span>
        </div>
        <p> {comment.content}</p>
      </div>
    </div>
  );
};

export default CommentComponent;

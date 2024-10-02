import { Avatar, AvatarImage } from '@/components/ui/avatar';

const CommentComponent = () => {
  return (
    <div className="comment-container flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div>
        <div className="text-gray-500 text-sm font-bold"> @shadcn</div>
        <p> Preview Mode for Headless CMS. Was Good !</p>
      </div>
    </div>
  );
};

export default CommentComponent;

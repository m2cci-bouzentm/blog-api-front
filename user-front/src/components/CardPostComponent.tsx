import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Post } from '@/types';

function truncateText(text: string): string {
  return text.length > 200 ? text.slice(0, 200) + '...' : text;
}

interface CardPostComponentProps {
  post: Post;
}

const CardPostComponent = ({ post }: CardPostComponentProps) => {
  return (
    <Link key={post.id} to={post.id} className="text-inherit font-normal hover:text-inherit">
      <Card className="p-3 md:p-6 w-[95%] lg:w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={
                post.author?.avatarUrl?.length
                  ? post.author?.avatarUrl
                  : 'https://github.com/shadcn.png'
              }
            />
          </Avatar>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              Published on {new Date(post.publishedAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent>
          <div
            className="text-justify w-[90%]"
            dangerouslySetInnerHTML={{ __html: truncateText(post.content) }}
          ></div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardPostComponent;

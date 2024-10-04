import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { useEffect, useState } from 'react';

function truncateText(text: string): string {
  return text.length > 100 ? text.slice(0, 100) + '...' : text;
}

const CardComponent = (post: Post): React.ReactElement => (
  <Link key={post.id} to={post.id} className="text-inherit font-normal hover:text-inherit">
    <Card className="p-3 md:p-6 w-[95%] lg:w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            Published on {new Date(post.publishedAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent>
        <div className="text-justify w-[90%]">{truncateText(post.content)}</div>
      </CardContent>
    </Card>
  </Link>
);

const MainComponent = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold text-black">Blog</h1>
        <h3>A blog built using vite & shadcn. Posts are written with TinyMCE.</h3>
      </div>
      <hr />
      <div className="cards-container grid lg:justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-8">
        {posts ? posts.map((post) => CardComponent(post)) : null}
      </div>
    </>
  );
};

export default MainComponent;

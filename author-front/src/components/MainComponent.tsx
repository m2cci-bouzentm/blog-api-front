import { Post, User } from '@/types';
import { useEffect, useState } from 'react';
import CardPostComponent from './CardPostComponent';

interface MainComponentProps {
  currentUser: User | null;
  isLoggedIn: boolean;
  userToken: string | null;
}
const MainComponent = ({ currentUser, isLoggedIn, userToken }: MainComponentProps) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isPostChange, setIsPostChange] = useState<boolean>(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE_URL + '/posts', {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => console.error(err));
  }, [userToken, isPostChange]);

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold text-black">Blog</h1>
        <h3>A blog built using vite & shadcn. Posts are written with TinyMCE.</h3>
      </div>
      <hr />
      <div className="cards-container grid lg:justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-8">
        {posts &&
          posts.map((post) => (
            <CardPostComponent
              key={post.id}
              post={post}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              userToken={userToken}
              isPostChange={isPostChange}
              setIsPostChange={setIsPostChange}
            />
          ))}
      </div>
    </>
  );
};

export default MainComponent;

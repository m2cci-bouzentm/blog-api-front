import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import CommentComponent from './CommentComponent';

const PostComponent = () => {
  const params = useParams();
  const commentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(params.id);
  }, []);

  const handleAddComment = (): void => {
    const comment = commentRef.current?.value;
    console.log(comment);
    if (commentRef.current) {
      commentRef.current.value = '';
    }
  };

  return (
    <div className="px-32 self-center space-y-8 relative tracking-tight">
      <Link to="/" className="border-none absolute top-10 left-[-180px]">
        {'< See all posts'}
      </Link>

      <div>
        <div className="date-box text-gray-500 text-sm m-0">Published on April 9, 2023</div>
        <h1 className="self-start !mt-0  text-[3rem] text-[#111111] scroll-m-20 font-extrabold lg:text-5xl">
          Preview Mode for Headless CMS
        </h1>
      </div>

      <div className="avatar-box flex items-start space-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div>
          <div className="text-sm font-bold"> Shadcn </div>
          <div className="text-gray-500 text-sm cursor-pointer hover:underline"> @Shadcn </div>
        </div>
      </div>

      <div className="text-justify leading-7 px-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta excepturi vitae
        ipsa, eum magnam minima nisi illo ex qui hic dolorem mollitia vel asperiores assumenda
        laborum! Eos, libero fugit. Cupiditate nobis explicabo accusamus. Distinctio eligendi
        maiores inventore, officia, deserunt similique eaque vitae error nobis dolorem sint numquam
        accusamus earum dolorum! Modi deserunt, doloribus provident porro magnam ipsum dolor
        possimus? Mollitia in amet consectetur eligendi nulla aperiam velit assumenda labore facilis
        nesciunt ducimus, quo temporibus neque, totam minima fugit est molestiae, necessitatibus
        eveniet aliquam fuga laboriosam adipisci ullam? Velit, sunt? Perspiciatis, et autem iste
        tempora, modi voluptates libero necessitatibus architecto voluptas neque hic alias quae sint
        dignissimos aliquam numquam non reiciendis corporis quibusdam voluptatum. Non ipsa tenetur
        laboriosam quisquam asperiores. Sunt reprehenderit laborum asperiores voluptates
        dignissimos, voluptate corporis natus nobis iusto quam nam aliquid aperiam quia harum facere
        vero, dolore atque. Minus ducimus doloribus, quia sint odit nulla vitae distinctio. Quis,
        atque necessitatibus? Minus asperiores, necessitatibus accusamus ipsa non corrupti nam atque
        repellendus at qui repellat sed optio totam itaque dolore rerum amet quaerat, incidunt
        distinctio ullam animi repudiandae doloribus! Voluptate dolore in quos sint dicta quam
        necessitatibus harum reprehenderit aliquid eveniet sapiente earum, consequatur quis,
        reiciendis vitae nesciunt incidunt. Quibusdam veniam rerum possimus sapiente, architecto
        maxime dolores nisi similique. Numquam similique dolorem labore assumenda sequi adipisci
        necessitatibus eos minus ipsum, delectus, architecto eius explicabo quas temporibus saepe
        deserunt eveniet reiciendis voluptatum, atque quaerat. Debitis commodi ea obcaecati neque
        corrupti. Animi ipsa molestias laudantium odio ut doloremque maiores quaerat facere ipsum.
        Hic delectus fuga optio error quidem modi impedit ipsam nostrum. Consectetur nostrum culpa
        et aut, quos asperiores reiciendis fugiat. Qui harum molestias totam nesciunt aliquid
        impedit voluptate saepe laudantium deserunt adipisci libero eligendi animi quisquam mollitia
        modi, maiores repellat fugiat sed. Praesentium sapiente accusamus ex, ipsa totam quisquam
        assumenda.
      </div>

      <div className="comments-container space-y-4 !mt-24">
        <h2 className="text-3xl font-bold text-black">Comments</h2>
        <div className="space-x-4 flex">
          <Input id="comment" name="comment" type="text" ref={commentRef} />
          <Button onClick={handleAddComment} type="submit">
            Add Comment
          </Button>
        </div>
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
      </div>
    </div>
  );
};

export default PostComponent;

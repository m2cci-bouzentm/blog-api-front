import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditorType } from 'tinymce';

interface NewPostComponentProps {
  userToken: string | null;
  currentUser: User | null;
}
interface CreatePostError {
  msg: string;
  location?: string;
  path?: string;
  type?: string;
  value?: string;
}
const NewPostComponent = ({ userToken, currentUser }: NewPostComponentProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<TinyMCEEditorType | null>(null);
  const isPublishedRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);

  const [createPostError, setCreatePostError] = useState<CreatePostError | null>(null);

  const form = useForm();

  const navigate = useNavigate();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.getContent();
    const isPublished = isPublishedRef.current?.checked;
    const thumbnailUrl = thumbnailUrlRef.current?.value;

    if (!content || content.length < 10) {
      return;
    }

    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        title,
        content,
        authorId: currentUser?.id,
        isPublished,
        thumbnailUrl,
      }),
    });

    const logInRes = await res.json();
    console.log(logInRes);

    // add post Errors display
    if (typeof logInRes.errors !== 'undefined') {
      return setCreatePostError(logInRes.errors[0]);
    }

    setCreatePostError(null);
    navigate('/');
  };
  return (
    <Form {...form}>
      <h1 className="font-bold">Create Post</h1>
      <form className="space-y-8 w-[70%] m-auto">
        <FormItem>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" type="text" name="title" ref={titleRef} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="thumbnail">Thumbnail Link</FormLabel>
          <Input id="thumbnail" type="text" name="thumbnail" ref={thumbnailUrlRef} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Editor
            apiKey={import.meta.env.VITE_TINY_API}
            onEditorChange={(evt, editor) => {
              contentRef.current = editor;
            }}
            initialValue="<p>Start crafting your blog post right now !</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="isPublished"> You want to publish it ?</FormLabel>
          <Input defaultChecked={true} type="checkbox" name="isPublished" ref={isPublishedRef} />
        </FormItem>
        {createPostError && <FormMessage>{createPostError.msg}</FormMessage>}
        <Button onClick={handleCreatePost}>Add Post</Button>
      </form>
    </Form>
  );
};

export default NewPostComponent;

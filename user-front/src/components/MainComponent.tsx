import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

function truncateText(text: string): string {
  return text.length > 100 ? text.slice(0, 100) + '...' : text;
}

const dumbText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi nemo facilis dolorum consectetur hic quae unde totam mollitia inventore illum, nihil doloremque rem';

const CardComponent = (paragraph: string): React.ReactElement => (
  <Card className="p-6 w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
    <div className="flex items-center">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <CardHeader>
        <CardTitle>Post title</CardTitle>
        <CardDescription>Post Description</CardDescription>
      </CardHeader>
    </div>
    <CardContent className="">
      <div className="text-justify w-[90%]">{truncateText(paragraph)}</div>
    </CardContent>
  </Card>
);

const MainComponent = () => {
  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold">Blog</h1>
        <h3>A blog built using vite & shadcn. Posts are written with TinyMCE.</h3>
      </div>
      <hr />
      <div className="cards-container grid grid-cols-2 gap-y-8">
        {CardComponent(dumbText)}
        {CardComponent(dumbText)}
        {CardComponent(dumbText)}
        {CardComponent(dumbText)}
        {CardComponent(dumbText)}
        {CardComponent(dumbText)}
      </div>
    </>
  );
};

export default MainComponent;

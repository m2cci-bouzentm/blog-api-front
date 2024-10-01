import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { Link } from '@radix-ui/react-navigation-menu';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <NavigationMenu className="w-[80%] self-center p-10 flex justify-between">
        <NavigationMenuList>
          <NavigationMenuItem className="text-[24px]">
            <NavigationMenuLink className="font-bold">BlogySite</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </NavigationMenu>

      <main className="w-[60%] m-auto space-y-8 TODO mb-[400px]">
        <div className="space-y-4">
          <h1 className="font-bold">Blog</h1>
          <h3>A blog built using vite & shadecn. Posts are written with TinyMCE.</h3>
        </div>
        <hr />
        <div className="cards-container grid grid-cols-2 gap-y-8">
          <Card className="p-6 w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardHeader>
                <CardTitle>Post title</CardTitle>
                <CardDescription>Post Description</CardDescription>
              </CardHeader>
            </div>
            <CardContent className="">
              <div className="truncate text-justify inline-block line-clamp-3 w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi nemo facilis
                dolorum consectetur hic quae unde totam mollitia inventore illum, nihil doloremque
                rem
              </div>
            </CardContent>
          </Card>
          <Card className="p-6 w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardHeader>
                <CardTitle>Post title</CardTitle>
                <CardDescription>Post Description</CardDescription>
              </CardHeader>
            </div>
            <CardContent className="">
              <div className="truncate text-justify inline-block line-clamp-3 w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi nemo facilis
                dolorum consectetur hic quae unde totam mollitia inventore illum, nihil doloremque
                rem
              </div>
            </CardContent>
          </Card>
          <Card className="p-6 w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardHeader>
                <CardTitle>Post title</CardTitle>
                <CardDescription>Post Description</CardDescription>
              </CardHeader>
            </div>
            <CardContent className="">
              <div className="truncate text-justify inline-block line-clamp-3 w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi nemo facilis
                dolorum consectetur hic quae unde totam mollitia inventore illum, nihil doloremque
                rem
              </div>
            </CardContent>
          </Card>
          <Card className="p-6 w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardHeader>
                <CardTitle>Post title</CardTitle>
                <CardDescription>Post Description</CardDescription>
              </CardHeader>
            </div>
            <CardContent className="">
              <div className="truncate text-justify inline-block line-clamp-3 w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi nemo facilis
                dolorum consectetur hic quae unde totam mollitia inventore illum, nihil doloremque
                rem
              </div>
            </CardContent>
          </Card>
          <Card className="p-6 w-[400px] h-[300px] cursor-pointer hover:scale-[101%] transition-all">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardHeader>
                <CardTitle>Post title</CardTitle>
                <CardDescription>Post Description</CardDescription>
              </CardHeader>
            </div>
            <CardContent className="">
              <div className="truncate text-justify inline-block line-clamp-3 w-[90%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi nemo facilis
                dolorum consectetur hic quae unde totam mollitia inventore illum, nihil doloremque
                rem
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

export default App;

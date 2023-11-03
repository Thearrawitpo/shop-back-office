import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

export default function UserMenu() {
  // const { data: session, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex items-center gap-2'>
          <Image src='/user.png' alt='user' width={40} height={40} />
          {/* {session?.user?.name} */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuItem onClick={() => {}}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

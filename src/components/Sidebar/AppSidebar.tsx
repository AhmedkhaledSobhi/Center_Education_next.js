import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import { User2, GraduationCap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronsUpDown,
  GraduationCap,
  LogOut,
  Plus,
  Settings,
  User2,
} from "lucide-react";
import links from "./LayoutMenuData";
type AppSidebarProps = {
  side?: "left" | "right";
};

export function AppSidebar({ side = "left" }: AppSidebarProps) {
  const { isMobile } = useSidebar()

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
  // import links from "";

  return (
    <Sidebar side={side} collapsible="icon" className="Sidebar">
      <SidebarHeader className="border-b p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="
                h-auto
                cursor-default
                bg-transparent!
                hover:bg-transparent!
                active:bg-transparent!
                focus-visible:bg-transparent!
                data-[active=true]:bg-transparent!
                data-[state=open]:bg-transparent!
              "
            >
              <div className="flex w-full items-center justify-center text-white">
                <div dir="rtl" className="flex items-center gap-2">
                  <div className="size-14 shrink-0 flex  items-center justify-center rounded-xl bg-white/10">
                    <GraduationCap size={40} />
                  </div>
                  <div className="group-data-[collapsible=icon]:hidden">
                    <h2 className="text-4xl font-bold tracking-wide">
                      CENTER
                    </h2>
                    <p className="text-xl tracking-[4px]">
                      EDUCATION
                    </p>
                  </div>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 cursor-pointer bg-sidebar-accent  hover:bg-sidebar-accent-hover focus:bg-sidebar-accent-hover"
              >
                <Avatar className="h-8 w-8 ">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full border border-black/25">
                    <User2 className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-right text- white text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                {/* <ChevronsUpDown className="ml-auto size-4" /> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="start"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User2 className="mr-2 size-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
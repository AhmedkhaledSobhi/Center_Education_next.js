import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { User2, GraduationCap } from "lucide-react"

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
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
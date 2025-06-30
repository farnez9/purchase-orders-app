import { ListOrdered, ShoppingCart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/Sidebar";

const items = [
  {
    title: "Purchase",
    url: "/purchase",
    icon: ShoppingCart,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ListOrdered,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="fixed bg-white h-full z-50">
      <SidebarTrigger />
      <SidebarHeader>Purchase App</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

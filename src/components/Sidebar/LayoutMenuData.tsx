import React from 'react'
import { BiCategory } from 'react-icons/bi';
import { CiHome } from 'react-icons/ci';
import { IoMdSettings } from 'react-icons/io';

export type SubItemType = {
  id: string;
  label: string;
  link: string;
};
export type LinkType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  link: string;
  click: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  subItems?: SubItemType[],
}

const links: LinkType[] = [
  {
    id: "dashboards",
    label: "SidebarMenu.Dashboard",
    icon: <BiCategory className='text-xl'/>,
    link: "/#",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "Main ",
        label: "SidebarMenu.Main",
        link: "/dashboard"
      },
    ].filter(Boolean),
  },
  {
    id: "orders",
    label: "SidebarMenu.Orders",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      // {
      //   id: "order",
      //   label: "SidebarMenu.orders",
      //   link: "/orders"
      // },
      {
        id: "sales",
        label: "SidebarMenu.Sales",
        link: "/sales"
      },
    ].filter(Boolean),
  },
  {
    id: "Setting",
    label: "SidebarMenu.Setting",
    icon: <IoMdSettings className='text-xl' />,
    link: "/register",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "sales",
        label: "SidebarMenu.Sales",
        link: "/sales"
      },
    ].filter(Boolean),
  },
];



export default links ;

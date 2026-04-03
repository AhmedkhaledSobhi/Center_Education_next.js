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
    label: "Dashboard",
    icon: <BiCategory className='text-xl'/>,
    link: "/#",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "dashboard ",
        label: "Dashboard",
        link: "/dashboard"
      },
    ].filter(Boolean),
  },
  {
    id: "orders",
    label: "Orders",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "order",
        label: "orders",
        link: "/orders"
      },
      {
        id: "sales",
        label: "Sales",
        link: "/login"
      },
    ].filter(Boolean),
  },
  {
    id: "products",
    label: "Products",
    icon: <IoMdSettings className='text-xl' />,
    link: "/register",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      
    ].filter(Boolean),
  },
];



export default links ;

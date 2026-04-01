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
    id: "dashboard",
    label: "Dashboard",
    icon: <BiCategory className='text-xl'/>,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "dashboard ",
        label: "dashboard",
        link: "/"
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
        id: "orders",
        label: "orders",
        link: "/orders"
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },
  {
    id: "products",
    label: "Products",
    icon: <IoMdSettings className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analytics",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },

  {
    id: "dashboarda",
    label: "Dashboard",
    icon: <BiCategory className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "dashboard ",
        label: "dashboard",
        link: "/"
      },
    ].filter(Boolean),
  },
  {
    id: "ordersa",
    label: "Orders",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analyticsa",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },
  {
    id: "productsa",
    label: "Products",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analytics",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },

  {
    id: "dashboardas",
    label: "Dashboard",
    icon: <BiCategory className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "dashboard ",
        label: "dashboard",
        link: "/"
      },
    ].filter(Boolean),
  },
  {
    id: "ordersas",
    label: "Orders",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analyticsa",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },
  {
    id: "productsas",
    label: "Products",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analytics",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },

  {
    id: "dashboardaf",
    label: "Dashboard",
    icon: <BiCategory className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "dashboard ",
        label: "dashboard",
        link: "/"
      },
    ].filter(Boolean),
  },
  {
    id: "ordersaf",
    label: "Orders",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analyticsa",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },
  {
    id: "productsaf",
    label: "Products",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analyticsf",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },

  {
    id: "dashboardaj",
    label: "Dashboard",
    icon: <BiCategory className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "dashboard ",
        label: "dashboard",
        link: "/"
      },
    ].filter(Boolean),
  },
  {
    id: "ordersaj",
    label: "Orders",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analyticsa",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },
  {
    id: "productsaj",
    label: "Products",
    icon: <CiHome className='text-xl' />,
    link: "",
    click: function (e) {
      e.preventDefault();
    },
    subItems: [
      {
        id: "analytics",
        label: "Analytics",
        link: ""
      },
      {
        id: "sales",
        label: "Sales",
        link: ""
      },
    ].filter(Boolean),
  },
];

export default links;

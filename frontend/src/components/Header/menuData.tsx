import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Cloud Services",
    path: "/CloudServices",
    newTab: false,
  },
  {
    id: 6,
    title: "AWS",
    path: "/aws",
    newTab: false,
  },
  {
    id: 3,
    title: "DevOps",
    path: "/DevOps",
    newTab: false,
  },
  {
    id: 4,
    title: "IT Outsourcing",
    path: "/ItOutsourcing",
    newTab: false,
  },
  {
    id: 5,
    title: "About",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "About Us",
        path: "/about",
        newTab: false,
      },
      {
        id: 52,
        title: "Contact Us",
        path: "/contact",
        newTab: false,
      },
      {
        id: 53,
        title: "Blogs",
        path: "/blog",
        newTab: false,
      },
    ],
  },
  
];
export default menuData;

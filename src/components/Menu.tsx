import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
      },
      {
        icon: "/user.png",
        label: "Users",
        href: "/list/users",
      },
      {
        icon: "/staff.png",
        label: "Staffs",
        href: "/list/staffs",
      },
      {
        icon: "/contact.png",
        label: "Contacts",
        href: "/list/contacts",
      },
      {
        icon: "/vendor.png",
        label: "Vendors",
        href: "/list/vendors",
      },
      {
        icon: "/goldPrice.png",
        label: "Gold price",
        href: "/list/goldPrices",
      },
      {
        icon: "/product.png",
        label: "Products",
        href: "/list/products",
      },
      {
        icon: "/orderDetails.png",
        label: "Order details",
        href: "/list/orderDetails",
      },
      {
        icon: "/cashDrawer.png",
        label: "Cash drawers",
        href: "/list/cashDrawers",
      },
      {
        icon: "/cashFlow.png",
        label: "Cash flow statements",
        href: "/list/cashFlows",
      },
      {
        icon: "/report.png",
        label: "Report",
        href: "/report",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-400 py-2"
            >
              <Image src={item.icon} alt="" width={20} height={20}></Image>
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Menu;

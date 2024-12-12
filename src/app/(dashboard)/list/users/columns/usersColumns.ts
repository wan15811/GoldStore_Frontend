export const usersColumns: TableColumn[] = [
  {
    header: "Tên Tài Khoản",
    accessor: "username",
  },
  {
    header: "Chức Vụ",
    accessor: "role",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden md:table-cell",
  },
  {
    header: "Người Dùng",
    accessor: "staff",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

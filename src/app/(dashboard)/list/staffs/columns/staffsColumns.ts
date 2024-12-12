export const staffsColumns: TableColumn[] = [
  {
    header: "Tên Nhân Viên",
    accessor: "name",
  },
  {
    header: "Số Điện Thoại",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Địa Chỉ",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

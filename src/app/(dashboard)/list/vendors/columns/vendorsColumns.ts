export const vendorColumns: TableColumn[] = [
  {
    header: "Tên Đại Lý",
    accessor: "vendorName",
  },
  {
    header: "Mã",
    accessor: "vendorCode",
    className: "hidden md:table-cell",
  },
  {
    header: "Địa Chỉ",
    accessor: "vendorAddress",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

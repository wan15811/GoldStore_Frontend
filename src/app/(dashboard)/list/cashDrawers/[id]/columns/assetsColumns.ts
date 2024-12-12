export const assetsColumns: TableColumn[] = [
  {
    header: "Loại tài sản",
    accessor: "assetsType",
  },
  {
    header: "Số tiền",
    accessor: "amount",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

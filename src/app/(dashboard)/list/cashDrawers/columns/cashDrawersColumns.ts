export const cashDrawersColumns: TableColumn[] = [
  {
    header: "Tên tủ",
    accessor: "drawerName",
  },
  {
    header: "Loại tủ",
    accessor: "drawerType",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

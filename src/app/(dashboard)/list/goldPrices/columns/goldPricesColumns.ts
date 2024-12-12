export const goldPricesColumns: TableColumn[] = [
  {
    header: "Loại Vàng",
    accessor: "goldType",
  },
  {
    header: "Giá Mua (đ/chỉ)",
    accessor: "askPrice",
    className: "hidden md:table-cell",
  },
  {
    header: "Giá Bán (đ/chỉ)",
    accessor: "bidPrice",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

export const goldPricesColumns: TableColumn[] = [
  {
    header: "Loại Vàng",
    accessor: "goldType",
  },
  {
    header: "Giá Mua",
    accessor: "askPrice",
    className: "hidden md:table-cell",
  },
  {
    header: "Giá Bán",
    accessor: "bidPrice",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

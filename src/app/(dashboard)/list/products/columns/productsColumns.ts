export const productsColumns: TableColumn[] = [
  {
    header: "Thông Tin Sản Phẩm",
    accessor: "productInfo",
  },
  {
    header: "Phân Loại, Loại Vàng",
    accessor: "category/goldType",
    className: "hidden md:table-cell",
  },
  {
    header: "Đại Lý Phân Phối",
    accessor: "vendorCode",
    className: "hidden md:table-cell",
  },
  {
    header: "Tổng Trọng Lượng(chỉ)",
    accessor: "totalWeight",
    className: "hidden md:table-cell",
  },
  {
    header: "Trọng Lượng Vàng(chỉ)",
    accessor: "goldWeight",
    className: "hidden md:table-cell",
  },
  {
    header: "Trọng Lượng Đá(chỉ)",
    accessor: "gemWeight",
    className: "hidden md:table-cell",
  },
  {
    header: "Tiền Công",
    accessor: "wage",
    className: "hidden md:table-cell",
  },
  {
    header: "Thao Tác",
    accessor: "action",
  },
];

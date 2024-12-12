export const contactsColumns: TableColumn[] = [
  {
    header: "Tên Người Gọi",
    accessor: "name",
  },
  {
    header: "Phân Loại",
    accessor: "phoneType",
    className: "hidden md:table-cell",
  },
  {
    header: "Số Điện Thoại",
    accessor: "phone",
  },
  {
    header: "Ghi Chú",
    accessor: "description",
    className: "hidden md:table-cell",
  },
];

type TableProps = {
  data: any[];
  columns: TableColumn[];
  renderRow: (item: any) => React.ReactNode;
  isLoading: boolean;
};

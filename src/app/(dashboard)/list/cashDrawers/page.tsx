"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Paginatiion";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { vietnameseTrans } from "@/lib/vietnameseTrans";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cashDrawersColumns } from "./columns/cashDrawersColumns";
import { getAllCashDrawers } from "@/services/cashDrawers";
import Link from "next/link";

type CashDrawer = {
  id: number;
  drawerName: string;
  drawerType: string;
  createdAt: string;
  updatedAt: string;
};

const CashDrawerListPage = () => {
  const [cashDrawers, setCashDrawers] = useState<CashDrawer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState(SnackbarMessageType.Info);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCashDrawers = async () => {
      try {
        setIsLoading(true);
        const response = await getAllCashDrawers(currentPage);
        setCashDrawers(response.body);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error("Error fetch cash drawer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCashDrawers();
  }, [currentPage]);

  useEffect(() => {
    const fetchCashDrawers = async () => {
      try {
        if (isRefresh) {
          setIsLoading(true);
          const response = await getAllCashDrawers(currentPage);
          if (response.body.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            setCashDrawers(response.body);
          }
          setTotalPages(response.last_page);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
        setIsRefresh(false);
      }
    };

    fetchCashDrawers();
  }, [currentPage, isRefresh]);

  useEffect(() => {
    if (showMessage === true) {
      toast(message, { type: messageType });
      setShowMessage(false);
    }
  }, [showMessage, message, messageType]);

  const renderRow = (item: CashDrawer) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-200"
    >
      <td className="flex items-center gap-4 p-4">
        {item?.drawerName}
      </td>
      <td className="hidden md:table-cell">
        {item?.drawerType}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/cashDrawers/${item.id}`} className="flex items-center justify-center w-7 h-7 bg-gray-300 rounded-3xl">
            <Image src="/search.png" alt="" width={14} height={14} />
          </Link>
          <FormModal
            table="cashDrawer"
            type="delete"
            id={item.id}
            setIsRefresh={setIsRefresh}
            setShowMessage={setShowMessage}
            setMessageType={setMessageType}
            setMessage={setMessage}
          />
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-md p-4 flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-lg">Tủ thu ngân</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            <FormModal
              table="cashDrawer"
              type="create"
              setIsRefresh={setIsRefresh}
              setShowMessage={setShowMessage}
              setMessageType={setMessageType}
              setMessage={setMessage}
            />
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table
        data={cashDrawers}
        columns={cashDrawersColumns}
        renderRow={renderRow}
        isLoading={isLoading}
      />
      {/* PAGINATION */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};
export default CashDrawerListPage;

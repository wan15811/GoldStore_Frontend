"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Paginatiion";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { vietnameseTrans } from "@/lib/vietnameseTrans";
import { getAllGoldPrices } from "@/services/goldPrice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { goldPricesColumns } from "./columns/goldPricesColumns";

type GoldPrice = {
  goldType: string;
  askPrice: number;
  bidPrice: number;
  createdAt: string;
  updatedAt: string;
};

const GoldPriceListPage = () => {
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState(SnackbarMessageType.Info);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchGoldPrices = async () => {
      try {
        setIsLoading(true);
        const response = await getAllGoldPrices(currentPage);

        setGoldPrices(response.body);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoldPrices();
  }, [currentPage]);

  useEffect(() => {
    const fetchGoldPrices = async () => {
      try {
        if (isRefresh) {
          setIsLoading(true);
          const response = await getAllGoldPrices(currentPage);
          if (response.body.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            setGoldPrices(response.body);
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

    fetchGoldPrices();
  }, [currentPage, isRefresh]);

  useEffect(() => {
    if (showMessage === true) {
      toast(message, { type: messageType });
      setShowMessage(false);
    }
  }, [showMessage, message, messageType]);

  const renderRow = (item: GoldPrice) => (
    <tr
      key={item.goldType}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-200"
    >
      <td className="flex items-center gap-4 p-4">
        {vietnameseTrans[item.goldType]}
      </td>
      <td className="hidden md:table-cell">
        {item.askPrice.toLocaleString()},000
      </td>
      <td className="hidden md:table-cell">
        {item.bidPrice.toLocaleString()},000
      </td>
      <td>
        <div className="flex items-center gap-2">
          <>
            <FormModal
              table="goldPrice"
              type="update"
              data={item}
              setIsRefresh={setIsRefresh}
              setShowMessage={setShowMessage}
              setMessageType={setMessageType}
              setMessage={setMessage}
            />
          </>
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-md p-4 flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-lg">Giá Vàng</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-buttonColor">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-buttonColor">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table
        data={goldPrices}
        columns={goldPricesColumns}
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
export default GoldPriceListPage;

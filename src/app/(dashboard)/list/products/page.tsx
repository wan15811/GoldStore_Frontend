"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Paginatiion";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { productsColumns } from "./columns/productsColumns";
import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { vietnameseTrans } from "@/lib/vietnameseTrans";
import { getAllProducts } from "@/services/products";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllVendors } from "@/services/vendors";
import { getAllGoldPrices } from "@/services/goldPrice";

type Product = {
  id: number;
  productName: string;
  category: string;
  totalWeight: number;
  goldWeight: number;
  gemWeight: number;
  wage: number;
  createdAt: string;
  updatedAt: string;
  goldPrice: {
    goldType: string;
  };
  vendor: {
    id: number;
    vendorName: string;
    vendorAddress: string;
  };
};

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [goldPrices, setGoldPrices] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState(SnackbarMessageType.Info);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVendorsGoldPrices = async () => {
      try {
        setIsLoading(true);
        const vendors = await getAllVendors(-1);
        setVendors(vendors);
        const goldPrices = await getAllGoldPrices(-1);
        setGoldPrices(goldPrices);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorsGoldPrices();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProducts(currentPage);

        setProducts(response.body);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isRefresh) {
          setIsLoading(true);
          const response = await getAllProducts(currentPage);
          if (response.body.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            setProducts(response.body);
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

    fetchProducts();
  }, [currentPage, isRefresh]);

  useEffect(() => {
    if (showMessage === true) {
      toast(message, { type: messageType });
      setShowMessage(false);
    }
  }, [showMessage, message, messageType]);

  const renderRow = (item: Product) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-200"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.productName}</h3>
          <p className="text-xs text-gray-500">{item.id}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {vietnameseTrans[item.category]}{" "}
        {vietnameseTrans[`category_${item.goldPrice.goldType}`]}
      </td>
      <td className="hidden md:table-cell">{item.vendor.vendorName}</td>
      <td className="hidden md:table-cell">
        {parseFloat(item.totalWeight.toString())}
      </td>
      <td className="hidden md:table-cell">
        {parseFloat(item.goldWeight.toString())}
      </td>
      <td className="hidden md:table-cell">
        {parseFloat(item.gemWeight.toString())}
      </td>
      <td className="hidden md:table-cell">{item.wage}.000 đ</td>
      <td>
        <div className="flex items-center gap-2">
          <>
            <FormModal
              table="product"
              type="update"
              data={item}
              setIsRefresh={setIsRefresh}
              setShowMessage={setShowMessage}
              setMessageType={setMessageType}
              setMessage={setMessage}
              relatedData={{
                vendors: vendors,
                goldPrices: goldPrices,
              }}
            />
            <FormModal
              table="product"
              type="delete"
              id={item.id}
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
        <h1 className="hidden md:block font-semibold text-lg">Sản Phẩm</h1>
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
              table="product"
              type="create"
              setIsRefresh={setIsRefresh}
              setShowMessage={setShowMessage}
              setMessageType={setMessageType}
              setMessage={setMessage}
              relatedData={{
                vendors: vendors,
                goldPrices: goldPrices,
              }}
            />
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table
        data={products}
        columns={productsColumns}
        renderRow={renderRow}
        isLoading={isLoading}
      />
      {/* PAGINATION */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default ProductListPage;

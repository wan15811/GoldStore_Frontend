"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Paginatiion";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { vietnameseTrans } from "@/lib/vietnameseTrans";
import { getAllStaffs } from "@/services/staffs";
import { getAllUsers } from "@/services/users";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usersColumns } from "./columns/usersColumns";

type User = {
  id: number;
  role: string;
  email: string;
  username: string;
  staff: {
    id: number;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
};

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState(SnackbarMessageType.Info);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        setIsLoading(true);
        const response = await getAllStaffs(-1);
        setStaffs(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  useEffect(() => {
    const fetchUsersStaffs = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUsers(currentPage);
        setUsers(response.body);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersStaffs();
  }, [currentPage]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (isRefresh) {
          setIsLoading(true);
          const response = await getAllUsers(currentPage);
          if (response.body.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            setUsers(response.body);
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

    fetchUsers();
  }, [currentPage, isRefresh]);

  useEffect(() => {
    if (showMessage === true) {
      toast(message, { type: messageType });
      setShowMessage(false);
    }
  }, [showMessage, message, messageType]);
  const renderRow = (item: User) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-200"
    >
      <td className="flex items-center gap-4 p-4">{item.username}</td>
      <td className="hidden md:table-cell">{vietnameseTrans[item.role]}</td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">
        {item.staff
          ? `${item.staff.firstName} ${item.staff.lastName}`
          : "Ẩn danh"}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <>
            <FormModal
              table="user"
              type="update"
              data={item}
              relatedData={{
                staffs: staffs,
              }}
              setIsRefresh={setIsRefresh}
              setShowMessage={setShowMessage}
              setMessageType={setMessageType}
              setMessage={setMessage}
            />
            <FormModal
              table="user"
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
        <h1 className="hidden md:block font-semibold text-lg">
          Tài Khoản Nhân Viên
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table
        data={users}
        columns={usersColumns}
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
export default UserListPage;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiSearch, FiArrowLeft, FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import { useRouter } from "next/router";

const ModalData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;
  const [filterOption, setFilterOption] = useState("All");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/manage/listpass-api?filter=${filterOption}&searchQuery=${searchQuery}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.log("Data is not an array", result);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterOption, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const router = useRouter();

  const handleAdd = () => {
    router.push("/components/Modal/ModalAdd");
  };

  const handleEdit = (row) => {
    router.push(`/components/Modal/ModalEdit/${row.id}`);
  };
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  // const handleEdit = (row) => {
  //   setEditingItem({
  //     id: row.id,
  //     FTUsrAgent: row.FTUsrAgent,
  //     FTUsrName: row.FTUsrName,
  //     FTUsrPass: row.FTUsrPass,
  //     FTRemark: row.FTRemark,
  //   });
  // };

  const handleSaveEdit = (updatedItem) => {
    const updatedData = data.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setData(updatedData);
    setEditingItem(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          item.FTUsrAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.FTUsrName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.FTUsrPass.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const columns = [
    {
      name: <span className="font-kanit text-base text-center">ลำดับ</span>,
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: true,
      cell: (row, index) => (
        <div className="flex justify-center items-center">
          {(currentPage - 1) * rowsPerPage + index + 1}
        </div>
      ),
    },
    {
      name: <span className="font-kanit text-base">รหัสตัวแทน</span>,
      selector: (row) => row.FTUsrAgent,
      sortable: true,
    },
    {
      name: <span className="font-kanit text-base">ชื่อผู้ใช้</span>,
      selector: (row) => row.FTUsrName,
      sortable: true,
    },
    {
      name: <span className="font-kanit text-base">รหัสผ่าน</span>,
      selector: (row) => row.FTUsrPass,
      sortable: true,
    },
    {
      name: <span className="font-kanit text-base">หมายเหตุ</span>,
      selector: (row) => row.FTRemark,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white p-2 rounded font-kanit font-semibold"
          >
            <FiTrash className="text-white text-xl" />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="bg-amber-500 text-white p-2 rounded font-kanit font-semibold"
          >
            <FiEdit className="text-white text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <div className="mockup-browser bg-[#F9FCFB] border w-full max-w-4xl mx-auto my-8 h-[850px]">
        <div className="mockup-browser-toolbar">
          <div className="input font-kanit font-bold ">ข้อมูลรหัสผ่าน</div>
        </div>
        <div className="bg-base-100 flex justify-center">
          <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
              {!editingItem && (
                <div className="flex flex-wrap items-center space-y-2 md:space-y-0 md:space-x-2">
                  <select
                    className="w-full md:w-32 h-10 px-3 py-2 text-sm border-2 border-black focus:outline-none bg-white font-kanit font-semibold rounded-lg"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="KingKong">KingKong</option>
                    <option value="Blackpink">Blackpink</option>
                    <option value="Soul88">Soul88</option>
                  </select>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-full md:w-64 h-10 px-3 py-2 text-sm border-2 border-black focus:outline-none bg-white font-kanit font-semibold rounded-lg"
                  />
                </div>
              )}
            </div>

            {editingItem ? (
              editingItem.id ? (
                <ModalEdit
                  editingItem={editingItem}
                  setEditingItem={setEditingItem}
                  onSave={handleSaveEdit}
                  onCancel={() => setEditingItem(null)}
                />
              ) : (
                <ModalAdd
                  onCancel={() => setEditingItem(null)}
                  onAdd={(newItem) => {
                    setData([...data, newItem]);
                    setEditingItem(null);
                  }}
                />
              )
            ) : (
              // <div className="overflow-hidden rounded-lg  shadow-md">
              <div
                className="overflow-hidden rounded-lg shadow-md"
                style={{ height: "540px" }}
              >
                <DataTable
                  columns={columns}
                  data={currentData}
                  pagination={false}
                />
              </div>
            )}

            {!editingItem && (
              <div>
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-1 mx-1 rounded ${
                        currentPage === index + 1
                          ? "bg-black text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded font-kanit font-semibold flex items-center"
                  >
                    <FiPlus className="mr-2" />{" "}
                    {/* ใช้ไอคอน FiPlus จาก react-icons */}
                    เพิ่มข้อมูล
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalData;
import React, { useState } from "react";
import Modal from "react-modal";
import DataTable from "react-data-table-component";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { FaList } from "react-icons/fa6";
import { IoCaretBack } from "react-icons/io5";

Modal.setAppElement("#__next");

const ModalData = ({ isOpen, onClose }) => {
  const [data, setData] = useState([
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
    { id: 3, name: "Item 3", description: "Description 3" },
    { id: 4, name: "Item 4", description: "Description 4" },
    { id: 5, name: "Item 5", description: "Description 5" },
    { id: 6, name: "Item 6", description: "Description 6" },
    { id: 7, name: "Item 7", description: "Description 7" },
    { id: 8, name: "Item 8", description: "Description 8" },
    { id: 9, name: "Item 9", description: "Description 9" },
    { id: 10, name: "Item 10", description: "Description 10" },
    { id: 11, name: "Item 11", description: "Description 11" },
    { id: 12, name: "Item 12", description: "Description 12" },
    { id: 13, name: "Item 13", description: "Description 13" },
    { id: 14, name: "Item 14", description: "Description 14" },
    { id: 15, name: "Item 15", description: "Description 15" },
    { id: 16, name: "Item 16", description: "Description 16" },
    { id: 17, name: "Item 17", description: "Description 17" },
    { id: 18, name: "Item 18", description: "Description 18" },
    { id: 19, name: "Item 19", description: "Description 19" },
    { id: 20, name: "Item 20", description: "Description 20" },
    { id: 21, name: "Item 21", description: "Description 21" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // สร้าง state สำหรับช่องค้นหา
  const rowsPerPage = 10;

  const [filterOption, setFilterOption] = useState("option1");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAdd = () => {
    const newItem = {
      id: data.length + 1,
      name: `Item ${data.length + 1}`,
      description: `Description ${data.length + 1}`,
    };
    setData([...data, newItem]);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to edit
  };

  const handleSaveEdit = () => {
    setData(
      data.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    setEditingItem(null); // Close the edit form
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      // name: "NO",
      // selector: (row) => row.id,
      // sortable: true,
      name: <span className="font-kanit text-base ">ลำดับ</span>, // กำหนดฟอนต์ที่นี่
      selector: (row) => row.id,
      sortable: true,
    },
    {
      // name: " Username ",
      // selector: (row) => row.name,
      // sortable: true,
      name: <span className="font-kanit text-base">ชื่อผู้ใช้</span>, // กำหนดฟอนต์ที่นี่
      selector: (row) => row.name,
      sortable: true,
    },
    {
      // name: " Password ",
      // selector: (row) => row.description,
      name: <span className="font-kanit text-base"> รหัสผ่าน </span>, // กำหนดฟอนต์ที่นี่
      selector: (row) => row.description,
      sortable: true,
      
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white px-2 py-1 rounded font-kanit font-semibold "
          >
            ลบข้อมูล
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="bg-blue-500 text-white px-2 py-1 rounded font-kanit font-semibold " 
          >
            แก้ไขข้อมูล
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Data Table Modal"
      className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-4xl w-full mx-auto transition-all duration-300 ease-in-out"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold kanit-font text-[#333333]">ข้อมูลรหัสผ่าน</h2>

        {/* ใช้เงื่อนไขการแสดงผลปุ่ม Add และ Search */}
        {!editingItem && (
          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 text-sm w-32 h-10 border-2 border-black focus:outline-none bg-white font-kanit font-semibold"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="option1">All</option>
              <option value="option2">KingKong</option>
              <option value="option3">Blackpink</option>
              <option value="option4">Soul88</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-3 py-2 text-sm w-64 border-2 border-black focus:outline-none bg-white font-kanit font-semibold"
            />
          </div>
        )}
      </div>

      {editingItem ? (
        <div>
          <h3 className="text-xl font-semibold mb-4 font-kanit font-bold">แก้ไขข้อมูล</h3>

          <div className="mb-4">
            {/* <label className="block text-sm font-kanit font-semibold"> Web </label> */}
            <select
              value={editingItem.option}
              onChange={(e) =>
                setEditingItem({ ...editingItem, option: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black bg-white rounded"
            >
              <option value="option1">All</option>
              <option value="option2">KingKong</option>
              <option value="option3">Blackpink</option>
              <option value="option4">Soul88</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-kanit font-semibold"> ชื่อผู้ใช้ </label>
            <input
              type="text"
              value={editingItem.username}
              onChange={(e) =>
                setEditingItem({ ...editingItem, username: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black bg-white rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-kanit font-semibold"> รหัสผ่าน </label>
            <input
              type="password"
              value={editingItem.password}
              onChange={(e) =>
                setEditingItem({ ...editingItem, password: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black bg-white rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-kanit font-semibold">หมายเหตุ</label>
            <textarea
              value={editingItem.notes}
              onChange={(e) =>
                setEditingItem({ ...editingItem, notes: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black bg-white rounded"
              rows="4"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEditingItem(null)}
              className="bg-amber-500 text-white px-4 py-2 rounded font-kanit font-semibold flex items-center"
            >
              <IoCaretBack className="mr-2" /> {/* ไอคอนกลับ */}
              กลับ
            </button>

            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded font-kanit font-semibold"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={currentData}
          pagination={false} // Disable pagination when editing
        />
      )}

      {/* แสดงปุ่มการทำงานด้านล่างเฉพาะเมื่อไม่ได้อยู่ในโหมด Edit */}
      {!editingItem && (
        <div>
          {/* ปุ่มเพจ */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* ปุ่มเพิ่มข้อมูลและปิด */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded font-kanit font-semibold"
            >
              เพิ่มข้อมูล
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded font-kanit font-semibold"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

    </Modal>
  );
};

export default ModalData;

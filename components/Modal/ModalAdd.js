// next-js-bet\components\Modal\ModalAdd.js
import { useState } from "react";
import { IoCaretBack } from "react-icons/io5";

const ModalAdd = ({ onSave, onCancel }) => {
  const [newItem, setNewItem] = useState({
    FTUsrAgent: "All",
    FTUsrName: "",
    FTUsrPass: "",
    FTRemark: "",
  });

  const handleSave = async (newItem) => {
 
  };
  

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 font-kanit font-bold">เพิ่มข้อมูล</h3>

      {/* Input Fields */}
      <div className="mb-4">
        <select
          value={newItem.FTUsrAgent}
          onChange={(e) => setNewItem({ ...newItem, FTUsrAgent: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black bg-white rounded"
        >
          <option value="All">All</option>
          <option value="KingKong">KingKong</option>
          <option value="Blackpink">Blackpink</option>
          <option value="Soul88">Soul88</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-kanit font-semibold">ชื่อผู้ใช้</label>
        <input
          type="text"
          value={newItem.FTUsrName}
          onChange={(e) => setNewItem({ ...newItem, FTUsrName: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black bg-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-kanit font-semibold">รหัสผ่าน</label>
        <input
          type="text"
          value={newItem.FTUsrPass}
          onChange={(e) => setNewItem({ ...newItem, FTUsrPass: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black bg-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-kanit font-semibold">หมายเหตุ</label>
        <textarea
          value={newItem.FTRemark}
          onChange={(e) => setNewItem({ ...newItem, FTRemark: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black bg-white rounded"
          rows="4"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="bg-amber-500 text-white px-4 py-2 rounded font-kanit font-semibold flex items-center"
        >
          <IoCaretBack className="mr-2" /> กลับ
        </button>

        <button
          onClick={handleSave}
          className="bg-green-700 text-white px-4 py-2 rounded font-kanit font-semibold"
        >
          เพิ่มข้อมูล
        </button>
      </div>
    </div>
  );
};

export default ModalAdd;

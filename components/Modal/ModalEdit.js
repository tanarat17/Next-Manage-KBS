import { useState } from "react";
import { IoCaretBack } from "react-icons/io5";

const ModalEdit = ({ editingItem, onSave, onCancel }) => {
  const [editedItem, setEditedItem] = useState({ ...editingItem });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (editedItem.FTUsrID && editedItem.FTUsrName && editedItem.FTUsrPass) {
      try {
        setLoading(true);
        const response = await fetch("/api/manage/listpass-api", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedItem), // ส่งข้อมูลไปยัง API
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("บันทึกข้อมูลสำเร็จ");
          onSave(result); // แจ้งให้ parent component ทราบ
        } else {
          alert(`เกิดข้อผิดพลาด: ${result.error || "ไม่สามารถบันทึกข้อมูลได้"}`);
        }
      } catch (error) {
        console.error("Error updating data:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
      } finally {
        setLoading(false);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };
  

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 font-kanit font-bold">แก้ไขข้อมูล</h3>

      {/* Input Fields */}
      <div className="mb-4">
        <select
          value={editedItem.FTUsrAgent}
          onChange={(e) => setEditedItem({ ...editedItem, FTUsrAgent: e.target.value })}
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
          value={editedItem.FTUsrName}
          onChange={(e) => setEditedItem({ ...editedItem, FTUsrName: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black bg-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-kanit font-semibold">รหัสผ่าน</label>
        <input
          type="text"
          value={editedItem.FTUsrPass}
          onChange={(e) => setEditedItem({ ...editedItem, FTUsrPass: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black bg-white rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-kanit font-semibold">หมายเหตุ</label>
        <textarea
          value={editedItem.FTRemark}
          onChange={(e) => setEditedItem({ ...editedItem, FTRemark: e.target.value })}
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
          className={`${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-700"
          } text-white px-4 py-2 rounded font-kanit font-semibold`}
          disabled={loading}
        >
          {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </button>
      </div>
    </div>
  );
};

export default ModalEdit;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiArrowLeft, FiSave } from "react-icons/fi";

const ModalEdit = ({ editingItem, onSave }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(editingItem || {});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    router.push("/manage/listpass"); // เปลี่ยนเส้นทางเมื่อบันทึกสำเร็จ
  };

  const handleCancel = () => {
    router.back(); // กลับไปยังหน้าก่อนหน้า
  };

  return (
    <div className="modal-container">
      <h2 className="text-xl font-bold">แก้ไขข้อมูล</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">ชื่อผู้ใช้</label>
          <input
            type="text"
            name="FTUsrName"
            value={formData.FTUsrName || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">รหัสผ่าน</label>
          <input
            type="password"
            name="FTUsrPass"
            value={formData.FTUsrPass || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">หมายเหตุ</label>
          <input
            type="text"
            name="FTRemark"
            value={formData.FTRemark || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </form>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          <FiArrowLeft /> ยกเลิก
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <FiSave /> บันทึก
        </button>
      </div>
    </div>
  );
};

export default ModalEdit;

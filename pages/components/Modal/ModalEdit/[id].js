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
    <>
      <div className="mockup-browser border bg-[#FFA403] w-full max-w-4xl mx-auto my-8 h-[610]">
        <div className="mockup-browser-toolbar bg-[#FDA403]">
          <div className="input font-kanit font-bold">แก้ไขรหัสผ่าน</div>
        </div>
        <div className="bg-base-100 flex justify-center">
          <div className="flex flex-col items-center w-full max-w-[300] lg:max-w-lg mx-auto mb-4">
            <form>
              <div className="mb-4 mt-10">
                <label className="block text-sm font-kanit font-semibold">
                  เว็บไซต์
                </label>
                <select
                  onChange={(e) => setFTUsrAgent(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded font-kanit font-md text-black"
                >
                  <option value="All">ระบุเว็บไซต์</option>
                  <option value="KingKong">KingKong</option>
                  <option value="Blackpink">Blackpink</option>
                  <option value="Soul88">Soul88</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-kanit font-semibold">
                  ชื่อผู้ใช้
                </label>

                <input
                  type="text"
                  name="FTUsrName"
                  value={formData.FTUsrName || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-kanit font-semibold">
                  รหัสผ่าน
                </label>
                <input
                  type="text"
                  name="FTUsrPass"
                  value={formData.FTUsrPass || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">หมายเหตุ</label>
                <input
                  type="text"
                  name="FTRemark"
                  value={formData.FTRemark || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black"
                  rows="4"
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
        </div>
      </div>
    </>
  );
};

export default ModalEdit;

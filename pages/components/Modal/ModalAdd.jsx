"use client";
import { useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { FiSave, FiArrowLeft } from "react-icons/fi"; // นำเข้าไอคอน FiSave
import Swal from "sweetalert2";

function ModalAdd() {
  const [FTUsrAgent, setFTUsrAgent] = useState("");
  const [FTUsrName, setFTUsrName] = useState("");
  const [FTUsrPass, setFTUsrPass] = useState("");
  const [FTRemark, setFTRemark] = useState("");
  const [FTUrlObj, setFTUrlObj] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.push("/components/Modal/ModalData");
  };

  const addUser = async (event) => {

    event.preventDefault(); // ป้องกันการ reload หน้า
    if (!FTUsrAgent || !FTUsrName || !FTUsrPass || !FTRemark) {
      alert("Please complete all inputs.");
      return;
    }
  
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FTUsrAgent,
        FTUsrName,
        FTUsrPass,
        FTRemark,
        FTUrlObj,
      }),
    };
  
    try {
      // const res = await fetch(`http://localhost:3000/api/manage/listpass-api`, postData);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, postData);

      const response = await res.json();
      console.log("Response from API Page Add. :", response);
    
      if (response?.message == 'success') {
        await Swal.fire({
          title: "Success",
          text: "The data has been successfully added.",
          icon: "success",
          confirmButtonText: "Confirm",
        });
      
        router.push("/components/Modal/ModalData");
      } else {
        Swal.fire({
          title: "Failure",
          text: "There was an issue adding the data.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Unable to establish a connection with the server.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
      
  };
  
  return (
    <>
      <div className="mockup-browser border-2 bg-[#FFA403] w-full max-w-4xl mx-auto my-8 h-[695]">
        <div className="mockup-browser-toolbar bg-[#FDA403]">
          <div className="input font-kanit font-bold">เพิ่มรหัสผ่าน</div>
        </div>
        <div className="bg-base-100 flex justify-center">
          <div className="flex flex-col items-center w-full max-w-[300] lg:max-w-lg mx-auto mb-4">
            <form onSubmit={addUser} className="w-full">
              {/* Input Fields */}
              <div className="mb-4 mt-10">
                <label className="block text-sm font-kanit font-semibold">
                  ตัวแทน
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
                  onChange={(e) => setFTUsrName(e.target.value)}
                  type="text"
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-kanit font-semibold">
                  รหัสผ่าน
                </label>
                <input
                  onChange={(e) => setFTUsrPass(e.target.value)}
                  type="text"
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-kanit font-semibold">
                  ปลายทาง (Url)
                </label>
                <input
                  onChange={(e) => setFTUrlObj(e.target.value)}
                  type="text"
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black"
                />
              </div>


              <div className="mb-4">
                <label className="block text-sm font-kanit font-semibold">
                  หมายเหตุ
                </label>
                <textarea
                  onChange={(e) => setFTRemark(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black"
                  rows="4"
                />
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:justify-between my-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-red-700 text-white px-4 py-2 rounded font-kanit font-semibold flex items-center justify-center"
                >
                  <FiArrowLeft className="mr-2" />
                  กลับ
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded font-kanit font-semibold flex items-center justify-center"
                >
                  <FiSave className="mr-2" />
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAdd;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSave, FiArrowLeft, FiHome } from "react-icons/fi";
import Swal from "sweetalert2";

const ModalRead = () => {
  const router = useRouter();
  const { id } = router.query;
  const [FTUsrAgent, setFTUsrAgent] = useState("");
  const [FTUsrName, setFTUsrName] = useState("");
  const [FTUsrPass, setFTUsrPass] = useState("");
  const [FTRemark, setFTRemark] = useState("");
  const [FTUrlObj, setFTUrlObj] = useState("");

  const handleBack = () => {
    router.push("/components/Modal/ModalData");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).catch((error) => {
      console.error("ไม่สามารถคัดลอกได้:", error);
    });
  };

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก API
  useEffect(() => {
    if (!id) return;
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          // `http://localhost:3000/api/manage/listpass-api?id=${id}`
          `/api/manage/listpass-api?id=${id}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        if (data) {
          setFTUsrAgent(data.FTUsrAgent || "");
          setFTUsrName(data.FTUsrName || "");
          setFTUsrPass(data.FTUsrPass || "");
          setFTRemark(data.FTRemark || "");
          setFTUrlObj(data.FTUrlObj || "");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="mockup-browser border-2 bg-[#FFA403] w-full max-w-4xl mx-auto my-8 h-[610]">
      <div className="mockup-browser-toolbar flex justify-between items-center px-4 py-2">
        <div className="input font-kanit font-bold text-white">
          ตรวจสอบข้อมูล
        </div>
        <button className="btn btn-info" onClick={() => router.push(`/`)}>
          <FiHome className="w-5 h-5" />
        </button>
      </div>
      <div className="bg-base-100 flex justify-center">
        <div className="flex flex-col items-center w-full max-w-[300] lg:max-w-lg mx-auto mb-4">
          {/* Input Fields */}
          <div className="mb-4 mt-10">
            <label className="input input-bordered flex items-center gap-2 bg-gray-400 text-black font-semibold">
              <input type="text" className="grow" value={FTUsrAgent} readOnly />
              <span className="badge badge-warning w-24 h-6">Agency</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2 bg-gray-50 text-black font-semibold">
              <input type="text" className="grow" value={FTUsrName} readOnly />
              <span
                onClick={() => handleCopy(FTUsrName)}
                className="badge badge-warning cursor-pointer w-24 h-6 text-center"
              >
                ชื่อผู้ใช้
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2 bg-gray-50 text-black font-semibold">
              <input type="text" className="grow" value={FTUsrPass} readOnly />
              <span
                onClick={() => handleCopy(FTUsrPass)}
                className="badge badge-warning cursor-pointer w-24 h-6 text-center"
              >
                รหัสผ่าน
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2 bg-gray-50 text-black font-semibold">
              <input type="text" className="grow" value={FTUrlObj} readOnly />
              <span
                onClick={() => handleCopy(FTUrlObj)}
                className="badge badge-warning cursor-pointer w-24 h-6 text-center"
              >
                URL
              </span>
            </label>
          </div>

          <div className="mb-4 mb-10">
            <label className="input input-bordered flex items-center gap-2 bg-gray-50 text-black font-semibold">
              <input type="text" className="grow" value={FTRemark} readOnly />
              <span className="badge badge-warning w-24 h-6">หมายเหตุ</span>
            </label>
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
            {/* <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded font-kanit font-semibold flex items-center justify-center"
              >
                <FiSave className="mr-2" />
                บันทึกข้อมูล
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRead;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSave, FiArrowLeft, FiHome } from "react-icons/fi";
import Swal from "sweetalert2";

const ModalEdit = () => {
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

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก API
  useEffect(() => {
    if (!id) return;
    const fetchUserData = async () => {
      try {
        // const res = await fetch(
        //   `http://localhost:3000/api/manage/listpass-api?id=${id}`

        // );

        const res = await fetch(`/api/manage/listpass-api?id=${id}`);

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

  // ฟังก์ชันสำหรับอัพเดตข้อมูลผู้ใช้
  const updateUser = async (event) => {
    event.preventDefault(); // ป้องกันการรีโหลดหน้าเมื่อกด Submit
    if (!FTUsrAgent || !FTUsrName || !FTUsrPass || !FTRemark || !FTUrlObj) {
      alert("Please complete all inputs.");
      return;
    }

    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        FTUsrAgent,
        FTUsrName,
        FTUsrPass,
        FTRemark,
        FTUrlObj,
      }),
    };

    try {
      // const res = await fetch(`http://localhost:3000/api/manage/listpass-api`, postData);
      const res = await fetch(`/api/manage/listpass-api`, postData);

      const response = await res.json();
      if (response?.message == "success") {
        await Swal.fire({
          title: "Success",
          text: "Data updated successfully.",
          icon: "success",
          confirmButtonText: "Done",
        });
        router.push("/components/Modal/ModalData");
      } else {
        Swal.fire({
          title: "Fail",
          text: "Failed to update data.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Unable to connect to the server.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="mockup-browser border-2 bg-[#FFA403] w-full max-w-4xl mx-auto my-8 h-[710]">
      <div className="mockup-browser-toolbar flex justify-between items-center px-4 py-2">
        <div className="input font-kanit font-bold text-white">แก้ไขข้อมูล</div>
        <button className="btn btn-info" onClick={() => router.push(`/`)}>
          <FiHome className="w-5 h-5" />
        </button>
      </div>
      <div className="bg-base-100 flex justify-center">
        <div className="flex flex-col items-center w-full max-w-[300] lg:max-w-lg mx-auto mb-4">
          <form onSubmit={updateUser} className="w-full">
            {/* Input Fields */}
            <div className="mb-4 mt-10">
              <label className="input input-bordered flex items-center gap-2 bg-gray-400 text-black font-semibold">
                <input
                  type="text"
                  className="grow"
                  value={FTUsrAgent}
                  readOnly
                />
                <span className="badge badge-warning w-24 h-6">Agency</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-kanit text-white font-semibold">
                ชื่อผู้ใช้
              </label>
              <input
                value={FTUsrName}
                onChange={(e) => setFTUsrName(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black font-kanit font-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-kanit text-white font-semibold">
                รหัสผ่าน
              </label>
              <input
                value={FTUsrPass}
                onChange={(e) => setFTUsrPass(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black font-kanit font-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-kanit text-white font-semibold">
                ปลายทาง (Url)
              </label>
              <textarea
                value={FTUrlObj}
                onChange={(e) => setFTUrlObj(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black font-kanit font-md"
                rows="4"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-kanit text-white font-semibold">
                หมายเหตุ
              </label>
              <textarea
                value={FTRemark}
                onChange={(e) => setFTRemark(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black bg-white rounded text-black font-kanit font-md"
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
  );
};

export default ModalEdit;

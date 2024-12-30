import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiSave, FiArrowLeft } from "react-icons/fi";
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
    navigator.clipboard.writeText(text)
      .catch((error) => {
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

  // ฟังก์ชันสำหรับอัพเดตข้อมูลผู้ใช้
  // const updateUser = async (event) => {
  //   event.preventDefault(); // ป้องกันการรีโหลดหน้าเมื่อกด Submit
  //   if (!FTUsrAgent || !FTUsrName || !FTUsrPass || !FTRemark) {
  //     alert("Please complete all inputs.");
  //     return;
  //   }

  //   const postData = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id,
  //       FTUsrAgent,
  //       FTUsrName,
  //       FTUsrPass,
  //       FTRemark,
  //       FTUrlObj,
  //     }),
  //   };

  //   try {
  //     const res = await fetch(`http://localhost:3000/api/manage/listpass-api`, postData);
  //     const response = await res.json();
  //     if (response?.message == 'success') {
  //       await Swal.fire({
  //         title: "Success",
  //         text: "Data updated successfully.",
  //         icon: "success",
  //         confirmButtonText: "Done",
  //       });
  //       router.push("/components/Modal/ModalData");
  //     } else {
  //       Swal.fire({
  //         title: "Fail",
  //         text: "Failed to update data.",
  //         icon: "error",
  //         confirmButtonText: "Try Again",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Unable to connect to the server.",
  //       icon: "error",
  //       confirmButtonText: "Try Again",
  //     });
  //   }
  // };

  return (
    // <div className="mockup-browser border-2 bg-[#FFA403] w-full max-w-4xl mx-auto my-8 h-[610]">

<div className="mockup-browser border-2 bg-[#FFA403] w-full max-w-4xl mx-auto my-8 h-[610]">

     <div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
    <button class="btn btn-ghost btn-circle">
      <div class="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>
    </div>
  );
};

export default ModalRead;

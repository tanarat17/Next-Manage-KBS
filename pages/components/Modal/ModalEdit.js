import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ModalEdit = () => {
  const router = useRouter();
  const { id } = router.query; // ดึง id จาก query ของ URL
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const res = await fetch(`http://localhost:3000/api/manage/listpass-id-api/${id}`);
        // const res = await fetch(`{process.env.NEXT_PUBLIC_API_URL}/${id}`);

        const res = await fetch(`/api/manage/listpass-id-api/${id}`);


        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    fetchUserData();
  }, [id]); 

  return (
    <div>
      {editingItem ? (
        <div>
          <h2>Editing User: {editingItem.FTUsrName}</h2>
          <p>Agent: {editingItem.FTUsrAgent}</p>
          <p>Password: {editingItem.FTUsrPass}</p>
          <p>Remark: {editingItem.FTRemark}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ModalEdit;

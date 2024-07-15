import React, { useEffect, useState } from 'react';
import NmhListTableName from './nmh_components/NmhListTableName';
import axios from './nmh_apis/nmh-22109100';
import NmhFormTableName from './nmh_components/NmhFormTableName';

export default function NmhApp() {
  // Khởi tạo state
  const [nmhListTableName, setNmhListTableName] = useState([]);
  const [nmhTableName, setNmhTableName] = useState({
    "nmhTbName": "",
    "nmhTbEmail": "",
    "nmhTbPhone": "",
    "nmhTbStatus": true,
    "nmhId": ""
  });

  // Đọc dữ liệu từ API
  const nmhGetTableName = async () => {
    try {
      let nmhResp = await axios.get("nmhTableName");
      console.log("App List:", nmhResp.data);
      setNmhListTableName(nmhResp.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    nmhGetTableName();
  }, []);

  // Hàm xóa
  const nmhHanldeDelete = async (nmhId) => {
    try {
      await axios.delete(`nmhTableName/${nmhId}`);
      nmhGetTableName();
    } catch (error) {
      console.error('Có lỗi xảy ra khi xóa:', error.response ? error.response.data : error.message);
    }
  };

  // Hàm chỉnh sửa
  const nmhHandelEdit = async () => {
    nmhGetTableName();
  };

  const nmhHanleEdit = (nmhObjTableName) => {
    setNmhTableName(nmhObjTableName);
  };

  return (
    <div className='container border my-3'>
      <h1>bài thi đánh giá hết học phần - Nguyen Minh Hiệp: 22109100</h1>
      <hr />
      <NmhListTableName 
        renderNmhListTableName={nmhListTableName} 
        onNmhDelete={nmhHanldeDelete} 
        onNmhEdit={nmhHanleEdit} 
      />
      <hr />
      <NmhFormTableName 
        renderNmhTableName={nmhTableName} 
        onEdit={nmhHandelEdit} 
      />
    </div>
  );
}

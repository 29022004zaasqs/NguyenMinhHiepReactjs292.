import React, { useState, useEffect } from 'react';
import axios from './api/nmhApi';
import NmhListStudent from './components/NmhListStudent';
import NmhAddOrEdit from './components/NmhAddOrEdit';

const NmhApp = () => {
  const [nmhListStudent, setNmhListStudent] = useState([]);
  const [nmhAddOrEdit, setNmhAddOrEdit] = useState(false);
  const [nmhStudent, setNmhStudent] = useState(null);

  const nmhGetAllStudent = async () => {
    try {
      const nmhResponse = await axios.get("NmhSinhVien");
      setNmhListStudent(nmhResponse.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    nmhGetAllStudent();
  }, []);

  const nmhHandleAddNew = () => {
    setNmhStudent({
      MaSV: "",
      HoSV: "",
      TenSV: "",
      Phai: "",
      NgaySinh: "",
      NoiSinh: "",
      MaKH: "",
      HocBong: "",
      DiemTrungBinh: ""
    });
    setNmhAddOrEdit(true);
  };

  const nmhHandleEdit = (student) => {
    setNmhStudent(student);
    setNmhAddOrEdit(true);
  };

  const nmhHandleClose = () => {
    setNmhAddOrEdit(false);
  };

  const nmhHandleSubmit = async (student) => {
    try {
      if (student.MaSV) {
        await axios.put(`NmhSinhVien/${student.MaSV}`, student);
      } else {
        await axios.post("NmhSinhVien", student);
      }
      nmhGetAllStudent();
      setNmhAddOrEdit(false);
    } catch (error) {
      console.error("Error saving student data:", error);
    }
  };

  const nmhHandleDelete = async (id) => {
    if (window.confirm("Bạn có muốn xóa không?")) {
      try {
        await axios.delete(`NmhSinhVien/${id}`);
        nmhGetAllStudent();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className='container border my-3'>
      <h1>Quản lý Sinh viên</h1>
      <hr />
      <NmhListStudent
        renderNmhListStudent={nmhListStudent}
        onNmhDelete={nmhHandleDelete}
        onNmhEdit={nmhHandleEdit}
      />
      <button className='btn btn-primary' onClick={nmhHandleAddNew}>Thêm mới</button>
      <hr />
      {nmhAddOrEdit && (
        <NmhAddOrEdit
          renderStudent={nmhStudent}
          onNmhClose={nmhHandleClose}
          onNmhSubmitForm={nmhHandleSubmit}
        />
      )}
    </div>
  );
};

export default NmhApp;

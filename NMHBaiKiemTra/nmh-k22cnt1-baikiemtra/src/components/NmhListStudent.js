import React from 'react';
import axios from '../api/nmhApi'; // Đảm bảo đường dẫn đúng

export default function NmhListStudent({ renderNmhListStudent, onNmhDelete }) {
    console.log("NmhListStudent:", renderNmhListStudent);

    // Kiểm tra xem renderNmhListStudent có phải là một mảng không
    if (!Array.isArray(renderNmhListStudent)) {
        return <div>No data available</div>;
    }

    const nmhHandleDelete = async (param) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            try {
                await axios.delete(`NmhSinhVien/${param.MaSV}`);
                onNmhDelete();
            } catch (error) {
                console.error("Có lỗi xảy ra khi xóa dữ liệu:", error);
            }
        }
    };

    // Render danh sách sinh viên
    const nmhElementStudent = renderNmhListStudent.map((NmhSinhVien, index) => {
        return (
            <tr key={index}>
                <td>{NmhSinhVien.nmhMaSV}</td>
                <td>{NmhSinhVien.nmhHoSV}</td>
                <td>{NmhSinhVien.nmhTenSV}</td>
                <td>{NmhSinhVien.nmhPhai}</td>
                <td>{NmhSinhVien.nmhNgaySinh}</td>
                <td>{NmhSinhVien.nmhNoiSinh}</td>
                <td>{NmhSinhVien.nmhMaKH}</td>
                <td>{NmhSinhVien.nmhHocBong}</td>
                <td>{NmhSinhVien.nmhDiemTrungBinh}</td>
                <td>
                    <button className='btn btn-success'>Edit</button>
                    <button className='btn btn-danger' onClick={() => nmhHandleDelete(NmhSinhVien)}>Remove</button>
                </td>
            </tr>
        );
    });

    return (
        <div className='row'>
            <div className='col-md-12'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>MaSV</th>
                            <th>HoSV</th>
                            <th>TenSV</th>
                            <th>Phai</th>
                            <th>NgaySinh</th>
                            <th>NoiSinh</th>
                            <th>MaKH</th>
                            <th>HocBong</th>
                            <th>DiemTrungBinh</th>
                            <th>Chuc Nang</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nmhElementStudent}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


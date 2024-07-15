import React from 'react';

// Component NmhListTableName
export default function NmhListTableName({ renderNmhListTableName, onNmhDelete, onNmhEdit }) {
    // Xử lý sự kiện xóa
    const handleDelete = (nmhId) => {
        if (window.confirm(`Bạn có muốn xóa dữ liệu nmhId ${nmhId}?`)) {
            onNmhDelete(nmhId);
        }
    };

    // Xử lý sự kiện sửa
    const handleEdit = (nmhObjTableName) => {
        onNmhEdit(nmhObjTableName);
    };

    // Hiển thị dữ liệu
    const renderTableRows = renderNmhListTableName.map((nmhItem) => (
        <tr key={nmhItem.nmhId}>
            <td>{nmhItem.nmhId}</td>
            <td>{nmhItem.nmhTbName}</td>
            <td>{nmhItem.nmhTbEmail}</td>
            <td>{nmhItem.nmhTbPhone}</td>
            <td>{(nmhItem.nmhTbStatus === true || nmhItem.nmhTbStatus === "true") ? "Active" : "Non-Active"}</td>
            <td>Nmh: chức năng</td>
            <td>
                <button className='btn btn-success m-2' onClick={() => handleEdit(nmhItem)}>
                    Nmh-edit
                </button>
                <button className='btn btn-danger' onClick={() => handleDelete(nmhItem.nmhId)}>
                    Nmh-delete
                </button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h2>Danh sách thông tin ..</h2>
            <hr />
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>NmhId</th>
                        <th>NmhTbName</th>
                        <th>NmhTbEmail</th>
                        <th>NmhTbPhone</th>
                        <th>NmhTbStatus</th>
                        <th>Nmh: chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows}
                </tbody>
            </table>
        </div>
    );
}

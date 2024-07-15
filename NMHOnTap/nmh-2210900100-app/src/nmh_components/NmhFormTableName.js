import axios from '../nmh_apis/nmh-22109100'; // Đảm bảo đường dẫn chính xác
import React, { useEffect, useState } from 'react'; // Import useState và useEffect từ react

export default function NmhFormTableName({ renderNmhTableName, onEdit }) {
    // Khởi tạo state với giá trị từ props
    const [nmhId, setNmhId] = useState(renderNmhTableName.nmhId || '');
    const [nmhTbName, setNmhTbName] = useState(renderNmhTableName.nmhTbName || '');
    const [nmhTbEmail, setNmhTbEmail] = useState(renderNmhTableName.nmhTbEmail || '');
    const [nmhTbPhone, setNmhTbPhone] = useState(renderNmhTableName.nmhTbPhone || '');
    const [nmhTbStatus, setNmhTbStatus] = useState(renderNmhTableName.nmhTbStatus || 'true'); // Mặc định là 'true'

    useEffect(() => {
        // Cập nhật state khi props thay đổi
        setNmhId(renderNmhTableName.nmhId || '');
        setNmhTbName(renderNmhTableName.nmhTbName || '');
        setNmhTbEmail(renderNmhTableName.nmhTbEmail || '');
        setNmhTbPhone(renderNmhTableName.nmhTbPhone || '');
        setNmhTbStatus(renderNmhTableName.nmhTbStatus || 'true'); // Mặc định là 'true'
    }, [renderNmhTableName]);

    const nmhHandleSubmit = async (nmhEvent) => {
        nmhEvent.preventDefault();

        const nmhObjTableName = {
            "nmhTbName": nmhTbName,
            "nmhTbEmail": nmhTbEmail,
            "nmhTbPhone": nmhTbPhone,
            "nmhTbStatus": nmhTbStatus === 'true', // Chuyển đổi giá trị chuỗi thành boolean
            "nmhId": nmhId
        };

        console.log('Dữ liệu gửi đi:', nmhObjTableName);

        try {
            const response = await axios.put(`http://localhost:3000/api/nmhTableName/${nmhObjTableName.nmhId}`, nmhObjTableName); // Sửa đường dẫn API
            console.log('Phản hồi từ API:', response.data);
            onEdit(); // Cập nhật sau khi thành công
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Form xử lý dữ liệu thêm mới</h2>
            <form onSubmit={nmhHandleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="nmhId">NmhId</span>
                    <input type="text" className="form-control" placeholder="NmhId"
                        name='nmhId'
                        value={nmhId}
                        onChange={(nmhEv) => setNmhId(nmhEv.target.value)}
                        aria-label="nmhId" aria-describedby="nmhId" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="nmhTbName">NmhTbName</span>
                    <input type="text" className="form-control" placeholder="NmhTbName"
                        name='nmhTbName'
                        value={nmhTbName}
                        onChange={(nmhEv) => setNmhTbName(nmhEv.target.value)}
                        aria-label="nmhTbName" aria-describedby="nmhTbName" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="nmhTbEmail">NmhTbEmail</span>
                    <input type="text" className="form-control" placeholder="thuy linh@gmail.com"
                        name='nmhTbEmail'
                        value={nmhTbEmail}
                        onChange={(nmhEv) => setNmhTbEmail(nmhEv.target.value)}
                        aria-label="nmhTbEmail" aria-describedby="nmhTbEmail" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="nmhTbPhone">NmhTbPhone</span>
                    <input type="text" className="form-control" placeholder="0987654323"
                        name='nmhTbPhone'
                        value={nmhTbPhone}
                        onChange={(nmhEv) => setNmhTbPhone(nmhEv.target.value)}
                        aria-label="nmhTbPhone"
                        aria-describedby="nmhTbPhone" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="nmhTbStatus">NmhTbStatus</span>
                    <select id='nmhTbStatus' className='form-control'
                        name='nmhTbStatus'
                        value={nmhTbStatus}
                        onChange={(nmhEv) => setNmhTbStatus(nmhEv.target.value)}
                    >
                        <option value='true'>Active</option>
                        <option value='false'>Non-Active</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary' name='btnNmhSave'>Nmh: Save</button>
            </form>
        </div>
    );
}

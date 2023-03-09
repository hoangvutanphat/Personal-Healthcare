import { Modal, Table } from 'antd'
import React from 'react'

const NutritionInformationModal = ({ isOpen, onCancel }) => {
    const columns = [
        {
            title: 'CHỈ TIÊU',
            align: 'center',
            width: '34%'
        },
        {
            title: 'GIÁ TRỊ',
            align: 'center',
            width: '33%'
        },
        {
            title: 'ĐƠN VỊ',
            align: 'center',
            width: '33%'
        },
    ]
    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            centered
            width='80%'
            maskClosable={false}
            title={<p style={{ fontSize: 16, textAlign: 'center' }}>
                THÔNG TIN DINH DƯỠNG CHI TIẾT CỦA MÓN ĂN MÀ BẠN ĐANG XEM
            </p>}
            footer={false}
        >
            <Table
                columns={columns}
                style={{ padding: '0 30px' }}
            />
        </Modal>
    )
}

export default NutritionInformationModal
import { Button, Col, Modal, Row, Table, Typography } from 'antd'
import React from 'react'

const SubstitureMaterialModal = ({ isOpen, onCancel }) => {
    const columns = [
        {
            title: (<span>Tên nguyên liệu<br />(Bấm vào [▼] để thay thế nguyên liệu)</span>),
            align: 'center',
            width: '30%'
        },
        {
            title: (<span>Đơn vị<br />(Bấm vào [▼]  để thay thế đơn vị)</span>),
            align: 'center',
            width: '26%'
        },
        {
            title: 'Khối lượng nguyên liệu chưa sơ chế',
            align: 'center',
            width: '22%'
        },
        {
            title: 'Khối lượng nguyên liệu đã sơ chế',
            align: 'center',
            width: '22%'
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
                DANH SÁCH VÀ KHỐI LƯỢNG NGUYÊN LIỆU CỦA MÓN ĂN
            </p>}
            footer={false}
        >
            <Row gutter={[0, 16]} style={{ padding: '0 30px' }} justify={{ xs: 'center', lg: 'center' }}>
                <Col span={24}>
                    <Table
                        columns={columns}
                    />
                </Col>
                <Col span={24}>
                    <Typography.Link underline>
                        Bảng chuyển đổi đơn vị của nguyên liệu
                    </Typography.Link>
                </Col>
                <Col>
                    <Button type='primary' size='large'>QUAY LẠI CÔNG THỨC BAN ĐẦU</Button>
                </Col>
            </Row>
        </Modal>
    )
}

export default SubstitureMaterialModal
import { Col, Modal, Row, Space, Table, Typography } from 'antd'
import React from 'react'

const CookingRecipeModal = ({ isOpen, onCancel }) => {
    const columns = [
        {
            title: 'NGUYÊN LIỆU',
            align: 'center',
            width: '30%'
        },
        {
            title: (<span>ĐỊNH LƯỢNG<br />(ĐÃ SƠ CHẾ)</span>),
            align: 'center',
            width: '20%'
        },
        {
            title: 'ĐƠN VỊ',
            align: 'center',
            width: '10%'
        },
        {
            title: 'CÁCH CHUẨN BỊ',
            align: 'center',
            width: '20%'
        },
        {
            title: (<span>THAY THẾ NGUYÊN LIỆU<br />(NẾU CÓ)</span>),
            align: 'center',
            width: '20%'
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
            <Row gutter={[0, 16]} style={{ padding: '0 30px' }}>
                <Col span={24}>
                    <Table
                        columns={columns}
                    />
                </Col>
                <Col span={24}>
                    <Typography.Title
                        level={4}
                        style={{
                            padding: '20px 10px',
                            background: '#a8ff9f66'
                        }}
                    >
                        HƯỚNG DẪN THỰC HIỆN
                    </Typography.Title>
                </Col>
                <Col>
                    <Space direction='vertical'>
                        <div>
                            <Typography.Title level={5}>
                                Cách chế biến (được gợi ý bởi công ty AjiSTTmoto Việt Nam)
                            </Typography.Title>
                            <Typography.Paragraph>
                                • Nấu canh: Phi thơm hành với dầu ăn, cho bắp vào xào sơ rồi cho nước lọc vào đun sôi.<br />
                                Nấu khoảng 10 phút cho bắp mềm thì thêm rau cải và thịt bò vào, nêm Hạt nêm Heo vào,
                                khuấy nhẹ cho gia vị tan đều. Khi rau cải ngọt vừa chín tới, tắt bếp.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                • Trình bày: Cho canh cải ngọt nấu thịt bò ra tô, dùng nóng.
                            </Typography.Paragraph>
                        </div>
                        <div>
                            <Typography.Title level={5}>
                                Mẹo hay mách nhỏ:
                            </Typography.Title>
                            <Typography.Paragraph>
                                • Nên cho thịt bò vào sau để thịt bò mềm, không bị dai.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                • Khi nêm Hạt nêm Heo nên khuấy đều để hạt nêm tan nhanh vào nước.
                            </Typography.Paragraph>
                        </div>
                        <div>
                            <Typography.Title level={5}>
                                Thông tin thêm
                            </Typography.Title>
                            <Typography.Paragraph>
                                Vui lòng vào trang Kho tàng ẩm thực của mẹ để khám phá cách chế biến các món ngon từ thịt bò.
                            </Typography.Paragraph>
                        </div>
                    </Space>
                </Col>
            </Row>
        </Modal>
    )
}

export default CookingRecipeModal
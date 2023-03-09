import { Col, Modal, Row, Typography } from 'antd'
import React from 'react'

const FoodShareModal = ({ isOpen, onCancel }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            centered
            width='60%'
            maskClosable={false}
            footer={false}
        >
            <Row gutter={[0, 24]} justify='center'>
                <Col >
                    <Typography.Paragraph style={{ fontSize: 18 }}>
                        Chia sẻ thực đơn
                    </Typography.Paragraph>
                </Col>
                <Col span={24}>
                </Col>
            </Row>

        </Modal>
    )
}

export default FoodShareModal
import { Button, Col, Modal, Row } from "antd";
import React from "react";
import AlternativeFood from "./AlternativeFood";

const AlternativeFoodModal = ({ isOpen, onCancel }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            centered
            width='60%'
            maskClosable={false}
            title={<p style={{ fontSize: 16, textAlign: 'center' }}>
                GỢI Ý MÓN ĂN THAY THẾ
            </p>}
            footer={false}
        >
            <Row gutter={[0, 24]}>
                <Col xs={22} md={22} lg={10} offset={1}>
                    <AlternativeFood />
                </Col>
                <Col xs={22} md={22} lg={10} offset={1}>
                    <AlternativeFood />
                </Col>
                <Col xs={22} md={22} lg={10} offset={1}>
                    <AlternativeFood />
                </Col>
                <Col xs={22} md={22} lg={10} offset={1}>
                    <AlternativeFood />
                </Col>
                <Col xs={22} md={22} lg={10} offset={1}>
                    <AlternativeFood />
                </Col>
            </Row>
            <Row justify='center' gutter={24} style={{ paddingTop: 32 }}>
                <Col>
                    <Button type="primary">THAY ĐỔI MÓN</Button>
                </Col>
                <Col>
                    <Button onClick={onCancel}>ĐÓNG</Button>
                </Col>
            </Row>
        </Modal>
    )
}

export default AlternativeFoodModal;
import { Checkbox, Col, Row, Typography } from 'antd'
import React from 'react'

const styles = {
    imgStyle: {
        width: '100%',
        border: '1px solid'
    },
    setCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8
    },
}

const AlternativeFood = () => {
    return (
        <Row gutter={24}>
            <Col span={5} style={styles.imgStyle}>
                <img src="" alt="" />
            </Col>
            <Col span={16} style={styles.setCenter}>
                <Typography.Text strong>
                    BA CHỈ ÁP CHẢO (MN)
                </Typography.Text>
                <Typography.Text>
                    Thời gian nấu: 15 phút
                </Typography.Text>
                <Typography.Text>
                    Năng lượng: 236,2 kcal
                </Typography.Text>
            </Col>
            <Col span={2}>
                <Checkbox name='selectFood' />
            </Col>
        </Row>
    )
}

export default AlternativeFood
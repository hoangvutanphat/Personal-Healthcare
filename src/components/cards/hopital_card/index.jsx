import { Col, Row, Typography } from 'antd'
import React from 'react'
import { StarFilled } from '@ant-design/icons'
import facility01 from '../../../assets/images/facility01.svg'
import arrowNextGreen from '../../../assets/images/arrowNextGreen.svg'

const HopitalCard = ({ image, title, rate, content }) => {
    return (
        <Row className='hopital-card'>
            <Col span={22}>
                <img
                    className='card-image'
                    src={facility01}
                    width='100%'
                    alt=''
                />
            </Col>
            <Col className='hopital-card__info' span={20}>
                <Typography.Title className='title'>Phòng khám đa khoa Careplus</Typography.Title>
                <Typography.Paragraph className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography.Paragraph>
                <div className='rate'>
                    <span className='rate-num'>4.5</span>
                    <StarFilled className='rate-icon' />
                </div>
                <div className='arrowNext'>
                    <img src={arrowNextGreen} alt="" width={17} className='arrowNext-icon' />
                </div>
            </Col>
        </Row>
    )
}

export default HopitalCard
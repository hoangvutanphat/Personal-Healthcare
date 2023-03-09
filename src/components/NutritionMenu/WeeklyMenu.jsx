import { Carousel, Col, Row, Typography } from 'antd'
import React from 'react'
import WeeklyMealDetail from './WeeklyMealDetail'

const styles = {
    dayStyle: {
        background: '#d0cece',
        cursor: 'default',
    },
    detailStyle: {
        color: '#fff',
        background: '#3fa641',
        padding: '20px',
        cursor: 'pointer',
    },
}

const WeeklyMenu = ({ date }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    return (
        <>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <Row justify='space-between' style={styles.dayStyle}>
                        <Col></Col>
                        <Col>
                            <Typography.Title level={4} style={{ padding: 20 }}>{date}</Typography.Title>
                        </Col>
                        <Col>
                            <Typography.Title level={4} style={styles.detailStyle}>{`Chi tiết >>`}</Typography.Title>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Carousel
                        {...settings}
                        className='carousel-wrapper'
                    >
                        <WeeklyMealDetail
                            image='image'
                            meal='BỮA SÁNG'
                        />
                        <WeeklyMealDetail
                            image='image'
                            meal='BỮA TRƯA'
                        />
                        <WeeklyMealDetail
                            image='image'
                            meal='BỮA TỐI'
                        />
                        <WeeklyMealDetail
                            image='image'
                            meal='BỮA PHỤ 1'
                        />
                        <WeeklyMealDetail
                            image='image'
                            meal='BỮA PHỤ 2'
                        />
                        <WeeklyMealDetail
                            image='image'
                            meal='BỮA PHỤ 3'
                        />
                    </Carousel>
                </Col>
            </Row>
        </>
    )
}

export default WeeklyMenu
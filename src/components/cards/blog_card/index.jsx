import { Col, Row } from 'antd'
import React from 'react'
import image01 from '../../../assets/images/image01.svg'

const BlogCard = ({ title = 'Tiêu đề bài viết, Ajinomoto Việt Nam đóng góp cho cuộc sống tươi đẹp' }) => {
    return (
        <Row className='card-blog' gutter={[0, 12]}>
            <Col className='card-image' span={22}>
                <img src={image01} alt='' width={'100%'} />
            </Col>
            <Col className='card-infor' span={22}>
                <Row justify='space-between'>
                    <Col className='type'>Tư vấn dinh dưỡng</Col>
                    <Col className='time'>&bull; 8 phút trước</Col>
                </Row>
            </Col>
            <Col className='card-title' span={22}>
                {title}
            </Col>
            <Col className='card-content' span={22}>
                Từ năm 2020, Công ty Ajinomoto Việt Nam tiên phong ứng dụng công nghệ ...
            </Col>
            <Col className='card-link' span={22}>
                Xem chi tiết
            </Col>
        </Row>
    )
}

export default BlogCard
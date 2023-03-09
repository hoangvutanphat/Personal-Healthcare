import { HeartFilled, InfoCircleFilled, MenuOutlined, ShareAltOutlined, SwapOutlined } from '@ant-design/icons'
import { Col, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import AlternativeFoodModal from './AlternativeFoodModal'
import CookingRecipeModal from './CookingRecipeModal'
import FoodShareModal from './FoodShareModal'
import NutritionInformationModal from './NutritionInformationModal'
import SubstitureMaterialModal from './SubstitureMaterialModal'

const styles = {
    imgStyle: {
        width: '100%',
        border: '1px solid'
    },
    setCenter: {
        padding: '0 20px',
        borderRight: '1px solid',
        cursor: 'pointer',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    },
    clearBorder: {
        padding: '0 20px',
        border: 'none',
        cursor: 'pointer',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    }
}

const DailyMenuDetail = ({ meal }) => {
    const [isChangeFood, setIsChangeFood] = useState(false);
    const [isShowNutritionInfo, setIsShowNutritionInfo] = useState(false);
    const [isShowSubstitureMaterial, setIsShowSubstitureMaterial] = useState(false);
    const [isShowCookingRicipe, setIsShowCookingRicipe] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [favoriteFood, setFavoriteFood] = useState(false);

    return (
        <>
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <Typography.Text strong>
                        {meal}
                    </Typography.Text>
                </Col>
                <Col span={4} style={styles.imgStyle}>
                    <img src="" alt="" />
                </Col>
                <Col span={20} style={{ paddingLeft: 30 }}>
                    <Row gutter={[0, 16]} >
                        <Col span={24}>
                            <Typography.Text strong>
                                BÁNH CANH CÁ LÓC (MT)
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Space size={48}>
                                <Typography.Text strong>
                                    Thời gian nấu: 30p
                                </Typography.Text>
                                <Typography.Text strong>
                                    Năng lượng: 436,3kcal
                                </Typography.Text>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Row justify='space-between' wrap>
                                <Col
                                    style={styles.setCenter}
                                    span={4}
                                    onClick={() => setIsChangeFood(true)}
                                >
                                    <SwapOutlined style={{ fontSize: 20 }} />
                                    <Typography.Text style={{ textAlign: 'center' }}>Đổi món ăn</Typography.Text>
                                </Col>
                                <Col
                                    style={styles.setCenter}
                                    span={4}
                                    onClick={() => setFavoriteFood(!favoriteFood)}
                                >
                                    <HeartFilled style={{ fontSize: 20, color: favoriteFood ? 'red' : 'black' }} />
                                    <Typography.Text style={{ textAlign: 'center' }}>Lưu món ăn yêu thích</Typography.Text>
                                </Col>
                                <Col
                                    style={styles.setCenter}
                                    span={4}
                                    onClick={() => setIsShowNutritionInfo(true)}
                                >
                                    <InfoCircleFilled style={{ fontSize: 20 }} />
                                    <Typography.Text style={{ textAlign: 'center' }}>Thông tin dinh dưỡng</Typography.Text>
                                </Col>
                                <Col
                                    style={styles.setCenter}
                                    span={4}
                                    onClick={() => setIsShowSubstitureMaterial(true)}
                                >
                                    <SwapOutlined style={{ fontSize: 20 }} />
                                    <Typography.Text style={{ textAlign: 'center' }}>Thay thế nguyên liệu</Typography.Text>
                                </Col>
                                <Col
                                    style={styles.setCenter}
                                    span={4}
                                    onClick={() => setIsShowCookingRicipe(true)}
                                >
                                    <MenuOutlined style={{ fontSize: 20 }} />
                                    <Typography.Text style={{ textAlign: 'center' }}>Công thức món ăn</Typography.Text>
                                </Col>
                                <Col
                                    style={styles.clearBorder}
                                    span={4}
                                    onClick={() => setIsShare(true)}
                                >
                                    <ShareAltOutlined style={{ fontSize: 20 }} />
                                    <Typography.Text style={{ textAlign: 'center' }}>Chia sẻ món ăn</Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <AlternativeFoodModal
                isOpen={isChangeFood}
                onCancel={() => setIsChangeFood(false)}
            />
            <NutritionInformationModal
                isOpen={isShowNutritionInfo}
                onCancel={() => setIsShowNutritionInfo(false)}
            />
            <SubstitureMaterialModal
                isOpen={isShowSubstitureMaterial}
                onCancel={() => setIsShowSubstitureMaterial(false)}
            />
            <CookingRecipeModal
                isOpen={isShowCookingRicipe}
                onCancel={() => setIsShowCookingRicipe(false)}
            />
            <FoodShareModal
                isOpen={isShare}
                onCancel={() => setIsShare(false)}
            />
        </>
    )
}

export default DailyMenuDetail
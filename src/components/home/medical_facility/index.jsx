import { Carousel, Typography } from 'antd'
import image02 from '../../../assets/images/image02.svg'
import playBtn from '../../../assets/images/playBtn.svg'
import React from 'react'
import './style.scss'
import HopitalCard from '../../cards/hopital_card'

const MedicalFacility = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
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
        <div className='container-fluid medical-facility'>
            <div className='medical-facility__video'>
                <div className='video'>
                    <img
                        src={image02}
                        alt=''
                    // width='100%'
                    />
                </div>
                <div className='play-btn'>
                    <img
                        src={playBtn}
                        alt=''
                    />
                </div>
            </div>
            <div className='container'>
                <div className='large-title medical-facility__title'>
                    <Typography.Title>
                        Các cơ sở khám chữa bệnh uy tín
                    </Typography.Title>
                </div>
                <Carousel className='medical-facility__content' {...settings} draggable>
                    <HopitalCard />
                    <HopitalCard />
                    <HopitalCard />
                    <HopitalCard />
                    <HopitalCard />
                </Carousel>
            </div>
        </div>
    )
}
export default MedicalFacility
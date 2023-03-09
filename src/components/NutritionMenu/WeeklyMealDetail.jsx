import React from 'react'

const styles = {
    imgStyle: {
        width: '100%',
        height: 200,
        lineHeight: '200px',

        marginBottom: 24,
        border: '1px solid',
        textAlign: 'center',
        cursor: 'default',
    },
    flexStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'default',
    },
    detailStyle: {
        cursor: 'pointer',
        border: '1px solid',
        padding: '4px 8px'
    }
}

const WeeklyMealDetail = ({ image, meal }) => {
    return (
        <div>
            <div style={styles.imgStyle}>
                {image}
            </div>
            <div style={styles.flexStyle}>
                <p>{meal}</p>
                <p style={styles.detailStyle}>{`Chi tiết >>`}</p>
            </div>
        </div>
    )
}

export default WeeklyMealDetail
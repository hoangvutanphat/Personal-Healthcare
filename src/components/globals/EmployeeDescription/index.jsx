import { Typography } from 'antd'
import React from 'react'

const EmployeeDescription = ({ description }) => {
    return (
        <Typography.Paragraph className='employee-description'>
            {description}
        </Typography.Paragraph>
    )
}

export default EmployeeDescription
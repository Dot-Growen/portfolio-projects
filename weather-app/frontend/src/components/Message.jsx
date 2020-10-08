import React from 'react';
import { Alert } from 'antd';

const Message = ({message}) => {
    return (
            <Alert
                message="Error"
                description="Enter a valid city name"
                type="error"
                showIcon
            />
            
    );
}

export default Message;

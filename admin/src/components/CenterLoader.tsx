import React from 'react';
import {Row, Col, Spin} from 'antd';

const CenterLoader: React.FC = () => {
    return (
        <Row
            justify="center"  // Centers horizontally
            align="middle"    // Centers vertically
            style={{ height: '100vh' }} // Full page height
        >
            <Col>
                <Spin />
            </Col>
        </Row>
    );
};

export default CenterLoader;

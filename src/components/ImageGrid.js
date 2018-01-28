import React from 'react';
import { Card, Row, Col } from 'antd';
import size from 'lodash/size';

function ImageGrid({ imageUrls, loading }) {
  if (size(imageUrls) === 0) {
    return null;
  }

  return (
    <Row type="flex" justify="space-around" align="middle">
      {imageUrls.map(item => (
        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
          <Card title={item.title || 'No name'} loading={loading}>
            <img
              width="150px"
              height="150px"
              alt={item.title}
              src={item.url}
              style={{ display: 'block', margin: '0 auto' }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ImageGrid;

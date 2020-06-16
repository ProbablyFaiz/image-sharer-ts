import { Col, Row } from 'reactstrap';

import { PropTypes } from 'mobx-react';
import React from 'react';

const Footer = (props = {}) => {
  const { text = 'Copyright: AppFolio Inc. Onboarding' } = props;

  return (
    <section className='footer'>
      <Row>
        <Col lg={{ size: 4, offset: 4 }}>
          <p className='text-center'>
            {text}
          </p>
        </Col>
      </Row>
    </section>
  );
};

Footer.propTypes = {
  text: PropTypes.string
};

export default Footer;

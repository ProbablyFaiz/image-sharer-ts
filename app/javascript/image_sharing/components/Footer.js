import { Col, Row } from 'reactstrap';
import React from 'react';

import { PropTypes } from '../utils/prop-types';

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

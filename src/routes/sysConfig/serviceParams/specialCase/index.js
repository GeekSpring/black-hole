import React from 'react';
import { connect } from 'dva';

function SpecialCase({ location }) {
  return (
    <h3>
      SpecialCase:专案设置
    </h3>
  );
}

SpecialCase.propTypes = {
};

export default connect()(SpecialCase);

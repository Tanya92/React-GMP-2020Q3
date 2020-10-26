import React from 'react';

import '../styles/zero-info.less';

const blockName = 'zero-info'

const ZeroInfo = () => (
    <div className={blockName}>
        <h2 className={`${blockName}__title`}>
            No Movies Found
        </h2>
    </div>
)

export default ZeroInfo;
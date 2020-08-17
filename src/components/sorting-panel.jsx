import React from 'react';

import Panel from './panel';

import {sortingItems} from '../constants/index';

const blockName = 'sorting-panel';

const SortingPanel = () => (
    <Panel 
        blockName={blockName}
        itemsArray={sortingItems}
    />
); 

export default SortingPanel;
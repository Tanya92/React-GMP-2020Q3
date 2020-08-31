import React from 'react';

import SelectForm from './select-form';

import {sortingItems, selectItems} from '../constants/index';

const blockName = 'sorting-panel';

const SortingPanel = () => (
    <div 
        className={blockName}
    >
    <p className={`${blockName}__description`}>{sortingItems[0]}</p>
    <SelectForm 
        title={sortingItems[1]}
        selectItems={selectItems}
    />
    </div>
); 

export default SortingPanel;
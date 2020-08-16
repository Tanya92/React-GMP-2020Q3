import React from 'react';

import Panel from './panel';
import {navigationItems} from '../constants/index';

const blockName = 'navigation-panel'

const NavigationPanel = () => (
    <Panel 
        blockName={blockName}
        itemsArray={navigationItems}
        isSelectedPanel={false}
    />
)

export default NavigationPanel;
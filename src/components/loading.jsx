import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import '../styles/loading.less';

const Loading = () => (
    <div className={'skeleton-container'}>
        <Skeleton variant="rect" width={50} height={50} className='skeleton'/>
        <p>Loading...</p>
    </div>
);

export default Loading;
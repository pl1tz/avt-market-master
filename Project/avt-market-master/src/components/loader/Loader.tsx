import React from 'react';
import styles from './Loader.module.scss';
import { RotatingLines } from 'react-loader-spinner';

export const Loader = ({ extraClass }: { extraClass?: string }): React.JSX.Element => {
    return (
        <div className={`${styles.loader_wrapper} ${extraClass}`}>
            <RotatingLines
                visible={true}
                width="96"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
        </div>
    );
};

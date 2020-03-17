import styles from './Background.module.css';
import React, {FunctionComponent} from "react";


const Background: React.FC = () => {
    return (
        <div id="Background" className={styles.background}/>
    );
};


export default Background;
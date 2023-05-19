import React from 'react';

export default (props) => {
    return (
        <a target="_blank" href={props.data.link}>{props.data.link}</a>
    );
};
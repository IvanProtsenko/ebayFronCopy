import React from 'react';

export default (props) => {
    return (
        <a href={props.data.link}>{props.data.link}</a>
    );
};
import React from 'react';

export default (props) => {
    return (
        <a target="_blank" href={'chat/'+props.data.adItemId}>to chat</a>
    );
};
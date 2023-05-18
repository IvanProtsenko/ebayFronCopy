import React from 'react';

export default (props) => {
    return (
        <a target="blank" href={'chat/'+props.data.adItemId}>to chat</a>
    );
};
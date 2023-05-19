import React from 'react';

export default (props) => {
    if(props.data.viewed)
        return (
            <a target="_blank" href={'chat/'+props.data.adItemId}>to chat</a>
        );
    else 
        return (
            <a target="_blank" href={'chat/'+props.data.adItemId}><b>to chat</b></a>
        );
};
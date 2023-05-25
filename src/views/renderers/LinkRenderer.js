import React from 'react';
import { apiService } from '../../services/ApiService';

async function changeViewed(data) {
    await apiService.updateAdvertByPk({adItemId: data.adItemId, viewed: true})
}

export default (props) => {
    return (
        <a onClick={async () => changeViewed(props.data)} target="_blank" href={props.data.link}>{props.data.link}</a>
    );
};
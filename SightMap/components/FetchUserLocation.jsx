import React from 'react';
import { Button } from 'react-native';

const FetchUserLocation = props => {
    return (
        <Button title="Get location" onPress={props.onGetUserLocation} />
    );
};

export default FetchUserLocation;
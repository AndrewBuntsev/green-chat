import React from 'react';
import { TouchableOpacity, Image, StyleSheet, TouchableHighlight, ImageSourcePropType } from 'react-native';

type Props = {
    onPress(): void;
    imageSource: ImageSourcePropType;
    style?: object;
};
type State = {
};

export default class CircleButton extends React.PureComponent<Props, State>{
    render() {
        return <TouchableOpacity
            onPress={this.props.onPress}
            style={{ ...styles.container, ...this.props.style }}>
            <Image source={this.props.imageSource} />

        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#B1D8B7',
        borderRadius: 50
    }
});
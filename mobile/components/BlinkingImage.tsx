import React from 'react';
import { TouchableOpacity, Image, StyleSheet, TouchableHighlight, ImageSourcePropType } from 'react-native';

type Props = {
    imageSource: ImageSourcePropType;
    interval: number;
    style?: object;
};

type State = {
    isVisible: boolean;
};

export default class BlinkingImage extends React.PureComponent<Props, State>{
    state = {
        isVisible: false
    }

    blinkingInterval: number;

    toggleBlink = () => this.setState((state: State): State => ({ isVisible: !state.isVisible }));

    componentDidMount() {
        this.blinkingInterval = setInterval(this.toggleBlink, this.props.interval);
    }

    render() {
        return (
            <TouchableOpacity style={{ ...styles.container, ...this.props.style }}>
                {this.state.isVisible && <Image source={this.props.imageSource} />}
            </TouchableOpacity>
        );
    }

    componentWillUnmount() {
        clearInterval(this.blinkingInterval);
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30
    }
});
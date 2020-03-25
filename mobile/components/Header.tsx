import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as store from './../redux/store';
import { ClientDetails } from '../types/ClientDetails';
import { getStatusImage } from '../helpers/getStatusImage';

const STATUS_IMAGE_SIZE = 30;

type Props = {
    clientDetails: ClientDetails;
};
type State = {};

class Header extends React.Component<Props, State> {
    render() {
        return <View style={styles.container}>
            <View style={styles.captionContainer}>
                <Text style={styles.caption}>GreenChat</Text>
            </View>

            <View style={styles.clientNameContainer}>
                <Text style={styles.clientName}>{this.props.clientDetails.clientName}</Text>
                <Image style={styles.statusImage} source={getStatusImage(this.props.clientDetails.status)} width={STATUS_IMAGE_SIZE} height={STATUS_IMAGE_SIZE} />
            </View>

        </View>;
    }
}


const mapStateToProps = (state: store.State) => ({
    clientDetails: state.clientDetails
});

export default connect(mapStateToProps)(Header);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-end',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    captionContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    caption: {
        color: '#2F5233',
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'serif'
    },
    clientNameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //marginEnd: 5
    },
    clientName: {
        alignSelf: 'flex-end',
        color: '#08313A',
        fontSize: 20,
        fontWeight: 'bold',
        marginEnd: 5
    },
    statusImage: {
        alignSelf: 'flex-end',
    }
});
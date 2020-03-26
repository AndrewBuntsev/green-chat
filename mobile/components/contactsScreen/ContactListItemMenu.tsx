import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';


type Props = {
  deleteButtonClick(): void;
  cancelButtonClick(): void;
};

type State = {

};

export default class ContactListItemMenu extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.deleteButtonClick} style={styles.deleteImageContainer}>
          <Image source={require('./../../assets/delete.png')} style={styles.deleteImage} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.cancelButtonClick} style={styles.cancelImageContainer}>
          <Image source={require('./../../assets/back.png')} style={styles.cancelImage} />
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  deleteImageContainer: {
    alignSelf: 'center',
    marginEnd: 40
  },
  deleteImage: {
    width: 30,
    height: 30
  },
  cancelImageContainer: {
    alignSelf: 'center',
    marginEnd: 20
  },
  cancelImage: {
    width: 30,
    height: 30
  }
});

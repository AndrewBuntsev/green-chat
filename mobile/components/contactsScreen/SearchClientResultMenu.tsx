import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, TouchableOpacity } from 'react-native';


type Props = {
  addButtonClick(): void;
  messageButtonClick(): void;
};

type State = {

};

export default class SearchClientResultMenu extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.addButtonClick} style={styles.addImageContainer}>
          <Image source={require('./../../assets/add.png')} style={styles.addImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.messageButtonClick} style={styles.messageImageContainer}>
          <Image source={require('./../../assets/message.png')} style={styles.messageImage} />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: '#B5D595',
    marginStart: 10,
    marginEnd: 10
  },
  addImageContainer: {
    alignSelf: 'center',
    backgroundColor: '#B5D595'
    //marginEnd: 20
  },
  addImage: {
    width: 30,
    height: 30,
    marginStart: 50,
    marginBottom: 10
  },
  messageImageContainer: {
    alignSelf: 'center',
    backgroundColor: '#B5D595'
    //marginEnd: 20
  },
  messageImage: {
    width: 30,
    height: 30,
    marginStart: 30,
    marginBottom: 10
  }
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


type Props = {
    options: Array<{ label: string, value: any }>;
    selectedOption: string;
    selectOption(option: any): void;
};

type State = {};

export default class RadioButtonGroup extends React.PureComponent<Props, State> {
    render() {
        const radioButtons = this.props.options.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i} >
                <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.props.selectedOption == obj.value}
                    onPress={() => this.props.selectOption(obj.value)}
                    borderWidth={2}
                    buttonInnerColor={'#107869'}
                    buttonOuterColor={'#107869'}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10, padding: 8, paddingTop: 14 }}
                />
                <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => this.props.selectOption(obj.value)}
                    labelStyle={{ fontSize: 20, color: '#107869' }}
                    labelWrapStyle={{ padding: 9, paddingTop: 15 }}
                />
            </RadioButton>
        ));

        return (
            <View style={styles.container}>
                {radioButtons}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {

    }
});




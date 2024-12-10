import { TextInput, View, StyleSheet, Dimensions } from "react-native";

const WritingBoard = () => {
  return (
    <View style={styles.writeContainer}>
          <TextInput
            multiline
            style={styles.writing}
            placeholder="여기에 입력하세요!"
          />
        </View>
  )
}

const styles = StyleSheet.create({
  writeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: Dimensions.get('window').height / 2,
    marginTop: '15%',
    paddingTop: 15,
    paddingLeft: 15,
  },
  writing: {
    fontSize: 15,
  },
});

export default WritingBoard;
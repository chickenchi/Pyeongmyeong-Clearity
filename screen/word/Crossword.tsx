import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AddWord} from 'Word/tool/AddingWord';
import {CheckNInsert} from 'Word/tool/CheckNInsert';
import {FillLack} from 'Word/tool/FillLack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Button,
  TextInput,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {Multiset} from 'algorithm/Multiset';
import Hr from '@components/ui/Hr';

interface CrosswordPageProps {
  navigation: NativeStackNavigationProp<any, 'default'>;
}

const maxLen = 7;
const wordCount = 7;

let space: number[][] = Array.from({length: maxLen}, () =>
  Array(maxLen).fill(0),
);

let crossword: string[][] = Array.from({length: maxLen}, () =>
  Array(maxLen).fill(''),
);
let cwDescription: string[][] = Array.from({length: maxLen}, () =>
  Array(maxLen).fill(''),
);
let cw: any[][] = Array.from({length: maxLen}, () => Array(maxLen).fill(''));

let wait: boolean = true;

const Crossword = ({navigation}: CrosswordPageProps) => {
  const [reset, resetter] = useState(0);
  const [description, SetDescription] = useState<any>();

  const Resetting = async () => {
    let errorStatue: string = '0';

    wait = true;
    resetter(-1);

    do {
      errorStatue = '0';

      space = Array.from({length: maxLen}, () => Array(maxLen).fill(0));

      crossword = Array.from({length: maxLen}, () => Array(maxLen).fill(''));
      cwDescription = Array.from({length: maxLen}, () =>
        Array(maxLen).fill(''),
      );
      cw = Array.from({length: maxLen}, () => Array(maxLen).fill(''));

      let visited = new Array(wordCount);
      let cnt: number = 0;

      let direction: Array<[number, number, number, string]> = []; // col, row, length

      const distinct: Multiset<number[]> = new Multiset<number[]>();

      while (cnt < wordCount) {
        if (CheckNInsert(distinct, direction, space, cnt, maxLen)) cnt += 1;
      }

      for (var i = 0; i < wordCount; i++)
        FillLack(direction[i], i, space, direction, distinct, maxLen);

      for (var i = 0; i < wordCount; i++) {
        errorStatue = await AddWord(
          direction[i],
          i,
          crossword,
          maxLen,
          wordCount,
          distinct,
          visited,
          direction,
          cwDescription,
        );

        if (errorStatue !== '0') {
          if (errorStatue === 'X') {
            console.log('끔찍한 오류');
            navigation.navigate('home');
          }
          console.log('오류 남: ' + errorStatue);
          break;
        }
      }

      if (errorStatue !== '0') continue;

      for (let i = 0; i < maxLen; i++)
        for (let j = 0; j < maxLen; j++)
          if (space[i][j] != 0)
            cw[i][j] = (
              <TextInput
                onFocus={() => ChangeDescription(i, j)}
                maxLength={1}
                id={crossword[i][j]}
                style={styles.inputWord}></TextInput>
            );
    } while (errorStatue !== '0');

    wait = false;
    resetter(-2);

    console.log('End Line');
  };

  useEffect(() => {
    if (reset == 0) Resetting();
  });

  const BacktoHome = () => {
    wait = true;
    navigation.navigate('home');
  };

  const ChangeDescription = (i: any, j: any) => {
    if (cwDescription[i][j].includes('/')) {
      let descSet: string[] = cwDescription[i][j].split(' / ')[0].split('; ');

      let title: string = descSet[0];
      let desc: string = descSet[1];

      let descSet2: string[] = cwDescription[i][j].split(' / ')[1].split('; ');

      let title2: string = descSet2[0];
      let desc2: string = descSet2[1];

      SetDescription(
        <View>
          <Text style={styles.dTitle}>{title}</Text>
          <Text style={styles.dDescription}>{desc}</Text>
          <Text style={styles.dTitle}>{title2}</Text>
          <Text style={styles.dDescription}>{desc2}</Text>
        </View>,
      );
    } else {
      let descSet: string[] = cwDescription[i][j].split('; ');

      let title: string = descSet[0];
      let desc: string = descSet[1];

      SetDescription(
        <View>
          <Text style={styles.dTitle}>{title}</Text>
          <Text style={styles.dDescription}>{desc}</Text>
        </View>,
      );
    }
  };

  const Reshake = () => {
    if (!wait) {
      wait = true;
      resetter(0);
    }
  };

  return (
    <SafeAreaView style={styles.BG}>
      <View style={styles.tbContainer}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#999999'}}>
          <Rows data={cw} textStyle={styles.tbText} />
        </Table>
      </View>
      <View style={styles.touchableContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={BacktoHome}>
          <Text style={styles.backBtnTxt}>나가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={Reshake}>
          <Text style={styles.backBtnTxt}>다시 섞기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.description}>{description}</View>
      <View
        style={[
          styles.waitView,
          wait ? styles.showWaitView : styles.hideWaitView,
        ]}>
        <Text style={styles.waitText}>생성 중...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    position: 'relative',
    backgroundColor: '#ffffff',

    alignItems: 'center',
    flex: 1,
  },

  waitView: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    alignItems: 'center',
    justifyContent: 'center',
  },

  showWaitView: {
    display: 'flex',
  },

  hideWaitView: {
    display: 'none',
  },

  waitText: {
    fontFamily: 'Inter',
    fontSize: 40,
    color: 'white',
  },

  tbContainer: {
    width: '100%',
    height: '50%',
    padding: 20,
    paddingTop: 30,
  },
  tbText: {
    color: 'white',
    textAlign: 'center',
    margin: 6,
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    textAlign: 'center',
    flex: 1,
  },

  touchableContainer: {
    width: '80%',
    position: 'absolute',
    bottom: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },

  backBtn: {
    flex: 1,
    backgroundColor: '#E04E92',
    padding: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
  },
  backBtnTxt: {
    fontFamily: 'Inter',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  inputWord: {
    fontFamily: 'Inter',
    backgroundColor: '#E04E92',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },

  description: {
    width: '90%',
    height: '40%',
  },
  dTitle: {
    fontFamily: 'Inter',
    color: '#222222',
    fontSize: 25,
  },
  dDescription: {
    fontFamily: 'Inter',
    marginTop: 15,
    fontSize: 20,
  },
});

export default Crossword;

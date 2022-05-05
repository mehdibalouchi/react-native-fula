/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  NativeModules,
  Button
} from 'react-native';

import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
} from 'react-native-document-picker'

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { FulaModule } = NativeModules;

  useEffect(() => {
    (async () => {
      await FulaModule.connect("/ip4/192.168.1.10/tcp/4002/p2p/12D3KooWDVgPHx45ZsnNPyeQooqY8VNesSR2KiX2mJwzEK5hpjpb");
      console.log("connected")

      // const cid = await FulaModule.send('/storage/emulated/0/DCIM/Camera/20220222_133812.heic')
      // console.log("file saved with CID: ", cid)

      // const filepath = await FulaModule.receive(cid)
      // console.log(filepath)
    })()

    // console.log("connected")
    // const cid = FulaModule.send('/storage/emulated/0/Download/farhoud_meeting.txt')
    // console.log(cid)
  });

  const [result, setResult] = React.useState<DocumentPickerResponse | undefined | null>()
  const [cid, setCid] = React.useState<string | undefined | null>()
  const [filePath, setFilePath] = React.useState<string | undefined | null>()

  useEffect(() => {
    console.log(JSON.stringify(result, null, 2))
  }, [result])

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title="open picker for single file selection"
            onPress={async () => {
              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  presentationStyle: 'fullScreen',
                  copyTo: 'documentDirectory',
                })
                setResult(pickerResult)
              } catch (e) {
                handleError(e)
              }
            }}
          />
          <Button
            title="send"
            onPress={async () => {
              try {
                if (result) {
                  const _filePath = result.fileCopyUri?.split("file:")[1]
                  const _cid = await FulaModule.send(_filePath)
                  console.log("file saved with CID: ", _cid)
                  setCid(_cid)
                }
              } catch (e) {
                handleError(e)
              }
            }}
          />
          <Button
            title="get"
            onPress={async () => {
              try {
                if (result) {
                  const _filepath = await FulaModule.receive(cid)
                  console.log(_filepath)
                  setFilePath(_filepath)
                }
              } catch (e) {
                handleError(e)
              }
            }}
          />
          {filePath &&<Image source={{uri: `${filePath}`}}></Image>}
          {filePath &&<Text>{filePath}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

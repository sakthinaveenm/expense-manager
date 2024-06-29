import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
// import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// import useResponsive from '../../../hooks/useResponsive';
// import {IS_TABLET} from '../../../services/utility';
import useResponsive from '../../../../hooks/useResponsive';
import { IS_TABLET } from '../../../../services/utility';

const CFormInput = ({
  label,
  onChange,
  onChangeText,
  value,
  placeholder,
  errResponse,
  containerStyle,
  datecontainerStyle = null,
  dateinputStyle = null,
  secureTextEntry,
  editable,
  TxtInputStyle,
  name,
  id,
  keyboardType,
  labelStyle = null,
  placeholderTextColor 
}) => {
  const {wp, hp} = useResponsive();
  const inputContainerWidth = containerStyle?.width ?? wp('100%');
  const [show, setShow] = useState(false);

  const styles = StyleSheet.create({
    textInput: {
      height: 40,
      borderWidth: 1,
      borderColor: '#1DA1F2',
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 16,
    },
    errResponse: {
      color: '#cc0000',
      paddingVertical: IS_TABLET ? hp(1) : hp(0.3),
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
    },
  });

  return (
    <View
      style={{
        width: inputContainerWidth,
        ...containerStyle,
      }}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {keyboardType === 'date' ? (
        <>
          <TouchableOpacity
            style={[
              {
                width: inputContainerWidth,
                // backgroundColor: APPEARANCE.BUTTON,
                paddingVertical: 15,
                alignItems: 'center',
              },
              datecontainerStyle,
            ]}
            onPress={() => {
              setShow(true);
            }}>
            <Text style={[dateinputStyle]}>
              {moment(value).format('DD - MM - YYYY')}
            </Text>
          </TouchableOpacity>
          {/* {show && (
            <DatePicker
              mode="date"
              value={value}
              placeholder="select date"
              format="YYYY-MM-DD"
              onChange={(event, text) => {
                onChange(text);
                onChangeText(text);
                setShow(Platform.OS === 'ios');
              }}
              style={{
                width: inputContainerWidth,
                ...styles.textInput,
                ...TxtInputStyle,
              }}
            />
          )} */}
        </>
      ) : (
        <TextInput
          id={id}
          name={name}
          placeholder={placeholder}
          onChangeText={text => {
            onChange(text);
            onChangeText(text);
          }}
          editable={editable}
          secureTextEntry={secureTextEntry}
          style={{
            width: inputContainerWidth,
            ...styles.textInput,
            ...TxtInputStyle,
          }}
          value={value}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderTextColor}
        />
      )}
      {errResponse !== '' && (
        <Text style={styles.errResponse}>{errResponse}</Text>
      )}
    </View>
  );
};

CFormInput.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  errResponse: '',
  containerStyle: {},
  secureTextEntry: false,
  onChange: () => {},
  onChangeText: () => {},
  editable: true,
  TxtInputStyle: {},
  name: '',
  id: '',
  keyboardType: 'default',
};

export default CFormInput;

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import moment from 'moment';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import FeatherIcons from 'react-native-vector-icons/Feather';
import useResponsive from '../../../hooks/useResponsive';
import { IS_TABLET } from '../../../services/utility';

const CFormInput = ({
  label,
  onChange,
  onChangeText,
  value,
  placeholder,
  errResponse,
  containerStyle,
  secureTextEntry,
  editable,
  txtInputStyle = null,
  labelStyle = null,
  isRequired = false,
  isDate = false,
  isDropDown = false,
  isMultiDropDown = false,
  options = [],
  DropDownContainerStyle = null,
  DropDownplaceholderStyle = null,
  showCheck = false,
  isPassword = false,
  onShowCheckFun,
  errResponseColor = '#cc0000',
  errResponseNestedChild = null,
  keyboardType = 'default',
  minDate = undefined,
  maxDate = undefined,
}) => {
  const {wp, hp} = useResponsive();
  const INPUT_BORDER_COLOR = '#f4f4f4';
  const inputContainerWidth = containerStyle?.width ?? wp('100%');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const CText = props => <Text {...props} />;
  const isDarkMode = false;

  const styles = StyleSheet.create({
    textInput: {
      height: 40,
      borderRadius: wp(0.5),
      borderWidth: 1,
      paddingLeft: wp(1.5),
      color: isDarkMode ? '#f4f4f4' : '#000',
    },
    errResponse: {
      color: errResponseColor,
      paddingVertical: IS_TABLET ? hp(1) : hp(0.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontWeight: '700',
      paddingVertical: IS_TABLET ? hp(1) : hp(0.3),
      fontSize: IS_TABLET ? hp(2.2) : hp(1.8),
    },
  });

  return (
    <View
      style={{
        width: inputContainerWidth,
        ...containerStyle,
      }}>
      <CText style={[styles.label, labelStyle]}>
        {label}
        {isRequired && <Text style={{color: 'red'}}> *</Text>}
      </CText>
      {isMultiDropDown ? (
        <MultiSelect
          data={options}
          style={DropDownContainerStyle}
          value={value}
          maxHeight={hp(300)}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          placeholderStyle={DropDownplaceholderStyle}
          onChange={item => {
            // setValue(item);
            onChange(item);
            onChangeText(item);
          }}
        />
      ) : isDropDown ? (
        <Dropdown
          data={options}
          style={DropDownContainerStyle}
          value={value}
          maxHeight={hp(300)}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          placeholderStyle={DropDownplaceholderStyle}
          onChange={item => {
            // setValue(item);
            onChange(item);
            onChangeText(item);
          }}
        />
      ) : isDate ? (
        <Fragment>
          {/* <DatePicker
            modal
            open={open}
            date={value ?? new Date()}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              onChange(date);
              onChangeText(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            minimumDate={minDate}
            maximumDate={maxDate}
          /> */}
          <TouchableOpacity
            onPress={() => {
              if (editable) {
                setOpen(true);
              }
            }}
            style={{
              width: inputContainerWidth,
              borderColor: INPUT_BORDER_COLOR,
              ...styles.textInput,
              ...txtInputStyle,
              justifyContent: 'center',
            }}>
            <Text>
              {value ? moment(value).format('DD/MM/YYYY') : 'dd/mm/yyyy'}
            </Text>
          </TouchableOpacity>
        </Fragment>
      ) : (
        <View
          style={{
            position: 'relative',
          }}>
          <TextInput
            placeholder={placeholder}
            onChangeText={text => {
              onChange(text);
              onChangeText(text);
            }}
            editable={editable}
            secureTextEntry={isPassword ? !showPassword : secureTextEntry}
            style={{
              width: inputContainerWidth,
              borderColor: INPUT_BORDER_COLOR,
              ...styles.textInput,
              ...txtInputStyle,
            }}
            value={value}
            keyboardType={keyboardType}
          />
          {(showCheck || isPassword) && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: '5%',
                top: '30%',
              }}
              onPress={() => {
                if (isPassword) {
                  setShowPassword(!showPassword);
                }
                onShowCheckFun();
              }}>
              {showCheck ? (
                <CText style={{color: '#237d84'}}>Check</CText>
              ) : (
                <FeatherIcons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}

      {errResponse !== '' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <CText style={styles.errResponse}>{errResponse}</CText>
          </View>
          <View>{errResponseNestedChild}</View>
        </View>
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
  onShowCheckFun: () => {},
  editable: false,
};

export default CFormInput;

import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS } from '../../utils/constants';

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar por nome, email ou documento...',
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        returnKeyType="search"
        clearButtonMode="while-editing"
        accessibilityLabel="Campo de busca"
        accessibilityHint="Digite para buscar participantes"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    color: COLORS.black,
  },
});
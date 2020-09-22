import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast';

import {
  Container,
  Wrapper,
  CustomImage,
  Label,
  LoginButton,
  ButtonText,
} from './styles';

import * as ProfileActions from '~/store/modules/profile/actions';
import api from '~/services/api';

import TInput from '~/components/Input';
import logo from '~/assets/icons/logo.png';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    setLoading(true);
    const response = await api.get('profile', {
      params: {
        q: `${email}`,
      },
    });
    setLoading(false);
    setTimeout(() => {
      if (response.data.length > 0) {
        if (String(response.data[0].password) === String(password)) {
          const user = {
            email: response.data[0].email,
            name: response.data[0].name,
          };
          dispatch(ProfileActions.SignIn(user));
          navigation.navigate('BottomRoutes');
        } else {
          setPassword('');
          Toast.show('Email ou senha inválidos', {
            duration: Toast.durations.SHORT,
            position: 35,
            backgroundColor: 'red',
            shadow: true,
            hideOnPress: true,
          });
        }
      }
    }, 50);
  }
  async function handlecadastro() {
    navigation.navigate('Cadastro');
  }

  return (
    <Container>
      <CustomImage source={logo} />
      <Wrapper>
        <Label>E-mail</Label>
        <TInput
          icon="envelope"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          placeholder="Digite seu e-mail"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />
      </Wrapper>
      <Wrapper>
        <Label>Senha</Label>
        <TInput
          icon="lock"
          returnKeyType="send"
          placeholder="Digite sua senha"
          secureTextEntry
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
        />
      </Wrapper>
      <LoginButton
        onPress={() => {
          handleLogin();
        }}
      >
        {!loading ? (
          <ButtonText>Login</ButtonText>
        ) : (
          <ActivityIndicator color="#cb726c" size="large" />
        )}
      </LoginButton>
      <LoginButton
        onPress={() => {
          handlecadastro();
        }}
      >
        {!loading ? (
          <ButtonText>Cadastro</ButtonText>
        ) : (
          <ActivityIndicator color="#cb726c" size="large" />
        )}
      </LoginButton>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

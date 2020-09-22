import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons/';

import * as ProfileActions from '~/store/modules/profile/actions';

import {
  Container,
  HeaderProfile,
  ProfileInfo,
  Name,
  Email,
  ProfileAvatar,
  SingOutButton,
  SignOutText,
} from './styles';

import ProfileButton from '~/components/ProfileButton';
import TabIcon from '~/components/TabIcon';
import colors from '~/styles/colors';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const UserProfile = useSelector(state => state.profile);

  function handleSignOut() {
    dispatch(ProfileActions.SignOut());
    navigation.navigate('SignIn');
  }

  return (
    <Container>
      <HeaderProfile>
        <ProfileAvatar
          source={{
            uri: 'https://api.adorable.io/avatars/100/abott@adorable.png',
          }}
        />
        <ProfileInfo>
          <Name>{UserProfile.name}</Name>
          <Email>{UserProfile.email}</Email>
        </ProfileInfo>
      </HeaderProfile>
      <ProfileButton name="cube">Pedidos</ProfileButton>
      <ProfileButton name="user">Dados Pessoais</ProfileButton>
      <ProfileButton name="truck">Endereços</ProfileButton>
      <SingOutButton onPress={handleSignOut}>
        <SignOutText>Sair</SignOutText>
        <FontAwesome
          style={{ marginLeft: 20 }}
          name="sign-out"
          color="rgba(255, 0, 0, 0.6)"
          size={20}
        />
      </SingOutButton>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 12 }}>Perfil</Text>,
  tabBarIcon: props => <TabIcon name="user" {...props} />,
  tabBarColor: `${colors.primary}`,
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

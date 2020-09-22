import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  background: #cb726c;
  align-items: center;
  padding: 8px 15px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'center',
})`
  height: 50px;
  width: 80px;
  margin-right: 10px;
`;

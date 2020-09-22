import React, { useMemo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import {
  Container,
  DepartmentContainer,
  DepartmentItem,
  DepartmentLogo,
  DepartmentImage,
  DepartmentText,
  SalesContainer,
  SpinnerLoading,
  Wrapper,
  EmptyImage,
} from './styles';

import Header from '~/components/Header';
import ProductItem from '~/components/ProductItem';
import api from '~/services/api';
import all from '~/assets/icons/online-store.png';
import drone from '~/assets/icons/drone.png';
import tv from '~/assets/icons/tv.png';
import videogames from '~/assets/icons/videogames.png';
import laptop from '~/assets/icons/laptop.png';
import notfound from '~/assets/images/not-found.png';

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [department, setDepartment] = useState('todos');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const response = await api.get('products');
    setProducts(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useMemo(async () => {
    setLoading(true);
    let response;
    let response1;
    if (department !== 'todos') {
      response = await api.get('department', {
        params: {
          q: department,
          embed: 'products',
        },
      });
      const data = response.data[0].id;
      console.log(department);
      response1 = await api.get('products', {
        params: {
          departmentId: data,
        },
      });
      setProducts(response1.data);
    } else {
      response = await api.get('products');
      setProducts(response.data);
    }
    setLoading(false);
  }, [department]);

  async function handleSearchSubmit(search) {
    setLoading(true);
    const response = await api.get('products', {
      params: {
        q: search,
      },
    });
    setProducts(response.data);
    setLoading(false);
  }

  return (
    <Container>
      <Header handleSearchSubmit={handleSearchSubmit} />
      <DepartmentContainer>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('todos');
            }}
          >
            <DepartmentImage source={all} />
          </DepartmentLogo>
          <DepartmentText>Todos</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('Medicamentos');
            }}
          >
            <DepartmentImage source={drone} />
          </DepartmentLogo>
          <DepartmentText>Medicamentos</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('Higiene');
            }}
          >
            <DepartmentImage source={tv} />
          </DepartmentLogo>
          <DepartmentText>Higiene</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('bebe');
            }}
          >
            <DepartmentImage source={laptop} />
          </DepartmentLogo>
          <DepartmentText>Mamãe e bebê</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('Beleza');
            }}
          >
            <DepartmentImage source={videogames} />
          </DepartmentLogo>
          <DepartmentText>Beleza</DepartmentText>
        </DepartmentItem>
      </DepartmentContainer>

      <SalesContainer>
        {loading ? (
          <SpinnerLoading />
        ) : (
          <>
            {products.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={products}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <ProductItem item={item} navigation={navigation} />
                )}
              />
            ) : (
              <Wrapper>
                <EmptyImage source={notfound} />
              </Wrapper>
            )}
          </>
        )}
      </SalesContainer>
    </Container>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

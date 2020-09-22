import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '~/util/format';
import email from 'react-native-email';
import {
  Container,
  TotalWrapper,
  TotalText,
  TotalPrice,
  FinishButton,
  Wrapper,
  BuyButton,
  ButtonText,
  EmptyCartImage,
  WrapperAnimation,
  CheckoutAnimation,
} from './styles';
import ProductCart from '~/components/ProductCart';
import emptyCart from '~/assets/images/empty-cart.png';
import checkout from '~/assets/animations/checkout.json';

import * as CartActions from '~/store/modules/cart/actions';

export default function Cart({ navigation }) {
  const dispatch = useDispatch();

  const [isCheckout, setIsCheckout] = useState(false);

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.finalPrice * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.finalPrice * product.amount;
      }, 0)
    )
  );

  function handleCheckout() {
    dispatch(CartActions.checkoutRequest());

    setIsCheckout(true);
    setTimeout(() => {
      setIsCheckout(false);
    }, 1500);
  }

  return (
    <Container>
      {isCheckout && (
        <WrapperAnimation>
          <CheckoutAnimation autoPlay loop source={checkout} />
        </WrapperAnimation>
      )}
      {cart.length > 0 ? (
        <>
          <FlatList
            numColumns={1}
            data={cart}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <ProductCart item={item} />}
          />
          <TotalWrapper>
            <TotalText>
              TOTAL
              <TotalPrice> {total}</TotalPrice>
            </TotalText>
          </TotalWrapper>
          <FinishButton onPress={() => handleCheckout()}>
            <ButtonText>Finalizar pedido</ButtonText>
          </FinishButton>
        </>
      ) : (
        !isCheckout && (
          <Wrapper>
            <EmptyCartImage source={emptyCart} />
            <BuyButton onPress={() => navigation.navigate('HomeRoute')}>
              <ButtonText>Ir às compras</ButtonText>
            </BuyButton>
          </Wrapper>
        )
      )}
    </Container>
  );
}

Cart.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

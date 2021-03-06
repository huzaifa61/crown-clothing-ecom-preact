import { h } from "preact";
import { Link } from "preact-router/match";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";

import CustomButton from "./custom-button";
import CartItem from "./cart-item";
import { selectCartItems } from "../store/cart/cart.selectors";
import { toggleCartHidden } from "../store/cart/cart.actions";

const CartDropdownStyled = styled.div`
  position: absolute;
  width: 240px;
  height: 350px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
  top: 80px;
  right: 70px;

  @media screen and (max-width: 991px) {
    top: 70px;
    right: 30px;
  }

  @media screen and (max-width: 767px) {
    top: 65px;
  }
`;

const GoToCheckoutButtonStyled = styled(CustomButton)`
  margin-top: 15px;
`;

const LinkStyled = styled(Link)`
  margin: 0 auto;
`;

const EmptyMessageStyled = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

const CartItemsContainerStyled = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const CartDropdown = ({ cartItems, dispatch }) => (
  <CartDropdownStyled>
    <CartItemsContainerStyled>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageStyled>Your cart is empty.</EmptyMessageStyled>
      )}
    </CartItemsContainerStyled>
    <LinkStyled href="/checkout" onClick={() => dispatch(toggleCartHidden())}>
      <GoToCheckoutButtonStyled>GO TO CHECKOUT</GoToCheckoutButtonStyled>
    </LinkStyled>
  </CartDropdownStyled>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapStateToProps)(CartDropdown);

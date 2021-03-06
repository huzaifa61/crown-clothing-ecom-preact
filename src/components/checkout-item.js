import { h } from "preact";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { createStructuredSelector } from "reselect";

import { selectBrowserisWebPSupported } from "../store/browser/browser.selectors";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../store/cart/cart.actions";

const CheckoutItemStyled = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

const CheckoutColumnStyled = css`
  width: 23%;

  @media screen and (max-width: 767px) {
    width: 21%;
  }
`;

const ImageContainerStyled = styled.div`
  ${CheckoutColumnStyled}
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const NameStyled = styled.span`
  ${CheckoutColumnStyled}
`;

const QuantityStyled = styled.span`
  ${CheckoutColumnStyled}
  display: flex;
`;

const QuantityArrowStyled = styled.div`
  cursor: pointer;
`;

const QuantityValueStyled = styled.span`
  margin: 0 10px;
`;

const PriceStyled = styled.span`
  ${CheckoutColumnStyled}
`;

const RemoveButtonStyled = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

const CheckoutItem = ({
  cartItem,
  clearItem,
  addItem,
  removeItem,
  isWebPSupported,
}) => {
  const { name, price, imageUrl, imageUrlWebP, quantity } = cartItem;
  return (
    <CheckoutItemStyled>
      <ImageContainerStyled>
        <img src={isWebPSupported ? imageUrlWebP : imageUrl} alt={name} />
      </ImageContainerStyled>
      <NameStyled>{name}</NameStyled>
      <QuantityStyled>
        <QuantityArrowStyled onClick={() => removeItem(cartItem)}>
          &#10094;
        </QuantityArrowStyled>
        <QuantityValueStyled>{quantity}</QuantityValueStyled>
        <QuantityArrowStyled onClick={() => addItem(cartItem)}>
          &#10095;
        </QuantityArrowStyled>
      </QuantityStyled>
      <PriceStyled>{price}</PriceStyled>
      <RemoveButtonStyled onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonStyled>
    </CheckoutItemStyled>
  );
};

const mapStateToProps = createStructuredSelector({
  isWebPSupported: selectBrowserisWebPSupported,
});
const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);

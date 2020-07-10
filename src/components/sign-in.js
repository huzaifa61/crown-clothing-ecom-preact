import React, { Component } from "react";
import styled from "styled-components";

import FormInput from "./form-input";
import CustomButton from "./custom-button";
import { auth, signInWithGoogle } from "../firebase/utils";
import { EMPTY_SIGN_IN_STATE } from "../constants/empty-auth-state";

const SignInStyled = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

const TitleStyled = styled.h2`
  margin: 10px 0;
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

class SignIn extends Component {
  state = { ...EMPTY_SIGN_IN_STATE };

  methods = {
    handleFormSubmit: async (event) => {
      event.preventDefault();
      const { state: { email, password } = {} } = this;
      try {
        await auth.signInWithEmailAndPassword(email, password);
        this.setState({ ...EMPTY_SIGN_IN_STATE });
      } catch (error) {
        console.error(error);
      }
    },
    handleFormInputChange: (event) => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
    },
  };

  render() {
    const {
      state: { email, password } = {},
      methods: { handleFormSubmit, handleFormInputChange } = {},
    } = this;
    return (
      <SignInStyled>
        <TitleStyled>I already have an account.</TitleStyled>
        <span>Sign in with your email and password.</span>
        <form onSubmit={handleFormSubmit}>
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleFormInputChange}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleFormInputChange}
            required
          />
          <ButtonGroupStyled>
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} googleSignIn>
              Sign In with Google
            </CustomButton>
          </ButtonGroupStyled>
        </form>
      </SignInStyled>
    );
  }
}

export default SignIn;
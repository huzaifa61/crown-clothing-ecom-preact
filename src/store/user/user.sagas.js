import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/utils";
import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
} from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      }),
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* googleSignInStartAsync() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* googleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, googleSignInStartAsync);
}

export function* emailSignInStartAsync({ payload: { email, password } = {} }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* emailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, emailSignInStartAsync);
}

export function* checkUserSessionAsync() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* checkUserSession() {
  yield takeLatest(CHECK_USER_SESSION, checkUserSessionAsync);
}

export function* signOutStartAsync() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure());
  }
}

export function* signOutStart() {
  yield takeLatest(SIGN_OUT_START, signOutStartAsync);
}

export default function* userSagas() {
  yield all([
    call(googleSignInStart),
    call(emailSignInStart),
    call(checkUserSession),
    call(signOutStart),
  ]);
}

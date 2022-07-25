import { FormEvent, useState } from 'react';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { signIn } from '../../store/actions';
import { Navigate, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { AppRoute } from '../../const';
import { validateEmail, validatePassword } from '../../utils';
import React from 'react';


function Login() {
  const authInfo = useAppSelector((state) => state.authInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('some@mail.ru');
  const [password, setPassword] = useState('123w');
  const [errorMsg, setErrorMsg] = useState('');

  function handleFormSubmit(evt: FormEvent) {
    evt.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!isPasswordValid) {
      setErrorMsg('We can’t recognize this email and password combination. Please try again.');
      return;
    }

    dispatch(signIn({email, password}))
      .then(
        () => {
          navigate(-1);
        },
        (err: AxiosError) => console.log(err)
      );
  }

  if (authInfo) {
    return <Navigate to={AppRoute.Main} replace/>;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
          {
            errorMsg ? <div className="sign-in__message"><p>{errorMsg}</p></div> : ''
          }
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email"
                value={email} onChange={(evt) => setEmail(evt.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password"
                value={password} onChange={(evt) => setPassword(evt.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <PageFooter/>
    </div>
  );
}

export default Login;

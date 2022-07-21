import { FormEvent, useState } from 'react';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';


function Login() {

  const [email, setEmail] = useState('some@mail.ru');
  const [password, setPassword] = useState('123');


  function handleFormSubmit(evt: FormEvent) {
    evt.preventDefault();
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
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

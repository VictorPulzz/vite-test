import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
import { Icon } from '@ui/components/common/Icon';
import React from 'react';

import { store } from '~/store';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { signOut } from '~/store/modules/user';
import logo from '~/view/assets/images/logo.svg';

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(state => state.user.profile?.email);

  return (
    <div className="p-5">
      <h1 className="text-h1">Main page</h1>
      <hr />
      <section className="m-5">
        <p className="mb-5">
          Logged in via <b>{userEmail}</b>
        </p>
        <Button
          variant={ButtonVariant.PRIMARY}
          label="Sign out"
          size={ButtonSize.LARGE}
          className="w-auto px-6"
          onClick={() => dispatch(signOut())}
        />
      </section>
      <hr />
      <section className="m-5">
        <h2 className="text-h2">Image usage:</h2>
        <div className="bg-primary w-32 h-32 flex flex-center p-5 rounded-md">
          <img src={logo} alt="Logo" />
        </div>
      </section>
      <hr />
      <section className="m-5">
        <h2 className="text-h2">Icons usage:</h2>
        <p className="my-2">
          ❗Icon inherits <code>`color`</code> from its parents.
        </p>
        <div>
          <Icon name="example" size={50} className="text-accent" />
        </div>
        <pre className="bg-primary p-5 text-white rounded-md mt-2">
          {`<Icon name="example" size={50} className="text-accent" />`}
        </pre>
      </section>
      <hr />
      <section className="m-5">
        <h2 className="text-h2">Current redux state:</h2>
        <pre className="bg-primary p-5 text-white rounded-md mt-2 leading-6">
          {JSON.stringify(store.getState(), null, 2)}
        </pre>
      </section>
    </div>
  );
};

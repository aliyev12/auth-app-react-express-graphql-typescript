import React, { ReactChildren, useState, useEffect } from 'react';
import { AuthForm } from './AuthForm';
import { withRouter, RouteComponentProps } from 'react-router';
import { LOGIN } from '../mutations/Login';
import { CURRENT_USER } from '../queries/CurrentUser';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

interface AppProps extends RouteComponentProps {
  children: ReactChildren;
}

interface Login {
  email: string;
}

type OnSubmitProps = {
  email: string;
  password?: string;
};

const Login: React.FC<AppProps> = ({ history }) => {
  const [errors, setErrors] = useState([]);
  const [login, { loading }] = useMutation(LOGIN);
  const currentUser = useQuery(CURRENT_USER);
  useEffect(() => {
    if (currentUser && currentUser.data && currentUser.data.user) {
      history.push('/dashboard');
    }
  }, [currentUser]);

  const onSubmit = ({ email, password }: OnSubmitProps): void => {
    login({
      variables: { email, password },
      refetchQueries: [{ query: CURRENT_USER }]
    }).catch(error => {
      const errors = error.graphQLErrors.map(
        (err: { message: string }) => err.message
      );
      setErrors(errors);
    });
  };

  return (
    <div>
      <h3>Login</h3>
      <AuthForm
        errors={errors}
        onSubmit={onSubmit}
        loading={loading}
        queryLoading={currentUser.loading}
      />
    </div>
  );
};

export const LoginForm = withRouter(Login);

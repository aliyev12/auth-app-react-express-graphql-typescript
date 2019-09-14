import React, { ReactChildren, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AuthForm } from './AuthForm';
import { SIGNUP } from '../mutations/Signup';
import { CURRENT_USER } from '../queries/CurrentUser';

interface AppProps extends RouteComponentProps {
  children: ReactChildren;
}

const Signup: React.FC<AppProps> = ({ history }) => {
  const [signup, { error, loading }] = useMutation(SIGNUP);
  const currentUser = useQuery(CURRENT_USER);
  useEffect(() => {
    if (currentUser.data.user) {
      history.push('/dashboard');
    }
  }, [currentUser.data.user]);

  const onSubmit = ({ email, password }) => {
    signup({
      variables: { email, password },
      refetchQueries: [{ query: CURRENT_USER }]
    });
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <AuthForm
        onSubmit={onSubmit}
        errors={
          error
            ? error.graphQLErrors.map((err: { message: string }) => err.message)
            : []
        }
        loading={loading}
        queryLoading={currentUser.loading}
      />
    </div>
  );
};

export const SignupForm = withRouter(Signup);

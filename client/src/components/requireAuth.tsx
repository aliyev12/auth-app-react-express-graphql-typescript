import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CURRENT_USER } from '../queries/CurrentUser';

interface AppProps extends RouteComponentProps {}

export const requireAuth = WrappedComponent => {
  const Require: React.FC<AppProps> = props => {
    const { data, loading } = useQuery(CURRENT_USER);

    useEffect(() => {
      if (!loading && !data.user) {
        props.history.push('/login');
      }
    }, [data]);
    return <WrappedComponent {...props} />;
  };
  return withRouter(Require);
};

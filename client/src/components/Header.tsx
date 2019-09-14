import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '../queries/CurrentUser';
import { LOGOUT } from '../mutations/Logout';

export const Header: React.FC = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  const [logout] = useMutation(LOGOUT);

  const onLogoutClick = () => {
    logout({ refetchQueries: [{ query: CURRENT_USER }] });
  };

  const renderButtons = (): JSX.Element => {
    if (loading) return <div />;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    if (data && data.user) {
      return (
        <div>
          <li>
            <a onClick={onLogoutClick}>Logout</a>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  );
};

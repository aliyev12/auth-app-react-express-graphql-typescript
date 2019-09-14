import React, { useState, ChangeEvent, SyntheticEvent } from 'react';

interface AuthFormInterface {
  errors?: string[];
  loading?: boolean;
  queryLoading?: boolean;
  onSubmit?: (inputs: { email: string; password: string }) => void;
}

export const AuthForm: React.FC<AuthFormInterface> = ({ onSubmit, errors, loading, queryLoading }) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    onSubmit({ ...inputs });
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="col s6" method="POST">
        <div className="input-field">
          <label>Email</label>
          <input
            value={inputs.email}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setInputs({
                ...inputs,
                email: e.target.value
              })
            }
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            value={inputs.password}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setInputs({
                ...inputs,
                password: e.target.value
              })
            }
            type="password"
          />
        </div>
        <div className="errors">
          {errors.map(
            (error: string): JSX.Element => (
              <div key={error}>{error}</div>
            )
          )}
        </div>
        <button className="btn">Submit{loading || queryLoading ? 'ing...' : ''}</button>
      </form>
    </div>
  );
};

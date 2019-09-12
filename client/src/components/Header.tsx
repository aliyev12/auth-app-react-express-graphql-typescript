import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER } from '../queries/CurrentUser';

export const Header: React.FC = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  console.log(data)
  return (<header>header...</header>)}
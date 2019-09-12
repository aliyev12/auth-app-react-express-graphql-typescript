import React from 'react';
import { Header } from './Header'

export const Home: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
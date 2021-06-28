import { Logo, LogoSizes } from '@/atoms/logo';
import { AccountList } from '@/organisms/account-list/account-list';
import { AccountStatistics } from '@/organisms/account-statistics/account-statistics';
import React from 'react';

export default function Home() {
  return (
    <div className="flex h-md-screen text-center">
      <div className="m-auto w-9/12">
        <Logo size={LogoSizes.MEDIUM} />
        <h4>Account</h4>
        <AccountStatistics />
        <AccountList />
      </div>
    </div>
  );
}

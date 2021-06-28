import { Link } from '@/atoms/link';
import { Logo, LogoSizes } from '@/atoms/logo';
import { AccountInfo } from '@/organisms/account-info/account-info';
import React from 'react';

export default function AccountById() {
  return (
    <div className="flex h-md-screen text-center">
      <div className="m-auto w-9/12">
        <Link href="/">
          <Logo size={LogoSizes.SMALL} />
        </Link>
        <h4>Account Information</h4>
        <AccountInfo />
      </div>
    </div>
  );
}

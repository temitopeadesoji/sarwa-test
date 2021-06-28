export enum AccountsStatus {
  approved = 'approved',
  closed = 'closed',
  funded = 'funded',
  pending = 'pending',
}

export const AccountPendingStatus = {
  [AccountsStatus.approved]: AccountsStatus.approved,
  [AccountsStatus.closed]: AccountsStatus.closed,
};

export const AccountApprovedStatus = {
  [AccountsStatus.funded]: AccountsStatus.funded,
  [AccountsStatus.closed]: AccountsStatus.closed,
};

export const AccountFundedStatus = {
  [AccountsStatus.closed]: AccountsStatus.closed,
};

import { Users } from '@database/model/users';
import { Accounts } from '@database/model/accounts';
import { Scope } from '@database/model/scope';
import { DbModels } from './dbModels';
import { ModelCtor } from 'sequelize';

export interface DbAttributeModels {
  users: { model: ModelCtor<Users>; as: string };
  accounts: { model: ModelCtor<Accounts>; as: string };
}

export const GetDbAttribute = (
  attribute: keyof DbAttributeModels,
  scope: Scope
) => {
  const attributeModels: DbAttributeModels = {
    users: { model: Users.scope(scope), as: 'users' },
    accounts: { model: Accounts.scope(scope), as: 'accounts' },
  };

  return attributeModels[attribute];
};

export const GetDbAttributes = (combine: DbModels[], scope: Scope) => {
  let include = [];
  for (let index = 0; index < combine.length; index++) {
    include.push(GetDbAttribute(combine[index], scope));
  }
  return include;
};

import joi from '@hapi/joi';
import { getStringEnumValues } from '@helpers/constants';
import {
  AccountsStatus,
  AccountPendingStatus,
  AccountApprovedStatus,
  AccountFundedStatus,
} from '@interfaces/status';

export const stateSchema = joi.object({
  name: joi.string().required(),
  country_id: joi.string().uuid().required(),
  status: joi.string().required(),
});

export const idSchema = joi.object({
  account_id: joi.string().uuid().required(),
});

export const statusSchema = joi.object({
  status: joi.string().valid(...getStringEnumValues(AccountsStatus)),
});

export const querySchema = joi.object({
  status: joi.string().valid(...getStringEnumValues(AccountsStatus)),
  limit: joi.number(),
  page: joi.number(),
});

export const pendingStatusSchema = joi.object({
  status: joi.string().valid(...getStringEnumValues(AccountPendingStatus)),
});

export const approvedStatusSchema = joi.object({
  status: joi.string().valid(...getStringEnumValues(AccountApprovedStatus)),
});

export const fundedStatusSchema = joi.object({
  status: joi.string().valid(...getStringEnumValues(AccountFundedStatus)),
});

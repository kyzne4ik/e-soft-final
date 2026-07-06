import { LeadDto, LeadResponse } from "@repo/schemas";

export const leadMap = (l: LeadDto): LeadResponse => ({
  id: l.id,
  convertedUserId: l.convertedUserId,
  managerId: l.managerId,
  targetStreamId: l.targetStreamId,
  firstName: l.firstName,
  lastName: l.lastName,
  patronymic: l.patronymic,
  email: l.email,
  phone: l.phone,
  telegram: l.telegram,
  experience: l.experience,
  testResult: l.testResult,
  status: l.status,
  createdAt: l.createdAt,
  updatedAt: l.updatedAt,
});

export const leadsMap = (leads: LeadDto[]): LeadResponse[] =>
  leads.map(leadMap);

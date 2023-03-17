export enum UserRoles {
  ENGINEER = 'ENGINEER',
  PM = 'PM',
  LEAD = 'LEAD',
  HR = 'HR',
  SALES = 'SALES',
  ADMIN = 'ADMIN',
}

export const USER_ROLES = {
  [UserRoles.ENGINEER]: 'Engineer',
  [UserRoles.PM]: 'PM',
  [UserRoles.LEAD]: 'Lead',
  [UserRoles.HR]: 'HR',
  [UserRoles.SALES]: 'Sales',
  [UserRoles.ADMIN]: 'Admin',
};

export const USER_ROLES_FORM_FIELDS = {
  [UserRoles.ENGINEER]: 'engineer',
  [UserRoles.PM]: 'pm',
  [UserRoles.LEAD]: 'lead',
  [UserRoles.HR]: 'hr',
  [UserRoles.SALES]: 'sales',
  [UserRoles.ADMIN]: 'admin',
};

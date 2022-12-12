/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  Time: string;
  Upload: File;
};

export type ActiveInput = {
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
};

export type BookingByEmployeeType = {
  __typename: 'BookingByEmployeeType';
  appointments: Array<BookingType>;
  doctor: EmployeeShotType;
};

export type BookingFilter = {
  clinicId?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<BookingStatus>;
  statusExclude?: InputMaybe<BookingStatus>;
};

export type BookingInput = {
  clientTreatment?: InputMaybe<ClientTreatmentInput>;
  clinicId?: InputMaybe<Scalars['Int']>;
  comment?: InputMaybe<Scalars['String']>;
  date: Scalars['Date'];
  doctorId?: InputMaybe<Scalars['Int']>;
  durationId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  status?: BookingStatus;
  time: Scalars['Time'];
};

export enum BookingOrder {
  CLIENT = 'client',
  CLINIC = 'clinic',
  DATE = 'date',
  PRACTITIONER = 'practitioner',
  TIME = 'time',
}

export type BookingOrderFieldInput = {
  direction: OrderDirectionChoice;
  field: BookingOrder;
};

export enum BookingStatus {
  CANCELED = 'canceled',
  CONFIRMED = 'confirmed',
  CONSULTING = 'consulting',
  FINISHED = 'finished',
  PENDING = 'pending',
  READY = 'ready',
  REMINDER_CONFIRMED = 'reminder_confirmed',
  REMINDER_SENT = 'reminder_sent',
  WAITING = 'waiting',
}

export type BookingStatusInput = {
  id: Scalars['Int'];
  status: BookingStatus;
};

export type BookingType = {
  __typename: 'BookingType';
  clientTreatment: ClientTreatmentType;
  clinic: WarehouseViewType;
  comment?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  doctor?: Maybe<EmployeeShotType>;
  duration: DurationType;
  id: Scalars['Int'];
  status: BookingStatus;
  time: Scalars['Time'];
};

export type BookingTypePagination = {
  __typename: 'BookingTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<BookingType>;
};

export type CategoryType = {
  __typename: 'CategoryType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ClientFilter = {
  age?: InputMaybe<IntMatchingFilter>;
  gender?: InputMaybe<GenderType>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type ClientInput = {
  address?: InputMaybe<Scalars['String']>;
  allergies?: InputMaybe<Scalars['String']>;
  dateOfBirth: Scalars['Date'];
  gender?: InputMaybe<GenderType>;
  id?: InputMaybe<Scalars['Int']>;
  isNew?: Scalars['Boolean'];
  medications?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  preferredPractitioners?: InputMaybe<Array<Scalars['Int']>>;
  problems?: InputMaybe<Scalars['String']>;
  user: UserInput;
  zipcode: Scalars['String'];
};

export enum ClientOrder {
  DATE_OF_BIRTH = 'date_of_birth',
  EMAIL = 'email',
  FULL_NAME = 'full_name',
  ID = 'id',
  PHONE = 'phone',
  STATUS = 'status',
}

export type ClientOrderFieldInput = {
  direction: OrderDirectionChoice;
  field: ClientOrder;
};

export type ClientTreatmentInput = {
  clientId?: InputMaybe<Scalars['Int']>;
  confirmedNotPregnant?: InputMaybe<Scalars['Boolean']>;
  discussedBruising?: InputMaybe<Scalars['Boolean']>;
  discussedLongevity?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  totalBill?: InputMaybe<Scalars['Float']>;
  treatmentId?: InputMaybe<Scalars['Int']>;
};

export type ClientTreatmentType = {
  __typename: 'ClientTreatmentType';
  client: ClientType;
  confirmedNotPregnant?: Maybe<Scalars['Boolean']>;
  discussedBruising?: Maybe<Scalars['Boolean']>;
  discussedLongevity?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  totalBill?: Maybe<Scalars['Float']>;
  treatment: TreatmentShotType;
};

export type ClientType = {
  __typename: 'ClientType';
  address?: Maybe<Scalars['String']>;
  allergies?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  gender?: Maybe<GenderType>;
  id: Scalars['Int'];
  isNew: Scalars['Boolean'];
  medications?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
  preferredPractitioners: Array<EmployeeShotType>;
  problems?: Maybe<Scalars['String']>;
  user: UserType;
  zipcode?: Maybe<Scalars['String']>;
};

export type ClientTypePagination = {
  __typename: 'ClientTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ClientType>;
};

export type ColorType = {
  __typename: 'ColorType';
  hex: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ConsumablesInput = {
  defaultQty?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['Int']>;
  qty?: InputMaybe<Scalars['Int']>;
  requireInput?: InputMaybe<Scalars['Boolean']>;
  variations: Array<Scalars['Int']>;
};

export type ConsumablesType = {
  __typename: 'ConsumablesType';
  defaultQty?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  product?: Maybe<ProductDetailType>;
  qty?: Maybe<Scalars['Int']>;
  requireInput?: Maybe<Scalars['Boolean']>;
  variations: Array<VariationType>;
};

export enum CorrespondenceStatus {
  SENT = 'sent',
  WAITING = 'waiting',
}

export enum CorrespondenceType {
  EMAIL = 'email',
  SMS = 'sms',
}

export type DateMatchingFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
};

export enum DayChoice {
  FRIDAY = 'friday',
  MONDAY = 'monday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
  THURSDAY = 'thursday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
}

export type DurationType = {
  __typename: 'DurationType';
  id: Scalars['Int'];
  name: Scalars['String'];
  value?: Maybe<Scalars['Int']>;
};

export type EmployeeFilter = {
  groupId?: InputMaybe<Array<Scalars['Int']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type EmployeeGroupType = {
  __typename: 'EmployeeGroupType';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type EmployeeInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  bankAccountName?: InputMaybe<Scalars['String']>;
  billingAddress?: InputMaybe<Scalars['String']>;
  bsb?: InputMaybe<Scalars['String']>;
  groupId: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  notificationSettings?: InputMaybe<NotificationSettingsInput>;
  permissions?: InputMaybe<PermissionsInput>;
  user: UserInput;
};

export enum EmployeeOrder {
  EMAIL = 'email',
  FULL_NAME = 'full_name',
  GROUP = 'group',
  PHONE = 'phone',
  STATUS = 'status',
}

export type EmployeeOrderFieldInput = {
  direction: OrderDirectionChoice;
  field: EmployeeOrder;
};

export type EmployeeShotType = {
  __typename: 'EmployeeShotType';
  accountNumber?: Maybe<Scalars['String']>;
  bankAccountName?: Maybe<Scalars['String']>;
  billingAddress?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  group: EmployeeGroupType;
  id: Scalars['Int'];
  user: UserType;
};

export type EmployeeType = {
  __typename: 'EmployeeType';
  accountNumber?: Maybe<Scalars['String']>;
  bankAccountName?: Maybe<Scalars['String']>;
  billingAddress?: Maybe<Scalars['String']>;
  bsb?: Maybe<Scalars['String']>;
  group: EmployeeGroupType;
  id: Scalars['Int'];
  notificationSettings: NotificationSettingsType;
  permissions: PermissionsType;
  user: UserType;
};

export type EmployeeTypePagination = {
  __typename: 'EmployeeTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<EmployeeType>;
};

export type ForgotPassword = {
  __typename: 'ForgotPassword';
  email: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type FormFilter = {
  templateId?: InputMaybe<Scalars['Int']>;
  workflowId?: InputMaybe<Scalars['Int']>;
};

export type FormInput = {
  id?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  items?: InputMaybe<Array<FormItemInput>>;
  name: Scalars['String'];
};

export type FormItemDetailType = {
  __typename: 'FormItemDetailType';
  choices?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  order?: Maybe<Scalars['Int']>;
  type: FormItemType;
  value: Scalars['String'];
};

export type FormItemInput = {
  choices?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['Int']>;
  type: FormItemType;
  value: Scalars['String'];
};

export enum FormItemType {
  CREDIT_CARD = 'credit_card',
  DERMAL = 'dermal',
  MULTIPLE_CHOICE = 'multiple_choice',
  PARAGRAPH = 'paragraph',
  SIGNATURE = 'signature',
  SINGLE_CHOICE = 'single_choice',
  TITLE = 'title',
}

export type FormType = {
  __typename: 'FormType';
  id: Scalars['Int'];
  isActive?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<FormItemDetailType>>;
  name: Scalars['String'];
  template?: Maybe<Scalars['String']>;
};

export type FormTypePagination = {
  __typename: 'FormTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<FormType>;
};

export enum GenderType {
  FEMALE = 'female',
  MALE = 'male',
}

export type ImageType = {
  __typename: 'ImageType';
  fileName: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
};

export type IntMatchingFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
};

export type Login = {
  __typename: 'Login';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: UserType;
};

export type Login2Fa = {
  __typename: 'Login2FA';
  message: Scalars['String'];
  setup2FA?: Maybe<Setup2Fa>;
};

export type Login2FaInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename: 'Message';
  message: Scalars['String'];
};

export type MessageFilter = {
  clientId?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<DateMatchingFilter>;
};

export type MessageInput = {
  clientId: Scalars['Int'];
  text: Scalars['String'];
};

export type MessageStatusInput = {
  id: Scalars['Int'];
  status: CorrespondenceStatus;
};

export type MessageType = {
  __typename: 'MessageType';
  client: ClientType;
  createdAt: Scalars['DateTime'];
  employee?: Maybe<EmployeeShotType>;
  id: Scalars['Int'];
  status: CorrespondenceStatus;
  text: Scalars['String'];
  to: Scalars['String'];
  type: CorrespondenceType;
};

export type MessageTypePagination = {
  __typename: 'MessageTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<MessageType>;
};

export type Mutation = {
  __typename: 'Mutation';
  bookingChangeStatus: BookingType;
  bookingCreateUpdate: BookingType;
  clientChangeStatus: ClientType;
  clientCreateUpdate: ClientType;
  employeeChangeStatus: EmployeeType;
  employeeCreateUpdate: EmployeeType;
  forgotPassword: ForgotPassword;
  formCreateUpdate: FormType;
  login: Login2Fa;
  login2fa: Login;
  messageChangeStatus: MessageType;
  messageSend: MessageType;
  productCreateUpdate: ProductDetailType;
  refreshToken: Login;
  resetPassword: Message;
  sendBackupCodes: Register;
  supplierCreateUpdate: SupplierType;
  treatmentCreateUpdate: TreatmentDetailType;
  warehouseChangeStatus: WarehouseViewType;
  warehouseCreateUpdate: WarehouseViewType;
  workflowCreateUpdate: WorkflowType;
};

export type MutationBookingChangeStatusArgs = {
  data: BookingStatusInput;
};

export type MutationBookingCreateUpdateArgs = {
  data: BookingInput;
};

export type MutationClientChangeStatusArgs = {
  data: ActiveInput;
};

export type MutationClientCreateUpdateArgs = {
  data: ClientInput;
};

export type MutationEmployeeChangeStatusArgs = {
  data: ActiveInput;
};

export type MutationEmployeeCreateUpdateArgs = {
  data: EmployeeInput;
};

export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};

export type MutationFormCreateUpdateArgs = {
  data: FormInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationLogin2faArgs = {
  data: Login2FaInput;
};

export type MutationMessageChangeStatusArgs = {
  data: MessageStatusInput;
};

export type MutationMessageSendArgs = {
  data: MessageInput;
};

export type MutationProductCreateUpdateArgs = {
  data: ProductInput;
};

export type MutationRefreshTokenArgs = {
  data: RefreshTokenInput;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSendBackupCodesArgs = {
  data: SendBackupCodesInput;
};

export type MutationSupplierCreateUpdateArgs = {
  data: SupplierInput;
};

export type MutationTreatmentCreateUpdateArgs = {
  data: TreatmentInput;
};

export type MutationWarehouseChangeStatusArgs = {
  data: ActiveInput;
};

export type MutationWarehouseCreateUpdateArgs = {
  data: WarehouseInput;
};

export type MutationWorkflowCreateUpdateArgs = {
  data: WorkflowInput;
};

export type NotificationSettingsInput = {
  appointmentCancellations?: InputMaybe<Scalars['Boolean']>;
  newAppointments?: Scalars['Boolean'];
  newBooking?: Scalars['Boolean'];
  newClient?: Scalars['Boolean'];
  newInventory?: Scalars['Boolean'];
  newInvoices?: Scalars['Boolean'];
  newOrdersArrived?: Scalars['Boolean'];
  newOrdersCreated?: Scalars['Boolean'];
  outStock?: Scalars['Boolean'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type NotificationSettingsType = {
  __typename: 'NotificationSettingsType';
  appointmentCancellations?: Maybe<Scalars['Boolean']>;
  newAppointments: Scalars['Boolean'];
  newBooking: Scalars['Boolean'];
  newClient: Scalars['Boolean'];
  newInventory: Scalars['Boolean'];
  newInvoices: Scalars['Boolean'];
  newOrdersArrived: Scalars['Boolean'];
  newOrdersCreated: Scalars['Boolean'];
  outStock: Scalars['Boolean'];
  userId?: Maybe<Scalars['Int']>;
};

export enum OrderDirectionChoice {
  ASC = 'asc',
  DESC = 'desc',
}

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PermissionsInput = {
  addAppointments?: Scalars['Boolean'];
  addClients?: Scalars['Boolean'];
  addClinics?: Scalars['Boolean'];
  addForms?: Scalars['Boolean'];
  addProducts?: Scalars['Boolean'];
  addSuppliers?: Scalars['Boolean'];
  addTreatments?: Scalars['Boolean'];
  addUsers?: Scalars['Boolean'];
  addWorkflows?: Scalars['Boolean'];
  cancelAppointments?: Scalars['Boolean'];
  confirmBooking?: Scalars['Boolean'];
  createOrders?: Scalars['Boolean'];
  editAppointments?: Scalars['Boolean'];
  editClients?: Scalars['Boolean'];
  editRosters?: Scalars['Boolean'];
  performInventory?: Scalars['Boolean'];
  userId?: InputMaybe<Scalars['Int']>;
  viewAnalytics?: Scalars['Boolean'];
  viewAppointmentsOtherPractitioners?: Scalars['Boolean'];
  viewClients?: Scalars['Boolean'];
  viewClientsCorrespondence?: InputMaybe<Scalars['Boolean']>;
  viewClientsDocuments?: Scalars['Boolean'];
  viewClientsInvoices?: Scalars['Boolean'];
  viewClientsTreatment?: Scalars['Boolean'];
  viewClinics?: Scalars['Boolean'];
  viewForms?: Scalars['Boolean'];
  viewInventory?: Scalars['Boolean'];
  viewItems?: Scalars['Boolean'];
  viewMissing?: Scalars['Boolean'];
  viewOrders?: InputMaybe<Scalars['Boolean']>;
  viewProducts?: Scalars['Boolean'];
  viewRosters?: Scalars['Boolean'];
  viewSuppliers?: Scalars['Boolean'];
  viewTreatments?: Scalars['Boolean'];
  viewUsers?: Scalars['Boolean'];
  viewWorkflows?: Scalars['Boolean'];
};

export type PermissionsType = {
  __typename: 'PermissionsType';
  addAppointments: Scalars['Boolean'];
  addClients: Scalars['Boolean'];
  addClinics: Scalars['Boolean'];
  addForms: Scalars['Boolean'];
  addProducts: Scalars['Boolean'];
  addSuppliers: Scalars['Boolean'];
  addTreatments: Scalars['Boolean'];
  addUsers: Scalars['Boolean'];
  addWorkflows: Scalars['Boolean'];
  cancelAppointments: Scalars['Boolean'];
  confirmBooking: Scalars['Boolean'];
  createOrders: Scalars['Boolean'];
  editAppointments: Scalars['Boolean'];
  editClients: Scalars['Boolean'];
  editRosters: Scalars['Boolean'];
  performInventory: Scalars['Boolean'];
  userId?: Maybe<Scalars['Int']>;
  viewAnalytics: Scalars['Boolean'];
  viewAppointmentsOtherPractitioners: Scalars['Boolean'];
  viewClients: Scalars['Boolean'];
  viewClientsCorrespondence?: Maybe<Scalars['Boolean']>;
  viewClientsDocuments: Scalars['Boolean'];
  viewClientsInvoices: Scalars['Boolean'];
  viewClientsTreatment: Scalars['Boolean'];
  viewClinics: Scalars['Boolean'];
  viewForms: Scalars['Boolean'];
  viewInventory: Scalars['Boolean'];
  viewItems: Scalars['Boolean'];
  viewMissing: Scalars['Boolean'];
  viewOrders?: Maybe<Scalars['Boolean']>;
  viewProducts: Scalars['Boolean'];
  viewRosters: Scalars['Boolean'];
  viewSuppliers: Scalars['Boolean'];
  viewTreatments: Scalars['Boolean'];
  viewUsers: Scalars['Boolean'];
  viewWorkflows: Scalars['Boolean'];
};

export enum PriceType {
  FEMALE = 'female',
  MALE = 'male',
  NEUTRAL = 'neutral',
}

export type ProductDetailType = {
  __typename: 'ProductDetailType';
  availableClinics: Array<WarehouseViewType>;
  category?: Maybe<CategoryType>;
  code?: Maybe<Scalars['String']>;
  costPrice: Scalars['Float'];
  id: Scalars['Int'];
  image?: Maybe<ImageType>;
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  orderedPacks?: Maybe<Scalars['Boolean']>;
  orderingInstructions?: Maybe<Scalars['String']>;
  retailPrice: Scalars['Float'];
  scaledPricing: Array<ScaledPricingType>;
  stockTrackedBy: ProductTrackedType;
  supplier?: Maybe<SupplierType>;
  supplierCode?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['Float']>;
  unitMeasure?: Maybe<UnitMeasureType>;
};

export type ProductFilter = {
  categoryId?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  supplierId?: InputMaybe<Scalars['Int']>;
};

export type ProductInput = {
  availableClinics?: InputMaybe<Array<Scalars['Int']>>;
  categoryId?: InputMaybe<Scalars['Int']>;
  code?: InputMaybe<Scalars['String']>;
  costPrice: Scalars['Float'];
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['Upload']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  orderedPacks?: InputMaybe<Scalars['Boolean']>;
  orderingInstructions?: InputMaybe<Scalars['String']>;
  retailPrice: Scalars['Float'];
  scaledPricing?: InputMaybe<Array<ScaledPricingInput>>;
  stockTrackedBy: ProductTrackedType;
  supplierCode?: InputMaybe<Scalars['String']>;
  supplierId: Scalars['Int'];
  tax?: InputMaybe<Scalars['Float']>;
  unitMeasureId?: InputMaybe<Scalars['Int']>;
};

export enum ProductOrder {
  CODE = 'code',
  COST_PRICE = 'cost_price',
  IS_ACTIVE = 'is_active',
  NAME = 'name',
  RETAIL_PRICE = 'retail_price',
  SUPPLIER_NAME = 'supplier_name',
}

export type ProductOrderFieldInput = {
  direction: OrderDirectionChoice;
  field: ProductOrder;
};

export type ProductShotType = {
  __typename: 'ProductShotType';
  code?: Maybe<Scalars['String']>;
  costPrice: Scalars['Float'];
  id: Scalars['Int'];
  image?: Maybe<ImageType>;
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  orderedPacks?: Maybe<Scalars['Boolean']>;
  orderingInstructions?: Maybe<Scalars['String']>;
  retailPrice: Scalars['Float'];
  stockTrackedBy: ProductTrackedType;
  supplierCode?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['Float']>;
};

export enum ProductTrackedType {
  INDIVIDUAL = 'individual',
  SHARED = 'shared',
}

export type ProductType = {
  __typename: 'ProductType';
  category?: Maybe<CategoryType>;
  code?: Maybe<Scalars['String']>;
  costPrice: Scalars['Float'];
  id: Scalars['Int'];
  image?: Maybe<ImageType>;
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  orderedPacks?: Maybe<Scalars['Boolean']>;
  orderingInstructions?: Maybe<Scalars['String']>;
  retailPrice: Scalars['Float'];
  stockTrackedBy: ProductTrackedType;
  supplier: SupplierType;
  supplierCode?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Int']>;
};

export type ProductTypePagination = {
  __typename: 'ProductTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ProductType>;
};

export type Query = {
  __typename: 'Query';
  appointmentByEmployee: Array<BookingByEmployeeType>;
  appointmentList: BookingTypePagination;
  categoryList: Array<CategoryType>;
  clientDetails: ClientType;
  clientList: ClientTypePagination;
  colorList: Array<ColorType>;
  durationList: Array<DurationType>;
  employeeDetails: EmployeeType;
  employeeGroupsList: Array<EmployeeGroupType>;
  employeeList: EmployeeTypePagination;
  formList: FormTypePagination;
  me: UserType;
  messageList: MessageTypePagination;
  productDetails: ProductDetailType;
  productList: ProductTypePagination;
  stockItemList: StockItemTypePagination;
  supplierList: SupplierTypePagination;
  treatmentDetails: TreatmentDetailType;
  treatmentList: TreatmentTypePagination;
  unitMeasureList: Array<DurationType>;
  warehouseDetails: WarehouseViewType;
  warehouseList: WarehouseViewTypePagination;
  workflowList: WorkflowTypePagination;
};

export type QueryAppointmentByEmployeeArgs = {
  filters?: InputMaybe<BookingFilter>;
};

export type QueryAppointmentListArgs = {
  filters?: InputMaybe<BookingFilter>;
  ordering?: InputMaybe<Array<BookingOrderFieldInput>>;
  pagination: PaginationInput;
};

export type QueryClientDetailsArgs = {
  clientId: Scalars['Int'];
};

export type QueryClientListArgs = {
  filters?: InputMaybe<ClientFilter>;
  ordering?: InputMaybe<Array<ClientOrderFieldInput>>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryEmployeeDetailsArgs = {
  employeeId: Scalars['Int'];
};

export type QueryEmployeeListArgs = {
  filters?: InputMaybe<EmployeeFilter>;
  ordering?: InputMaybe<Array<EmployeeOrderFieldInput>>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryFormListArgs = {
  filters?: InputMaybe<FormFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryMessageListArgs = {
  filters?: InputMaybe<MessageFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryProductDetailsArgs = {
  productId: Scalars['Int'];
};

export type QueryProductListArgs = {
  filters?: InputMaybe<ProductFilter>;
  ordering?: InputMaybe<Array<ProductOrderFieldInput>>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryStockItemListArgs = {
  filters?: InputMaybe<ProductFilter>;
  ordering?: InputMaybe<Array<ProductOrderFieldInput>>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QuerySupplierListArgs = {
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryTreatmentDetailsArgs = {
  treatmentId: Scalars['Int'];
};

export type QueryTreatmentListArgs = {
  filters?: InputMaybe<TreatmentFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryWarehouseDetailsArgs = {
  warehouseId: Scalars['Int'];
};

export type QueryWarehouseListArgs = {
  filters?: InputMaybe<WarehouseFilter>;
  ordering?: InputMaybe<Array<WarehouseOrderFieldInput>>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryWorkflowListArgs = {
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type Register = {
  __typename: 'Register';
  message: Scalars['String'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ScaledPricingInput = {
  fromValue: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  price: Scalars['Float'];
  toValue: Scalars['Int'];
};

export type ScaledPricingType = {
  __typename: 'ScaledPricingType';
  fromValue: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  price: Scalars['Float'];
  toValue: Scalars['Int'];
};

export type SendBackupCodesInput = {
  codes: Array<Scalars['String']>;
  email: Scalars['String'];
};

export type Setup2Fa = {
  __typename: 'Setup2FA';
  backupCodes: Array<Scalars['String']>;
  qrCode: Scalars['String'];
};

export type StockItemType = {
  __typename: 'StockItemType';
  category?: Maybe<CategoryType>;
  code?: Maybe<Scalars['String']>;
  costPrice: Scalars['Float'];
  id: Scalars['Int'];
  image?: Maybe<ImageType>;
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  orderedPacks?: Maybe<Scalars['Boolean']>;
  orderingInstructions?: Maybe<Scalars['String']>;
  retailPrice: Scalars['Float'];
  stockTrackedBy: ProductTrackedType;
  stocks?: Maybe<Array<StockRemnants>>;
  supplier: SupplierType;
  supplierCode?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Int']>;
};

export type StockItemTypePagination = {
  __typename: 'StockItemTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<StockItemType>;
};

export type StockRemnants = {
  __typename: 'StockRemnants';
  qty: Scalars['Int'];
  warehouse: WarehouseViewType;
};

export type SupplierInput = {
  email: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type SupplierType = {
  __typename: 'SupplierType';
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  products: Array<ProductShotType>;
  productsCount: Scalars['Int'];
};

export type SupplierTypePagination = {
  __typename: 'SupplierTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<SupplierType>;
};

export enum TitleChoice {
  DR = 'dr',
  MISS = 'miss',
  MR = 'mr',
  MRS = 'mrs',
  MS = 'ms',
  PROFESSOR = 'professor',
  SC = 'sc',
}

export type TreatmentDetailType = {
  __typename: 'TreatmentDetailType';
  aftercare?: Maybe<Scalars['Boolean']>;
  aftercareContent?: Maybe<Scalars['String']>;
  aftercareReminder?: Maybe<Scalars['Boolean']>;
  category?: Maybe<CategoryType>;
  clinicalGuidelines?: Maybe<Scalars['String']>;
  clinicalScript?: Maybe<Scalars['Boolean']>;
  consentInterval?: Maybe<Scalars['Int']>;
  consumables?: Maybe<Array<ConsumablesType>>;
  defaultVariation?: Maybe<VariationType>;
  defaultVariationName: Scalars['String'];
  fullDescription?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image?: Maybe<ImageType>;
  isActive?: Maybe<Scalars['Boolean']>;
  moreInformation?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  photoInterval?: Maybe<Scalars['Int']>;
  preTreatmentContent?: Maybe<Scalars['String']>;
  retreatmentReminderTemplate?: Maybe<Scalars['String']>;
  sendingProductsAftercare?: Maybe<Scalars['Boolean']>;
  shortDescription?: Maybe<Scalars['String']>;
  unit?: Maybe<UnitMeasureType>;
  variations: Array<VariationType>;
};

export type TreatmentFilter = {
  categoryId?: InputMaybe<Scalars['Int']>;
};

export type TreatmentInput = {
  aftercare?: InputMaybe<Scalars['Boolean']>;
  aftercareContent?: InputMaybe<Scalars['String']>;
  aftercareReminder?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  clinicalGuidelines?: InputMaybe<Scalars['String']>;
  clinicalScript?: InputMaybe<Scalars['Boolean']>;
  consentInterval?: InputMaybe<Scalars['Int']>;
  consumables?: InputMaybe<Array<ConsumablesInput>>;
  defaultVariationId?: InputMaybe<Scalars['Int']>;
  defaultVariationName: Scalars['String'];
  fullDescription?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['Upload']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  moreInformation?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  photoInterval?: InputMaybe<Scalars['Int']>;
  preTreatmentContent?: InputMaybe<Scalars['String']>;
  retreatmentReminderTemplate?: InputMaybe<Scalars['String']>;
  sendingProductsAftercare?: InputMaybe<Scalars['Boolean']>;
  shortDescription?: InputMaybe<Scalars['String']>;
  unitId?: InputMaybe<Scalars['Int']>;
  variations?: InputMaybe<Array<VariationInput>>;
};

export type TreatmentShotType = {
  __typename: 'TreatmentShotType';
  category: CategoryType;
  id: Scalars['Int'];
  name: Scalars['String'];
  variationsCount: Scalars['Int'];
};

export type TreatmentType = {
  __typename: 'TreatmentType';
  aftercare?: Maybe<Scalars['Boolean']>;
  aftercareContent?: Maybe<Scalars['String']>;
  aftercareReminder?: Maybe<Scalars['Boolean']>;
  category: CategoryType;
  clinicalGuidelines?: Maybe<Scalars['String']>;
  clinicalScript?: Maybe<Scalars['Boolean']>;
  consentInterval?: Maybe<Scalars['Int']>;
  defaultVariationName: Scalars['String'];
  fullDescription?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image?: Maybe<ImageType>;
  isActive?: Maybe<Scalars['Boolean']>;
  moreInformation?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  photoInterval?: Maybe<Scalars['Int']>;
  preTreatmentContent?: Maybe<Scalars['String']>;
  retreatmentReminderTemplate?: Maybe<Scalars['String']>;
  sendingProductsAftercare?: Maybe<Scalars['Boolean']>;
  shortDescription?: Maybe<Scalars['String']>;
  variationsCount?: Maybe<Scalars['Int']>;
};

export type TreatmentTypePagination = {
  __typename: 'TreatmentTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TreatmentType>;
};

export type UnitMeasureType = {
  __typename: 'UnitMeasureType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  photo?: InputMaybe<Scalars['Upload']>;
  title?: InputMaybe<TitleChoice>;
};

export type UserType = {
  __typename: 'UserType';
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  notificationSettings?: Maybe<NotificationSettingsType>;
  permissions?: Maybe<PermissionsType>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<ImageType>;
  title?: Maybe<TitleChoice>;
};

export type VariationInput = {
  colourId?: InputMaybe<Scalars['Int']>;
  defaultDurationId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  prices?: InputMaybe<Array<VariationPriceInput>>;
};

export type VariationPriceInput = {
  cost: Scalars['Float'];
  price: Scalars['Float'];
  tax: Scalars['Float'];
  type: PriceType;
};

export type VariationPriceType = {
  __typename: 'VariationPriceType';
  cost: Scalars['Float'];
  price: Scalars['Float'];
  tax: Scalars['Float'];
  type: PriceType;
};

export type VariationType = {
  __typename: 'VariationType';
  colour?: Maybe<ColorType>;
  defaultDuration: DurationType;
  id: Scalars['Int'];
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  prices?: Maybe<Array<VariationPriceType>>;
};

export type WarehouseFilter = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<WarehouseType>;
};

export type WarehouseInput = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  isActive?: Scalars['Boolean'];
  name: Scalars['String'];
  type: WarehouseType;
  workHours?: InputMaybe<Array<WorkHourInput>>;
};

export enum WarehouseOrder {
  ADDRESS = 'address',
  IS_ACTIVE = 'is_active',
  NAME = 'name',
  TYPE = 'type',
  WORK_HOURS = 'work_hours',
}

export type WarehouseOrderFieldInput = {
  direction: OrderDirectionChoice;
  field: WarehouseOrder;
};

export enum WarehouseType {
  CLINIC = 'clinic',
  WAREHOUSE = 'warehouse',
}

export type WarehouseViewType = {
  __typename: 'WarehouseViewType';
  address?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  type: WarehouseType;
  workHours?: Maybe<Array<WorkHourType>>;
};

export type WarehouseViewTypePagination = {
  __typename: 'WarehouseViewTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<WarehouseViewType>;
};

export type WorkHourInput = {
  day: DayChoice;
  fromTime?: InputMaybe<Scalars['Time']>;
  toTime?: InputMaybe<Scalars['Time']>;
  work?: InputMaybe<Scalars['Boolean']>;
};

export type WorkHourType = {
  __typename: 'WorkHourType';
  day: DayChoice;
  fromTime?: Maybe<Scalars['Time']>;
  toTime?: Maybe<Scalars['Time']>;
  work: Scalars['Boolean'];
};

export type WorkflowFormInput = {
  consent?: InputMaybe<Scalars['Boolean']>;
  default?: InputMaybe<Scalars['Boolean']>;
  formId: Scalars['Int'];
  order?: InputMaybe<Scalars['Int']>;
};

export type WorkflowFormType = {
  __typename: 'WorkflowFormType';
  consent?: Maybe<Scalars['Boolean']>;
  default?: Maybe<Scalars['Boolean']>;
  form?: Maybe<FormType>;
  order?: Maybe<Scalars['Int']>;
};

export type WorkflowInput = {
  attachedForms?: InputMaybe<Array<WorkflowFormInput>>;
  attachedTreatments?: InputMaybe<Array<Scalars['Int']>>;
  completeById?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type WorkflowType = {
  __typename: 'WorkflowType';
  attachedForms: Array<WorkflowFormType>;
  attachedTreatments: Array<TreatmentShotType>;
  completeBy: EmployeeShotType;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type WorkflowTypePagination = {
  __typename: 'WorkflowTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<WorkflowType>;
};

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;

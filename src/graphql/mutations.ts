import { gql } from "@apollo/client";
export const CREATE_PROPERTY = gql`
  mutation createProperty($property: PropertyInput!) {
    createProperty(property: $property) {
      _id
      name
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($user: UserInput!) {
    registerUser(user: $user) {
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($phone: String!, $password: String!) {
    loginUser(phone: $phone, password: $password)
  }
`;
export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($phoneNumber: String!) {
    forgotPassword(phoneNumber: $phoneNumber)
  }
`;
export const CHECK_OTP = gql`
  mutation checkOTPFunction($otpInput: OTPInput!) {
    checkOTPFunction(input: $otpInput)
  }
`;

export const REQUEST = gql`
  mutation createRequest(
    $propertyId: ID!
    $userId: ID!
    $toUserId: ID!
    $type: String!
    $status: String!
    $title: String!
    $desc: String!
  ) {
    createRequest(
      propertyId: $propertyId
      userId: $userId
      toUserId: $toUserId
      type: $type
      status: $status
      title: $title
      desc: $desc
    ) {
      _id
    }
  }
`;
export const TIME_ENTRY = gql`
  mutation CreateTimeEntry($userId: ID!, $propertyId: ID!, $workEntryId: ID!) {
    createTimeEntry(
      userId: $userId
      propertyId: $propertyId
      workEntryId: $workEntryId
    ) {
      _id
      userId {
        _id
        username
        phone
        email
        discipline
        status
        firstname
        lastname
        profilePic
        gender
        createdAt
        updatedAt
      }
      propertyId {
        _id
        name
        desc
        ownerId {
          _id
        }
        cameraHub
        timeCheckArea
        baseLong
        baseLat
        residentCount
        monthlyBill
        createdAt
        updatedAt
        monthlyBillDate
      }
      checkInTime
      checkOutTime
      description
      status
    }
  }
`;
export const WORK_ENTRY = gql`
  mutation CreateWorkEntry(
    $userId: ID!
    $propertyId: ID!
    $checkInTime: DateTimeISO!
    # $status: String!
    $checkOutTime: DateTimeISO!
    $salary: Float!
  ) {
    createWorkEntry(
      userId: $userId
      propertyId: $propertyId
      # status: $status
      salary: $salary
      checkInTime: $checkInTime
      checkOutTime: $checkOutTime
    ) {
      _id
      userId {
        _id
        username
        phone
        email
        discipline
        status
        firstname
        lastname
        profilePic
        gender
        createdAt
        updatedAt
      }
      propertyId {
        _id
        name
        desc
        ownerId {
          _id
        }
        cameraHub
        timeCheckArea
        baseLong
        baseLat
        residentCount
        monthlyBill
        createdAt
        updatedAt
        monthlyBillDate
      }
      checkInTime
      checkOutTime
      description
      status
    }
  }
`;
export const UPDATE_ME = gql`
  mutation updateMe($fcmToken: String!) {
    updateMe(fcmToken: $fcmToken) {
      _id
      username
      phone
      email
      birthdate
      discipline
      status
      firstname
      lastname
      profilePic
      role
      gender
      createdAt
      updatedAt
    }
  }
`;
export const CREATE_THING = gql`
  mutation createThing($thing: ThingInput!) {
    createThing(thing: $thing) {
      _id
    }
  }
`;

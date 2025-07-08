import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      _id
      username
      email
      role
      phone
      firstname
      lastname
    }
  }
`;
export const LIST_USERS = gql`
  query ListUsers($role: String!) {
    listUsers(role: $role) {
      _id
      firstname
      lastname
      phone
      profilePic
      birthdate
      status
      createdAt
      updatedAt
      gender
    }
  }
`;
export const GET_USER_DATA = gql`
  query {
    me {
      _id
      username
      email
      phone
      role
    }
  }
`;
export const GET_PROPERTIES = gql`
  query {
    getProperties {
      _id
      name
      monthlyBill
      monthlyBillDate
      profilePic
      residentCount
      ownerId {
        _id
        username
        firstname
        lastname
        phone
        email
      }
      desc
      createdAt
      map {
        lat
        long
      }
    }
  }
`;
export const GET_PROPERTY_ID = gql`
  query getProperty($_id: ID!) {
    getProperty(_id: $_id) {
      _id
      name
      desc
      residentCount
      ownerId {
        _id
      }
      cameraHub
      timeCheckArea
      baseLat
      baseLong
      map {
        lat
        long
      }
      createdAt
      updatedAt
    }
  }
`;
export const GET_VIOLATION = gql`
  query {
    getViolations {
      _id
      type
      image
      title
      description
      status
      createdAt
      updatedAt
      propertyId {
        _id
        name
        ownerId {
          _id
        }
      }
      userId {
        _id
        firstname
        lastname
        profilePic
      }
      location {
        lat
        long
      }
    }
  }
`;
export const GET_TIME_ENTRIES = gql`
  query {
    getTimeEntries {
      _id
      userId {
        _id
        username
        firstname
        lastname
        phone
        gender
      }
      propertyId {
        _id
        name
        desc
        cameraHub
        timeCheckArea
        baseLong
        baseLat
        createdAt
        updatedAt
      }
      workEntryId {
        _id
        userId {
          _id
        }
        propertyId
        checkInTime
        checkOutTime
        description
        status
      }
      checkInTime
      checkOutTime
      description
      status
    }
  }
`;
export const GET_USER = gql`
  query getUser($_id: ID!) {
    getUser(_id: $_id) {
      _id
      username
      phone
      email
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
export const GET_REQUESTS = gql`
  query {
    getRequests {
      _id
      userId {
        _id
        phone
        firstname
        lastname
        phone
      }
      propertyId {
        _id
        name
      }
      toUserId {
        _id
        lastname
        firstname
        phone
        profilePic
      }
      type
      status
      title
      desc
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_FEEDBACKS = gql`
  query GetAllFeedbacks($search: Json) {
    getFeedbacks(search: $search) {
      _id
      title
      desc
      type
      createdAt
      updatedAt
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
        role
        gender
        createdAt
        updatedAt
      }
      toUserId {
        _id
        username
        phone
        email
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
        map {
          lat
          long
        }
        createdAt
        updatedAt
        monthlyBillDate
      }
    }
  }
`;
export const GET_TIME_ENTRIES_SEARCH_JSON = gql`
  query GetTimeEntries($search: Json) {
    getTimeEntries(search: $search) {
      _id
      checkInTime
      checkOutTime
      description
      status
      userId {
        _id
        username
        firstname
        lastname
        birthdate
        phone
        gender
        profilePic
      }
      workEntryId {
        _id
        checkInTime
        checkOutTime
        description
        allowance
        salary
        status
      }
      propertyId {
        _id
        name
        desc
      }
    }
  }
`;

export const GET_VIOLATION_SEARCH_JSON = gql`
  query getViolations($search: Json) {
    getViolations(search: $search) {
      _id
      title
      type
      image
      description
      status
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
        map {
          lat
          long
        }
        createdAt
        updatedAt
        monthlyBillDate
      }
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
        role
        gender
        createdAt
        updatedAt
      }
      location {
        long
        lat
      }
      createdAt
      updatedAt
    }
  }
`;
export const GET_THINGS = gql`
  query getThings {
    getThings(search: {}) {
      _id
      name
      whose
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
        profilePic
        residentCount
        monthlyBill
        map {
          lat
          long
        }
        createdAt
        updatedAt
        monthlyBillDate
      }
      history {
        desc
        thingPic
        status
        timeEntryId {
          _id
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_MY_NOTIFICATIONS = gql`
  query getMyNotif {
    getMyNotifications {
      _id
      userId {
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
      title
      body

      topics
      type
      items {
        _id
        kind
      }
      createdAt
      read
    }
  }
`;
export const GET_SOS = gql`
  query sosgets {
    getsSos(search: {}) {
      _id
      alertId {
        _id
        alarmStr
      }
      sosLvl
      propertyId {
        _id
        name
      }
      damageLvl
      status
      violationId {
        _id
      }
      createdAt
      updatedAt
    }
  }
`;
export const GET_ALARMS = gql`
  query getAlarms($search: Json, $skip: Int, $limit: Int) {
    getAlarms(search: $search, skip: $skip, limit: $limit) {
      _id
      devId
      ch
      chId
      chName
      msgType
      msgSource
      aiType
      objNum
      msgDisc
      alarmSubtype
      alarmStr
      reverseAlarm
      trackID
      score
      time
      img_str_s
      propertyId {
        _id
        name
      }
    }
  }
`;

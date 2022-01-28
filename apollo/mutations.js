import gql from "graphql-tag";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccoutn($password: String!, $email: String!, $nick: String) {
    create_users_item(
      data: {
        role: { id: "8ba561b2-fdbd-468a-bdff-4a2e63f39080" }
        email: $email
        password: $password
        nickname: $nick
      }
    ) {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation AuthQuery($email: String!, $password: String!) {
    auth_login(email: $email, password: $password, mode: cookie) {
      access_token
      expires
      refresh_token
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String) {
    auth_refresh(refresh_token: $token) {
      access_token
      expires
      refresh_token
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($id: ID!) {
    delete_files_item(id: $id) {
      id
    }
  }
`;

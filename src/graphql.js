import { gql } from '@apollo/client';

export const SET_PROFILE = gql`
  mutation setProfile(
    $name: String
    $bio: String
    $location: String
    $skills: [String!]!
    $website: String
    $github: String
    $linkedin: String
    $dribble: String
  ) {
    setProfile(
      input: {
        name: $name
        bio: $bio
        location: $location
        skills: $skills
        links: {
          website: $website
          github: $github
          linkedin: $linkedin
          dribble: $dribble
        }
      }
    ) {
      profile {
        skills
        activeProject {
          title
          owner {
            id
          }
        }
      }
    }
  }
`;

export const DASHBOARD_QUERY = gql`
  query getMe {
    getMe {
      profile {
        id
        user {
          id
          name
          avatar
        }
        bio
        location
        skills
        projects {
          title
        }
        experience {
          id
          title
          company
          location
          from
          to
        }
        education {
          id
          school
          degree
          from
          to
        }
        links {
          website
          github
          linkedin
          dribble
        }
        activeProject {
          id
          title
        }
        offers {
          position {
            id
            title
            description
            date
            skills
            project {
              id
              title
            }
          }
          read
        }
        applied {
          position {
            id
            title
            description
            date
            skills
            project {
              id
              title
            }
          }
        }
        contacts {
          contact {
            id
            name
            avatar
          }
        }
        outgoingRequests {
          user {
            id
            name
            avatar
          }
        }
        incomingRequests {
          user {
            id
            name
            avatar
          }
        }
        blocked {
          user {
            id
            name
            avatar
          }
        }
        messages {
          thread {
            id
            users {
              id
              name
              avatar
            }
            messages {
              id
              from {
                id
                name
              }
              text
              date
            }
          }
          with {
            id
            name
            avatar
          }
          read
        }
        mentions {
          post
          comment
        }
      }
    }
  }
`;

export const GET_GITHUB_REPOS = gql`
  query getGitHubRepos($username: String!) {
    getGitHubRepos(username: $username) {
      repositories {
        name
        description
        url
        primaryLanguage {
          name
        }
      }
    }
  }
`;

export const MARK_READ = gql`
  mutation markRead($path: String!) {
    markRead(path: $path)
  }
`;

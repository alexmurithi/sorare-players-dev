import { gql } from "@apollo/client";

export const ALL_PLAYERS = gql`
  query ALL_PLAYERS($slug: String!, $after: String!) {
    club(slug: $slug) {
      players(after: $after) {
        nodes {
          displayName
          slug
          age
          birthDate
          position
          country {
            slug
          }
          subscriptionsCount
          pictureUrl
          shirtNumber
          activeInjuries {
            active
          }
          activeClub {
            name
            id
            pictureSecondaryUrl
          }
          allSo5Scores(first: 50) {
            nodes {
              score
            }
          }
          status {
            lastFifteenSo5Appearances
            lastFifteenSo5AverageScore
            lastFiveSo5Appearances
            lastFiveSo5AverageScore
            playingStatus
          }
        }

        pageInfo {
          endCursor
        }
      }
    }
  }
`;

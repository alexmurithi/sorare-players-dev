import { gql } from "@apollo/client";

export const PLAYERS_INFO = gql`
  query PLAYER_INFO($slug: String!, $after: String) {
    club(slug: $slug) {
      players(first: 50, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          # start node
          node {
            id
            displayName
            slug
            age
            birthDate
            position
            country {
              code
            }
            subscriptionsCount
            pictureUrl
            shirtNumber
            activeClub {
              id
              name
              pictureSecondaryUrl
              domesticLeague {
                id
                displayName
              }
            }
            status {
              id
              lastFifteenSo5Appearances
              lastFifteenSo5AverageScore
              lastFiveSo5Appearances
              lastFiveSo5AverageScore
              playingStatus
            }
            allSo5Scores {
              nodes {
                score
              }
            }
          } #end node
        }
      }
    }
  }
`;

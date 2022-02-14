import { gql } from "@apollo/client";

export const PLAYERS_INFO = gql`
  query PLAYER_INFO($slug: String!) {
    playerInfo(slug: $slug) {
      id
      displayName
      age
      slug
      position
      birthDate
      shirtNumber
      subscriptionsCount
      pictureUrl
      country {
        code
      }
      status {
        id
        lastFifteenSo5Appearances
        lastFifteenSo5AverageScore
        lastFiveSo5Appearances
        lastFiveSo5AverageScore
        playingStatus
      }
      activeClub {
        id
        name
        pictureSecondaryUrl
        domesticLeague {
          id
          displayName
        }
      }
      allSo5Scores {
        nodes {
          score
        }
      }
    }
  }
`;

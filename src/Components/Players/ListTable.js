import React from "react";
import { Paper, Button, Avatar } from "@mui/material";
import MaterialTable from "@material-table/core";
import ArticleIcon from "@mui/icons-material/Article";
import RefreshIcon from "@mui/icons-material/Refresh";
import xlsx from "xlsx";
import { NetworkStatus } from "@apollo/client";

import { PLAYERS_INFO } from "../../GraphQL/Queries/PlayersQuery";
import { useQuery } from "@apollo/client";

//SLUG//
const SLUG = "philadelphia-union-chester-pennsylvania";

const PlayerListTable = () => {
  const { data, loading, error, networkStatus, fetchMore } = useQuery(
    PLAYERS_INFO,
    {
      variables: { slug: SLUG, after: null },
      notifyOnNetworkStatusChange: true,
    }
  );

  const onLoadMore = () => {
    //destructure end cursor
    const { endCursor } = data.club.players.pageInfo;

    fetchMore({
      variables: {
        after: endCursor,
      },

      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.club.players.edges = [
          ...prevResult.club.players.edges,
          ...fetchMoreResult.club.players.edges,
        ];
        return fetchMoreResult;
      },
    });
  };
  if (networkStatus === NetworkStatus.fetchMore) return "Refetching data...";
  if (loading) return <div>Loading data .... Please Wait!</div>;
  if (error) return `Error! ${error}`;

  const rows = data.club.players.edges.map((info) => ({
    id: info.node.id,
    displayName: info.node.displayName,
    age: info.node.age,
    position: info.node.position,
    birthDate: info.node.birthDate,
    country: info.node.country.code,
    shirtNumber: info.node.shirtNumber,
    pictureUrl: info.node.pictureUrl,
    subscriptionsCount: info.node.subscriptionsCount,
    lastFifteenSo5Appearances: info.node.status.lastFifteenSo5Appearances,
    lastFifteenSo5AverageScore: info.node.status.lastFifteenSo5AverageScore,
    lastFiveSo5Appearances: info.node.status.lastFiveSo5Appearances,
    lastFiveSo5AverageScore: info.node.status.lastFiveSo5AverageScore,
    playingStatus: info.node.status.playingStatus
      ? info.node.status.playingStatus
      : null,
    activeClub: info.node.activeClub ? info.node.activeClub.name : null,
    league:
      info.node.activeClub && info.node.activeClub.domesticLeague
        ? info.node.activeClub.domesticLeague.displayName
        : null,

    scores: info.node.allSo5Scores.nodes.map((score) => score.score),
  }));

  const columns = [
    {
      tile: "Image",

      render: (rowData) => <Avatar src={rowData.pictureUrl} />,
    },
    { title: "Name", field: "displayName" },
    { title: "Birth Date", field: "birthDate" },
    { title: "Age", field: "age" },
    { title: "Country Code", field: "country" },
    { title: "Playing Status", field: "playingStatus" },
    { title: "Active Club", field: "activeClub" },
    { title: "League", field: "league", type: "string" },

    { title: "Position", field: "position" },
    { title: "Shirt Number", field: "shirtNumber" },

    { title: "Subscriptions Count", field: "subscriptionsCount" },
    {
      title: "Last Fifteen So5Appearances",
      field: "lastFifteenSo5Appearances",
    },
    {
      title: "Last Fifteen So5AverageScore",
      field: "lastFifteenSo5AverageScore",
    },
    {
      title: "Last Five So5Appearances",
      field: "lastFiveSo5Appearances",
    },
    {
      title: "Last Five So5AverageScore",
      field: "lastFiveSo5AverageScore",
    },
    {
      title: "Scores",
      field: "scores",
      render: (rowData) => rowData.scores.join(),
    },
  ];

  const actions = [
    {
      icon: () => (
        <Button
          variant="contained"
          color="primary"
          component="div"
          startIcon={<ArticleIcon />}
        >
          Export Data
        </Button>
      ),
      isFreeAction: true,
      tooltip: "Export Data",
      onClick: () => exportDownloadData(),
    },
    // {
    //   icon: () => (
    //     <Button
    //       variant="outlined"
    //       color="primary"
    //       component="div"
    //       startIcon={<RefreshIcon />}
    //     >
    //       Refetch Data
    //     </Button>
    //   ),
    //   isFreeAction: true,
    //   tooltip: "Refetch Data",
    //   onClick: () => refetch(),
    // },
    data.club.players.pageInfo.hasNextPage && {
      icon: () => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshIcon />}
          component="div"
        >
          Load More
        </Button>
      ),
      isFreeAction: true,
      tooltip: "Load More Data",
      onClick: () => onLoadMore(),
    },
  ];

  const newData = rows.map((row) => ({
    Id: row.id,
    DisplayName: row.displayName,
    Age: row.age,
    BirthDate: row.birthDate,
    Position: row.position,
    Country: row.country,
    ShirtNumber: row.shirtNumber,
    ClubName: row.activeClub,
    League: row.league,
    SubscriptionsCount: row.subscriptionsCount,
    PictureUrl: row.pictureUrl,
    LastFifteenSo5Appearances: row.lastFifteenSo5Appearances,
    LastFifteenSo5AverageScore: row.lastFifteenSo5AverageScore,
    LastFiveSo5Appearances: row.lastFiveSo5Appearances,
    LastFiveSo5AverageScore: row.lastFiveSo5AverageScore,
    Scores: row.scores.filter((x) => x !== null && x !== 0).join(),
  }));
  // console.log(newData);

  const exportDownloadData = () => {
    const workSheet = xlsx.utils.json_to_sheet(newData);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(
      workBook,
      workSheet,
      "Sorare Players Information"
    );

    //buffer
    let buff = xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    //binary string
    xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
    //download
    xlsx.writeFile(workBook, "SorarePlayers.xlsx");
  };

  return (
    <>
      <Paper>
        <MaterialTable
          data={rows}
          columns={columns}
          actions={actions}
          title="Sorare Players Information"
        />
      </Paper>
    </>
  );
};

export default React.memo(PlayerListTable);

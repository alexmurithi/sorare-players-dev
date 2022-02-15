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
  const { data, loading, error, refetch, networkStatus, fetchMore } = useQuery(
    PLAYERS_INFO,
    {
      variables: { slug: SLUG },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch) return "Refetching data...";
  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log("data", data.playerInfo);

  const rows = data.playerInfo.map((info) => ({
    id: info.id,
    displayName: info.displayName,
    age: info.age,
    position: info.position,
    birthDate: info.birthDate,
    country: info.country.code,
    shirtNumber: info.shirtNumber,
    pictureUrl: info.pictureUrl,
    subscriptionsCount: info.subscriptionsCount,
    lastFifteenSo5Appearances: info.status.lastFifteenSo5Appearances,
    lastFifteenSo5AverageScore: info.status.lastFifteenSo5AverageScore,
    lastFiveSo5Appearances: info.status.lastFiveSo5Appearances,
    lastFiveSo5AverageScore: info.status.lastFiveSo5AverageScore,
    playingStatus: info.status.playingStatus ? info.status.playingStatus : null,
    activeClub: info.activeClub ? info.activeClub.name : null,
    league:
      info.activeClub && info.activeClub.domesticLeague
        ? info.activeClub.domesticLeague.displayName
        : null,

    scores: info.allSo5Scores.nodes.map((score) => score.score),
  }));

  console.log(rows);

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
      render: (rowData) =>
        rowData.scores.filter((x) => x !== null && x !== 0).join(),
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
    {
      icon: () => (
        <Button
          variant="outlined"
          color="primary"
          component="div"
          startIcon={<RefreshIcon />}
        >
          Refetch Data
        </Button>
      ),
      isFreeAction: true,
      tooltip: "Refetch Data",
      onClick: () => refetch(),
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

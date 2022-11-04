import axios from "axios";

const getLcuApiUrl = (credentials: any, uri: string) =>
  `${credentials.protocol}://${credentials.address}:${credentials.port}${uri}`;

export const getMatchHistory =  async (credentials: any) => {
  const result = await axios.get(
    getLcuApiUrl(
      credentials, '/lol-match-history/v1/products/lol/current-summoner/matches'
    ),
    {
      auth: {
        username: credentials.username,
        password: credentials.password,
      },
    }
  );
  return result.data.games.games;
}

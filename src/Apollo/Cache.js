import { InMemoryCache } from "@apollo/client";
import moment from "moment";
const cache = new InMemoryCache({
  typePolicies: {
    PlayerInfo: {
      fields: {
        birthDate: {
          read(birthDate) {
            return moment(birthDate).format("MMM Do YYYY");
          },
        },
        country: {
          code: {
            read(code) {
              return code.toUpperCase();
            },
          },
        },
      },
    },
  },
});

export default cache;

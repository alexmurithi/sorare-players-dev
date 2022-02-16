import { InMemoryCache } from "@apollo/client";
import moment from "moment";
import { relayStylePagination } from "@apollo/client/utilities";
const cache = new InMemoryCache({
  typePolicies: {
    Player: {
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

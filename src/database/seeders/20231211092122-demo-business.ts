"use strict";

import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "businesses",
      [
        {
          id: 0,
          name: "CSIRO",
          year: 1979,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1,
          name: "Caroma",
          year: 2004,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Ecover",
          year: 1989,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "INTEMAN",
          year: 2005,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Orona",
          year: 1967,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "Alcoa",
          year: 2003,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("businesses", {});
  },
};

import { config } from 'dotenv';
import express, { type Express } from 'express';

config();
export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static('public'));
};

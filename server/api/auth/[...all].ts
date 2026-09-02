import { defineEventHandler, toWebRequest } from 'h3';
import { auth } from "~~/server/utils/auth";

export default defineEventHandler((evt) => {
  return auth.handler(toWebRequest(evt));
});
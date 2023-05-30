import { rest } from 'msw';

import messagesForChatInTimerange from './responses/messages-for-chat-in-timerange.json';
import messagesByChatId from './responses/messages-by-chat-id.json';
import initChat from './responses/init-chat.json';
import chatById from './responses/chat-by-Id.json';
import endChat from './responses/end-chat.json';
import getWaitingTime from './responses/get-waiting-time.json';
import postMessage from './responses/post-message.json';
import { RUUTER_ENDPOINTS } from '../constants';

const ruuterUrl = 'http://localhost:3003';

const handlers = [
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.INIT_CHAT}`, (_req, res, ctx) => res(ctx.json(initChat))),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.POST_MESSAGE}`, (_req, res, ctx) => res(ctx.json(postMessage))),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.GET_MESSAGES_BY_CHAT_ID}`, (_req, res, ctx) => res(ctx.json(messagesByChatId))),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.END_CHAT}`, (_req, res, ctx) => res(ctx.json(endChat))),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.GET_CHAT_BY_ID}`, (_req, res, ctx) => res(ctx.json(chatById))),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.GET_NEW_MESSAGES}`, (_req, res, ctx) => res(ctx.json(messagesForChatInTimerange))),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.GET_WAITING_TIME}`, (_req, res, ctx) => res(ctx.json(getWaitingTime))),
  rest.get(`${ruuterUrl}${RUUTER_ENDPOINTS.DOWNLOAD_CHAT}`, async (_req, res, ctx) => {
    // TODO fix with correct mocking
    const url = 'https://cors-anywhere.herokuapp.com/https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
        },
    };
    const pdfFile = await fetch(url, requestOptions)
    .then((res) =>
    res.arrayBuffer(),)

  return res(
    ctx.set('Content-Length', pdfFile.byteLength.toString()),
    ctx.set('Content-Type', 'application/pdf'),
    ctx.body(pdfFile),
  )
    
  }),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.CUSTOM_JWT_EXTEND}`, (_req, res, ctx) => res(
    ctx.json({
      "custom_jwt_extend": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIiLCJjaGF0SWQiOiJhZWRhODM3Zi03MTdiLTQwMTgtOTkyMC0wYjY0NmU4NDA1N2UiLCJpc3MiOiJieWsuYnVlcm9rcmF0dC5lZSIsImZvcndhcmRUbyI6IiIsImV4cCI6MTY3NTc3NjA2MSwiaWF0IjoxNjc1NzY4ODYxLCJqdGkiOiI0MTVmZWNjNi1kNDQ2LTRkNTctYWU3NS0xNWYzMjhkYjFhM2IifQ.VpQCPYrnfbxBKgLMJ_gLBPZPb6FYJ9sxwt2ScrqpycNqs58LvFZ1qGduDAJUpB3bjtw6oUgzMAPHvfp2XPDzJfiJTiGXKm7HmO7S-3zP4enWt2X6Uv1G9QbKlzO9uRjdSkx8v5GktGj5ThoZupuNLNSGQ-WGecwntU7HqIlNcODvr5GpBoRev5PyKgbMF-Xw3QFe-MOCBzsi7OoL0ZnpXOa_JayFWHPERKdrgTJWIvE3EEI1tyAsGwJaMxvcb3fBfrbdYEtlGiwl4hzkrQS8vFi9G49JILLn6X00EJfWgAOQDy2dTgxeGpFGLdPFYUYcAYOp5idbprrZRmxuNp87JA"
    })
  )),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.GET_GREETING}`, (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      "greeting": "Tere tulemast! Kuidas ma saan teid aidata?"
    })
  )),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.CUSTOM_JWT_USERINFO}`, (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      "jwtExpirationTimestamp": "2024-10-10T10:10:10.000Z",
      "firstName": "firstname",
      "lastName": "lastname",
      "personalCode": "11111",
    })
  )),
  rest.post(`${ruuterUrl}${RUUTER_ENDPOINTS.GET_WAITING_TIME}`, (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      "isActive": true,
      "time": 600
    })
  ))
];

export default handlers;

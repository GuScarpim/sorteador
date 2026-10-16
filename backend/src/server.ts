import { createApp } from "./app";

const port = Number(process.env.PORT) || 3333;
createApp().listen(port, () => console.log(`API do sorteador em http://localhost:${port}`));

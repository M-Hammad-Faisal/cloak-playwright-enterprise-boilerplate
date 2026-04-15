const BANNER = `
\x1b[36m   ________    ____  ___    __ __
  / ____/ /   / __ \\/   |  / //_/
 / /   / /   / / / / /| | / ,<   
/ /___/ /___/ /_/ / ___ |/ /| |  
\\____/_____/\\____/_/  |_/_/ |_|  \x1b[0m
 \x1b[35mSTEALTH BROWSER BOILERPLATE\x1b[0m
`;

export const Logger = {
  banner: () => console.log(BANNER),
  info: (msg: string) => console.log(`\x1b[34m[INFO]\x1b[0m ${msg}`),
  success: (msg: string) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
  warn: (msg: string) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`),
  error: (msg: string, err?: unknown) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
    if (err) console.error(err);
  },
  step: (msg: string) => console.log(`\n\x1b[35m➡ ${msg}\x1b[0m`),
};

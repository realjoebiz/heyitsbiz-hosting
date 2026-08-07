// Entrypoint for a Coolify cron job: `npm run worker`. Runs one pass over
// pending ProvisioningJob rows and exits — same pattern as Local Gazette's
// blog-generation cron. Not a long-running process; don't `nohup` this.
import { processJobs } from "./processJobs";

processJobs()
  .then(({ processed }) => {
    console.log(`[worker] pass complete — ${processed} job(s) picked up`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("[worker] fatal error", err);
    process.exit(1);
  });

import { html } from "../lib/preact.standalone.module.js";
import { FURY_BURST_THRESHOLD } from "../config.js";

const ReplayLog = ({ logs }) => {
  const parsedLogs = [];

  logs.forEach(log => {
    if (log.startsWith("|player")) {
      const [, , id, player] = log.split("|");
      parsedLogs.push(`${id % 2 === 0 ? "left" : "right"}: ${JSON.parse(player).name}=${id}`);
    } else if (log.startsWith("|vs|")) {
      const [, , left, right] = log.split("|");
      parsedLogs.push(`${left} vs ${right}`);
    } else if (log.startsWith("|turn|")) {
      const [, , id, seconds] = log.split("|");
      parsedLogs.push(`${id}: turn start at ${seconds} seconds`);
    } else if (log.startsWith("|win|")) {
      const [, , id] = log.split("|");
      parsedLogs.push(`${id} wins`);
    } else if (log.startsWith("|skill|")) {
      const [, , id, name] = log.split("|");
      parsedLogs.push(`${id}: ${name.replace("Anit", "Anti")}`); // workaround for typo
    } else if (log.startsWith("|dodge|")) {
      const [, , id] = log.split("|");
      parsedLogs.push(`${id} dodged the attack`);
    } else if (log.startsWith("|parry|")) {
      const [, , id] = log.split("|");
      parsedLogs.push(`${id} parried the attack`);
    } else if (log.startsWith("|status|add")) {
      const [, , , id, name] = log.split("|");
      parsedLogs.push(`${id}: gained status ${name}`);
    } else if (log.startsWith("|status|remove")) {
      const [, , , id, name] = log.split("|");
      parsedLogs.push(`${id}: lost status ${name}`);
    } else if (log.startsWith("|stat|")) {
      const [, , , id, stat, amount, current, initial, source] = log.split("|");
      parsedLogs.push(`${id}: ${amount} ${stat} from ${source}, ${current}/${initial}`);
    } else if (log.startsWith("|fury|")) {
      const [, , id, amount, current] = log.split("|");
      parsedLogs.push(`${id}: gained ${amount} fury, ${current}/${FURY_BURST_THRESHOLD}`);
    } else if (log.startsWith("|furyburst|")) {
      const [, , id] = log.split("|");
      parsedLogs.push(`${id}: fury burst`);
    } else if (log.startsWith("|info|") || log.startsWith("|debug|")) {
      parsedLogs.push(log.split("|")[2]);
    } else {
      console.warn(`Unhandled log: ${log}`);
    }
  });

  return html`${parsedLogs.map(line => html`<span>${line}</span>`)}`;
}

export default ReplayLog;

import { NextResponse } from "next/server";
import os from "os";
import { execSync } from "child_process";

function exec(cmd: string): string {
  try {
    return execSync(cmd, { timeout: 3000 }).toString().trim();
  } catch {
    return "Unknown";
  }
}

function getUptime(): string {
  const totalSeconds = os.uptime();
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  parts.push(`${mins} min${mins !== 1 ? "s" : ""}`);
  return parts.join(", ");
}

function getShell(): string {
  return process.env.SHELL?.split("/").pop() ?? "Unknown";
}

function getResolution(): string {
  if (process.platform === "darwin") {
    return exec(
      "system_profiler SPDisplaysDataType 2>/dev/null | grep Resolution | head -1 | sed 's/.*: //'"
    );
  }
  return exec("xrandr 2>/dev/null | grep '*' | head -1 | awk '{print $1}'");
}

function getCPU(): string {
  if (process.platform === "darwin") {
    return exec("sysctl -n machdep.cpu.brand_string 2>/dev/null");
  }
  return exec(
    "cat /proc/cpuinfo 2>/dev/null | grep 'model name' | head -1 | sed 's/.*: //'"
  );
}

function getGPU(): string {
  if (process.platform === "darwin") {
    return exec(
      "system_profiler SPDisplaysDataType 2>/dev/null | grep 'Chipset Model\\|Chip Model' | head -1 | sed 's/.*: //'"
    );
  }
  return exec("lspci 2>/dev/null | grep -i vga | sed 's/.*: //'");
}

function getMemory(): string {
  const totalMB = Math.round(os.totalmem() / 1024 / 1024);
  const freeMB = Math.round(os.freemem() / 1024 / 1024);
  const usedMB = totalMB - freeMB;
  return `${usedMB}MiB / ${totalMB}MiB`;
}

function getOS(): string {
  if (process.platform === "darwin") {
    const version = exec("sw_vers -productVersion 2>/dev/null");
    const arch = os.arch();
    return `macOS ${version} ${arch}`;
  }
  const pretty = exec(
    "cat /etc/os-release 2>/dev/null | grep PRETTY_NAME | cut -d'\"' -f2"
  );
  return pretty || `${os.type()} ${os.release()}`;
}

function getHost(): string {
  if (process.platform === "darwin") {
    return exec("sysctl -n hw.model 2>/dev/null");
  }
  return exec(
    "cat /sys/devices/virtual/dmi/id/product_name 2>/dev/null"
  );
}

function getKernel(): string {
  return os.release();
}

function getPackages(): string {
  const counts: string[] = [];
  if (process.platform === "darwin") {
    const brew = exec("brew list 2>/dev/null | wc -l | tr -d ' '");
    if (brew && brew !== "0") counts.push(`${brew} (brew)`);
  }
  return counts.join(", ") || "Unknown";
}

function getTerminal(): string {
  return process.env.TERM_PROGRAM ?? process.env.TERM ?? "Unknown";
}

export const dynamic = "force-dynamic";

export async function GET() {
  const info = {
    user: os.userInfo().username,
    hostname: os.hostname(),
    os: getOS(),
    host: getHost(),
    kernel: getKernel(),
    uptime: getUptime(),
    packages: getPackages(),
    shell: getShell(),
    resolution: getResolution(),
    terminal: getTerminal(),
    cpu: getCPU(),
    gpu: getGPU(),
    memory: getMemory(),
    cpuCores: os.cpus().length,
  };

  return NextResponse.json(info);
}

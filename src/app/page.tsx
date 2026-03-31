"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getDevice } from "@/devices";

interface SysInfo {
  user: string;
  hostname: string;
  os: string;
  host: string;
  kernel: string;
  uptime: string;
  packages: string;
  shell: string;
  resolution: string;
  terminal: string;
  cpu: string;
  gpu: string;
  memory: string;
  cpuCores: number;
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-accent font-semibold">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

export default function Home() {
  const [info, setInfo] = useState<SysInfo | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("/api/sysinfo")
      .then((r) => r.json())
      .then((data) => {
        setInfo(data);
      });
  }, []);

  if (!info) {
    return <div className="min-h-screen" />;
  }

  const device = getDevice(info.host);
  const title = `${info.user}@${info.hostname}`;

  const fields: [string, string][] = [
    ["OS: ", info.os],
    ["Host: ", info.host],
    ["Kernel: ", info.kernel],
    ["Uptime: ", info.uptime],
    ["Packages: ", info.packages],
    ["Shell: ", info.shell],
    ["Resolution: ", info.resolution],
    ["Terminal: ", info.terminal],
    ["CPU: ", `${info.cpu} (${info.cpuCores})`],
    ["GPU: ", info.gpu],
    ["Memory: ", info.memory],
  ];

  return (
    <main className="flex items-center justify-center min-h-screen p-6">
      <div
        className={`transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-start gap-12 font-mono text-[13px] leading-relaxed">
          <div className="shrink-0 w-[280px]">
            <Image
              src={device.image}
              alt={device.label}
              width={280}
              height={280}
              className="object-contain"
              priority
              onLoad={() => setShow(true)}
            />
          </div>

          <div className="min-w-0 pt-2">
            <div className="text-accent font-bold">{title}</div>
            <div className="text-muted mb-1">{"-".repeat(title.length)}</div>
            {fields.map(([label, value]) => (
              <InfoLine key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

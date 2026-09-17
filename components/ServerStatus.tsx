"use client";

import { useEffect, useState } from "react";

type Status = {
  online: boolean;
  players: number;
  maxPlayers: number;
  version: string;
  motd?: string;
};

const fallback: Status = { online: false, players: 0, maxPlayers: 0, version: "1.21+" };

export function ServerStatus({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/status", { cache: "no-store" })
      .then(r => r.json())
      .then(setStatus)
      .catch(() => setStatus(fallback))
      .finally(() => setLoading(false));
  }, []);

  if (compact) {
    return <span className={`server-pill ${status.online ? "online" : "offline"}`}><i />{loading ? "Checking..." : status.online ? `${status.players} Online` : "Offline"}</span>;
  }

  return (
    <div className="status-grid">
      <div className="stat-card"><span>SERVER</span><strong className={status.online ? "text-good" : "text-muted"}>{loading ? "CHECKING" : status.online ? "ONLINE" : "OFFLINE"}</strong></div>
      <div className="stat-card"><span>PLAYERS</span><strong>{loading ? "—" : status.players.toLocaleString()}</strong><small>/ {status.maxPlayers || "∞"}</small></div>
      <div className="stat-card"><span>VERSION</span><strong>{status.version || "1.21+"}</strong></div>
      <div className="stat-card"><span>CROSSPLAY</span><strong>JAVA + BEDROCK</strong></div>
    </div>
  );
}

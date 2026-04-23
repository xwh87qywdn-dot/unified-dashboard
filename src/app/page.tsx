export default function HomePage() {
  return (
    <div>
      <h1>
        Unified Dashboard <span className="badge">v0.1</span>
      </h1>
      <p style={{ color: "#64748b", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        Central control area for this project. Open in{" "}
        <a
          href="https://codesandbox.io/p/github/mozeson-bu/unified-dashboard/main"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#a78bfa" }}
        >
          CodeSandbox
        </a>{" "}
        for a full terminal + editor environment.
      </p>

      <div className="card">
        <h2>Project</h2>
        <p>
          <span className="status-dot" />
          Repository: <strong>mozeson-bu/unified-dashboard</strong>
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Stack: Next.js 15 · Prisma · PostgreSQL · TypeScript · pnpm
        </p>
      </div>

      <div className="card">
        <h2>Quick links</h2>
        <p>
          <a href="/ai" style={{ color: "#a78bfa" }}>AI Workspace</a>
          {" — "}Prompts, notes, and instructions for working with this project.
        </p>
      </div>

      <div className="card">
        <h2>Dev environment</h2>
        <p>
          Start the dev server with <code style={{ color: "#a78bfa" }}>pnpm dev</code>.
          Prisma Studio is available at port 5555 via{" "}
          <code style={{ color: "#a78bfa" }}>pnpm prisma:studio</code>.
          The database runs on port 5432 (PostgreSQL 16).
        </p>
      </div>
    </div>
  );
}

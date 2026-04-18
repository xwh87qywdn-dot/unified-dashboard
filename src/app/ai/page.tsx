"use client";

import { useEffect, useRef, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

const STORAGE_KEY = "ai-workspace-notes";

function newNote(): Note {
  return {
    id: crypto.randomUUID(),
    title: "Untitled",
    content: "",
    updatedAt: Date.now(),
  };
}

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Note[];
  } catch {
    // ignore
  }
  return [
    {
      id: "welcome",
      title: "Welcome to AI Workspace",
      content:
        "This is your AI workspace.\n\nUse this area to keep prompts, notes, and instructions for working with this project.\n\nEach note is saved locally in your browser.\n\n---\n\nExample prompt:\n\nYou are a senior full-stack engineer working on the unified-dashboard project (Next.js 15 + Prisma + PostgreSQL). Help me...",
      updatedAt: Date.now(),
    },
  ];
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function AIWorkspacePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount and log the visit
  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    setSelectedId(loaded[0]?.id ?? "");

    fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "login",
        userAgent: navigator.userAgent,
        details: "User opened AI workspace",
      }),
    }).catch(() => {
      // non-critical – ignore errors
    });
  }, []);

  const selected = notes.find((n) => n.id === selectedId) ?? null;

  function updateSelected(patch: Partial<Note>) {
    setNotes((prev) => {
      const next = prev.map((n) =>
        n.id === selectedId ? { ...n, ...patch, updatedAt: Date.now() } : n
      );
      // Auto-save with debounce
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveNotes(next);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }, 600);
      return next;
    });
  }

  function addNote() {
    const n = newNote();
    setNotes((prev) => {
      const next = [n, ...prev];
      saveNotes(next);
      return next;
    });
    setSelectedId(n.id);
  }

  function deleteSelected() {
    if (!selected) return;
    if (!confirm(`Delete "${selected.title}"?`)) return;
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== selectedId);
      saveNotes(next);
      setSelectedId(next[0]?.id ?? "");
      return next;
    });
  }

  const fmt = (ts: number) =>
    new Date(ts).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>AI Workspace</h1>
      <div className="ai-layout">
        {/* Sidebar */}
        <aside className="ai-sidebar">
          <div className="ai-sidebar-header">
            <span>Notes</span>
            <button className="btn btn-primary" onClick={addNote} title="New note">
              + New
            </button>
          </div>
          <div className="note-list">
            {notes.map((n) => (
              <div
                key={n.id}
                className={`note-item${n.id === selectedId ? " selected" : ""}`}
                onClick={() => setSelectedId(n.id)}
              >
                {n.title || "Untitled"}
              </div>
            ))}
            {notes.length === 0 && (
              <p style={{ padding: "0.75rem", color: "#475569", fontSize: "0.8rem" }}>
                No notes yet.
              </p>
            )}
          </div>
        </aside>

        {/* Editor */}
        <div className="ai-editor">
          {selected ? (
            <>
              <div className="editor-toolbar">
                <input
                  type="text"
                  placeholder="Note title…"
                  value={selected.title}
                  onChange={(e) => updateSelected({ title: e.target.value })}
                />
                <button className="btn btn-danger" onClick={deleteSelected}>
                  Delete
                </button>
              </div>
              <div className="editor-body">
                <textarea
                  placeholder="Write prompts, notes, or instructions here…"
                  value={selected.content}
                  onChange={(e) => updateSelected({ content: e.target.value })}
                />
              </div>
              <div className="editor-footer">
                <span>Updated {fmt(selected.updatedAt)}</span>
                <span style={{ color: saved ? "#22c55e" : "transparent" }}>
                  ✓ Saved
                </span>
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#334155",
              }}
            >
              Select a note or create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

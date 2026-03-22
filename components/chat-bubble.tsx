"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What has Sameer built?",
  "What's his tech stack?",
  "Is he open to freelance?",
  "Tell me about Sieve",
  "Tell me about FactorSphere",
  "What's his work experience?",
];

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("chat_messages");
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("chat_messages", JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function send(text: string) {
    const userMessage = text.trim();
    if (!userMessage || loading) return;

    const updated: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply || data.error }]);
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 200);
  };

  const chatButtonBottom = "32px";
  const chatPanelBottom = "104px";

  return (
    <>
      {/* ── CHAT PANEL ─────────────────────────────────────────────────── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: chatPanelBottom,
            right: "32px",
            width: "360px",
            maxHeight: "520px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(112, 133, 255, 0.25)",
            backgroundColor: "var(--color-background-primary)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
            opacity: closing ? 0 : 1,
            transform: closing ? "scale(0.95) translateY(10px)" : "scale(1) translateY(0)",
            transition: "opacity 0.2s ease-out, transform 0.2s ease-out, bottom 0.3s ease-out",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(112, 133, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#7085FF",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                Ask about Sameer
              </span>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-tertiary)",
                fontSize: "18px",
                lineHeight: 1,
                padding: "0 2px",
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--color-text-tertiary)",
                    margin: 0,
                    marginBottom: "4px",
                  }}
                >
                  suggested
                </p>
                {SUGGESTED.map((q, idx) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    style={{
                      textAlign: "left",
                      background: "none",
                      border: "1px solid rgba(112, 133, 255, 0.2)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                      transition: "border-color 0.15s, color 0.15s",
                      opacity: 0,
                      animation: `fadeInUp 0.3s ease-out ${idx * 0.05}s forwards`,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = "#7085FF";
                      (e.target as HTMLButtonElement).style.color = "var(--color-text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = "rgba(112, 133, 255, 0.2)";
                      (e.target as HTMLButtonElement).style.color = "var(--color-text-secondary)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.role === "user" ? "flex-end" : "flex-start",
                  opacity: 0,
                  animation: "fadeInUp 0.2s ease-out forwards",
                }}
              >
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "9px 13px",
                    borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    backgroundColor:
                      m.role === "user"
                        ? "#7085FF"
                        : "var(--color-background-secondary)",
                    color:
                      m.role === "user"
                        ? "#ffffff"
                        : "var(--color-text-primary)",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {m.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => {
                          if (!href) return <>{children}</>;
                          if (href.startsWith("http")) {
                            return (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#7085FF", textDecoration: "none" }}
                              >
                                {children}
                              </a>
                            );
                          }
                          if (href.startsWith("mailto:")) {
                            return (
                              <a
                                href={href}
                                style={{ color: "#7085FF", textDecoration: "none" }}
                              >
                                {children}
                              </a>
                            );
                          }

                          return (
                            <Link
                              href={href}
                              style={{ color: "#7085FF", textDecoration: "none" }}
                              onClick={() => setOpen(false)}
                            >
                              {children}
                            </Link>
                          );
                        },
                        p: ({ children }) => (
                          <p style={{ margin: "0 0 6px 0" }}>{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li style={{ marginBottom: "2px" }}>{children}</li>
                        ),
                        code: ({ children }) => (
                          <code
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "12px",
                              backgroundColor: "rgba(112, 133, 255, 0.1)",
                              padding: "1px 4px",
                              borderRadius: "3px",
                            }}
                          >
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "flex-start", opacity: 0, animation: "fadeInUp 0.2s ease-out forwards" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px 12px 12px 2px",
                    backgroundColor: "var(--color-background-secondary)",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#7085FF",
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px 16px",
              borderTop: "1px solid rgba(112, 133, 255, 0.1)",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Sameer..."
              disabled={loading}
              style={{
                flex: 1,
                background: "var(--color-background-secondary)",
                border: "1px solid rgba(112, 133, 255, 0.2)",
                borderRadius: "6px",
                padding: "8px 12px",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--color-text-primary)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#7085FF";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(112, 133, 255, 0.2)";
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              style={{
                backgroundColor: input.trim() && !loading ? "#7085FF" : "var(--color-background-secondary)",
                color: input.trim() && !loading ? "#ffffff" : "var(--color-text-tertiary)",
                border: "none",
                borderRadius: "6px",
                padding: "8px 14px",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                transition: "background-color 0.15s, color 0.15s",
                flexShrink: 0,
              }}
            >
              send
            </button>
          </form>
        </div>
      )}

      {/* ── FLOATING BUTTON ────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Ask about Sameer"}
        className="fixed right-8 bottom-8 z-[10000] w-12 h-12 rounded-full bg-[#7085FF] shadow-[0_4px_16px_rgba(112,133,255,0.4)] flex items-center justify-center transition-transform transition-shadow duration-150 hover:scale-[1.08] hover:shadow-[0_6px_24px_rgba(112,133,255,0.55)]"
        style={{
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 5C2 3.9 2.9 3 4 3H16C17.1 3 18 3.9 18 5V13C18 14.1 17.1 15 16 15H11L7 18V15H4C2.9 15 2 14.1 2 13V5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="7" cy="9" r="1" fill="white"/>
            <circle cx="10" cy="9" r="1" fill="white"/>
            <circle cx="13" cy="9" r="1" fill="white"/>
          </svg>
        )}
      </button>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

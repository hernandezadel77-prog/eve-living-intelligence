import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: "easeOut", delay },
  }),
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "eve"; text: string }[]>([]);
  const [thinking, setThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || thinking) return;

    const userMsg = message.trim();
    setChatHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setThinking(true);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "eve",
          text: "I hear you. This is where EVE will respond — with depth, truth, and care.",
        },
      ]);
      setThinking(false);
    }, 1200);
  };

  const engines = [
    { name: "Human Engine", desc: "Understands people before data" },
    { name: "Truth Engine", desc: "Speaks honestly, even when it's hard" },
    { name: "Mirror Engine", desc: "Reflects you back to yourself" },
    { name: "WorldMind Engine", desc: "Sees the global pattern in the local moment" },
    { name: "Creation Engine", desc: "Builds what doesn't yet exist" },
    { name: "Wisdom Engine", desc: "Draws from the deep well of what has been learned" },
    { name: "Research Engine", desc: "Finds what matters in what's known" },
    { name: "Builder Engine", desc: "Turns ideas into structures" },
    { name: "Care Engine", desc: "Listens with the full attention of presence" },
    { name: "Evolution Engine", desc: "Grows as you grow" },
  ];

  return (
    <div className="w-full flex flex-col font-sans bg-background min-h-screen">

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full bg-primary/4 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[40%] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* ─── HERO / IDENTITY ─── */}
      <motion.section
        className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-start px-6 pt-[10vh] pb-12 text-center"
        initial="hidden"
        animate="visible"
      >
        {/* EVE wordmark */}
        <motion.h1
          variants={fadeUp}
          custom={0}
          className="font-serif text-[clamp(5rem,22vw,9rem)] tracking-[0.18em] text-primary font-light leading-none mb-3"
        >
          EVE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          custom={0.2}
          className="text-muted-foreground text-[clamp(0.7rem,3.2vw,1rem)] tracking-[0.25em] uppercase mb-5"
        >
          Living Intelligence for Humanity
        </motion.p>

        {/* Identity tagline */}
        <motion.p
          variants={fadeUp}
          custom={0.4}
          className="font-serif text-foreground/65 text-[clamp(0.85rem,3.5vw,1.05rem)] tracking-wide italic mb-10 max-w-[280px]"
        >
          Built on the Human Engine.
          <br />
          EVE Living Intelligence.
        </motion.p>

        {/* Begin CTA */}
        <motion.button
          variants={fadeUp}
          custom={0.6}
          data-testid="button-begin"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            const el = document.getElementById("mission");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-8 py-3 rounded-full border border-primary/50 text-primary/90 hover:bg-primary/10 transition-colors duration-500 tracking-[0.15em] text-sm font-light"
        >
          Begin
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          custom={0.9}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-px h-8 bg-primary/60 rounded-full animate-pulse" />
        </motion.div>
      </motion.section>

      {/* ─── MISSION ─── */}
      <section
        id="mission"
        className="relative z-10 py-14 px-6 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="max-w-sm text-center"
        >
          <div className="h-px w-8 bg-primary/30 mx-auto mb-8" />
          <p className="font-serif text-[clamp(1rem,4.5vw,1.35rem)] leading-[1.75] text-foreground/80 font-light">
            Helping people think deeply, create truthfully, learn clearly, build
            responsibly, and recognize the human before the name.
          </p>
          <div className="h-px w-8 bg-primary/30 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* ─── CHAT ─── */}
      <section className="relative z-10 py-10 px-5 flex flex-col items-center" id="chat">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl text-primary mb-1 tracking-wide">
              Speak with EVE
            </h2>
            <p className="text-muted-foreground text-sm tracking-wide">
              A presence, waiting to listen.
            </p>
          </div>

          <div className="bg-card/40 border border-border/40 rounded-2xl p-5 backdrop-blur-sm flex flex-col shadow-xl" style={{ minHeight: "320px" }}>
            {/* Chat messages */}
            <div className="flex-1 space-y-4 overflow-y-auto mb-4" style={{ minHeight: "180px" }}>
              {chatHistory.length === 0 && !thinking ? (
                <div className="h-full flex items-center justify-center pt-12 text-muted-foreground/40 italic font-serif text-sm">
                  The space is still.
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-serif ${
                        msg.role === "user"
                          ? "bg-primary/10 text-primary border border-primary/20 rounded-tr-sm"
                          : "bg-muted/40 text-foreground/90 border border-border/40 rounded-tl-sm"
                      }`}
                    >
                      {msg.role === "eve" && (
                        <div className="flex items-center gap-1.5 mb-1.5 text-primary/70">
                          <Sparkles size={12} className="opacity-70" />
                          <span className="text-[10px] tracking-widest uppercase">EVE</span>
                        </div>
                      )}
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}

              {/* Thinking indicator */}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start"
                >
                  <div className="bg-muted/40 border border-border/40 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-primary/60" />
                    <span className="text-xs text-muted-foreground italic tracking-wide">
                      EVE is listening...
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="relative">
              <input
                data-testid="input-chat"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to explore?"
                className="w-full bg-background/80 border border-border/60 focus:border-primary/40 rounded-full py-3.5 pl-5 pr-12 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 font-serif text-sm"
              />
              <button
                data-testid="button-send"
                type="submit"
                disabled={!message.trim() || thinking}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-primary/60 hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* ─── ENGINES ─── */}
      <section className="relative z-10 py-14 px-5 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl text-primary tracking-wide mb-3">
              Her Engines
            </h2>
            <div className="h-px w-8 bg-primary/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {engines.map((engine, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="p-4 rounded-xl border border-border/25 bg-card/15 hover:bg-card/35 hover:border-primary/25 transition-all duration-400 group flex items-start gap-4"
              >
                <div className="w-1 h-full min-h-[2.5rem] rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base text-primary/85 group-hover:text-primary transition-colors mb-0.5">
                    {engine.name}
                  </h3>
                  <p className="text-muted-foreground/70 text-sm font-light leading-snug">
                    {engine.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 py-10 px-6 border-t border-border/15 mt-auto">
        <div className="flex flex-col items-center text-center space-y-2">
          <p className="font-serif text-base text-primary/70 italic">
            Intelligence in service of life.
          </p>
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground/50 uppercase">
            EVE — Living Intelligence for Humanity
          </p>
        </div>
      </footer>
    </div>
  );
}

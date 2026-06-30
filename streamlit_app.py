from __future__ import annotations

import re
from textwrap import dedent

import streamlit as st


st.set_page_config(
    page_title="GRIP Insight",
    page_icon="G",
    layout="wide",
    initial_sidebar_state="collapsed",
)


APPLICANT = {
    "name": "徐敬研",
    "school": "北京工业大学",
    "direction": "智能化软件工程",
    "email": "jingyanxu_2005@163.com",
}

METRICS = {
    "grip_score": 41.0,
    "gpt4o_score": 41.4,
    "grip_retrievals": 1.24,
    "r1_retrievals": 5.12,
    "fewer_retrievals": 75.8,
    "budget3_score": 41.0,
    "budget10_score": 41.8,
    "budget3_retrievals": 1.24,
    "budget10_retrievals": 1.62,
}


def html(block: str) -> None:
    cleaned = dedent(block).strip()
    cleaned = re.sub(r"(?m)^[ \t]{4,}(?=</?[A-Za-z])", "", cleaned)
    st.html(cleaned)


def interpolate_budget(value: int, start: float, end: float) -> float:
    ratio = (value - 3) / 7
    return start + ratio * (end - start)


def pill(text: str) -> str:
    return f'<span class="pill">{text}</span>'


def list_items(items: list[str]) -> str:
    return "".join(f"<li>{item}</li>" for item in items)


def card(title: str, body: str, eyebrow: str = "") -> str:
    eyebrow_html = f'<p class="eyebrow">{eyebrow}</p>' if eyebrow else ""
    return f"""
    <article class="card">
      {eyebrow_html}
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
    """


def bar_row(label: str, value: float, maximum: float, color: str, suffix: str = "") -> str:
    width = max(4, min(100, value / maximum * 100))
    shown = f"{value:.1f}{suffix}" if value >= 10 else f"{value:.2f}{suffix}"
    return f"""
    <div class="bar-row">
      <div class="bar-label"><span>{label}</span><strong>{shown}</strong></div>
      <div class="bar-track"><div class="bar-fill" style="width:{width:.1f}%; background:{color};"></div></div>
    </div>
    """


html(
    """
<style>
:root {
  --navy: #0B1020;
  --red: #8C1515;
  --gold: #C9A227;
  --ivory: #F8F5EF;
  --paper: #FFFDF8;
  --muted: #5F6673;
  --ink: #111827;
  --line: rgba(17, 24, 39, 0.12);
}

html { scroll-behavior: smooth; }

.stApp {
  background: var(--ivory);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif;
}

[data-testid="stHeader"],
[data-testid="stToolbar"],
[data-testid="stDecoration"],
[data-testid="stStatusWidget"],
.stDeployButton,
header {
  display: none !important;
  height: 0 !important;
  min-height: 0 !important;
  visibility: hidden !important;
}

[data-testid="stSidebar"], #MainMenu, footer { visibility: hidden; }

.block-container {
  max-width: none;
  padding-top: 1rem;
  padding-left: 16.25rem;
  padding-right: clamp(1.25rem, 4vw, 4rem);
  padding-bottom: 4rem;
}

p, li { line-height: 1.75; }
a { color: inherit; text-decoration: none; }

.side-nav {
  position: fixed;
  left: clamp(0.9rem, 1.4vw, 1.25rem);
  top: 1rem;
  bottom: 1rem;
  z-index: 50;
  display: flex;
  width: 13.25rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.95rem;
  overflow-y: auto;
  scrollbar-width: none;
  border: 1px solid rgba(17, 24, 39, 0.1);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 253, 248, 0.96), rgba(248, 245, 239, 0.9)),
    radial-gradient(circle at 18% 0%, rgba(201, 162, 39, 0.16), transparent 11rem);
  color: var(--ink);
  box-shadow: 0 24px 70px rgba(17, 24, 39, 0.12);
  backdrop-filter: blur(16px);
}

.side-nav::-webkit-scrollbar {
  display: none;
}

.side-nav::before {
  content: "";
  position: absolute;
  top: 0.8rem;
  left: 0.95rem;
  right: 0.95rem;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--red), var(--gold));
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
  padding: 0.75rem 0.35rem 0.9rem;
  border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  color: var(--ink);
  font-weight: 800;
  letter-spacing: 0;
}

.brand-mark {
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--red), var(--gold));
  color: white;
  box-shadow: 0 10px 24px rgba(140, 21, 21, 0.2);
}

.brand-text {
  display: grid;
  min-width: 0;
}

.brand-text strong {
  line-height: 1.1;
}

.brand-text small {
  margin-top: 0.18rem;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
}

.navlinks {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.15rem 0;
}

.navlinks a {
  display: flex;
  align-items: center;
  gap: 0.58rem;
  min-height: 2.72rem;
  padding: 0.42rem 0.52rem;
  border: 1px solid transparent;
  border-radius: 14px;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 750;
  transition: background .16s ease, border-color .16s ease, color .16s ease, transform .16s ease;
}

.navlinks a:hover {
  color: var(--red);
  border-color: rgba(140, 21, 21, 0.16);
  background: rgba(140, 21, 21, 0.07);
  transform: translateX(2px);
}

.nav-index {
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  width: 1.68rem;
  height: 1.68rem;
  border: 1px solid rgba(140, 21, 21, 0.16);
  border-radius: 999px;
  background: #F3F0E8;
  color: var(--red);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.68rem;
  font-weight: 900;
}

.navlinks a:hover .nav-index {
  background: var(--red);
  color: white;
}

.nav-label {
  display: grid;
  min-width: 0;
}

.nav-label strong {
  line-height: 1.15;
}

.nav-label small {
  margin-top: 0.12rem;
  color: var(--muted);
  font-size: 0.66rem;
  font-weight: 700;
}

.nav-foot {
  margin: 0;
  padding: 0.68rem 0.7rem;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 16px;
  background: rgba(201, 162, 39, 0.08);
}

.nav-foot-line {
  display: block;
  width: 2.4rem;
  height: 2px;
  margin-bottom: 0.55rem;
  border-radius: 999px;
  background: var(--gold);
}

.nav-foot p {
  margin: 0;
  color: var(--muted);
  font-size: 0.7rem;
  line-height: 1.55;
}

.hero {
  position: relative;
  overflow: hidden;
  max-width: 1180px;
  min-height: calc(100vh - 2rem);
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 5.2rem) clamp(1.2rem, 6vw, 4.5rem) 4.6rem;
  border-radius: 28px;
  color: white;
  background:
    radial-gradient(circle at 20% 20%, rgba(140, 21, 21, 0.42), transparent 28rem),
    radial-gradient(circle at 78% 30%, rgba(201, 162, 39, 0.22), transparent 30rem),
    linear-gradient(145deg, #0B1020 0%, #151C33 55%, #0B1020 100%);
  border-bottom: 1px solid rgba(201, 162, 39, 0.28);
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, black, transparent 78%);
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 980px;
  margin: 0;
  padding: 0;
}

.hero-kicker {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.45rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.92rem;
}

.hero h1 {
  margin: 1.25rem 0 0.4rem;
  font-size: clamp(3.1rem, 7.8vw, 7rem);
  line-height: 0.92;
  letter-spacing: 0;
}

.hero h2 {
  margin: 0.8rem 0 1.3rem;
  font-size: clamp(1.45rem, 2.6vw, 2.4rem);
  line-height: 1.28;
  color: #F6E8BF;
}

.hero p {
  max-width: 760px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.08rem;
}

.hero-profile {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  max-width: 900px;
  margin-top: 2rem;
}

.profile-item {
  min-height: 5rem;
  padding: 0.85rem 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.profile-item span {
  display: block;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.78rem;
  font-weight: 800;
}

.profile-item strong {
  display: block;
  margin-top: 0.3rem;
  color: white;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.token-trail {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 2.4rem;
}

.token-trail span {
  padding: 0.56rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.86);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  animation: drift 5.4s ease-in-out infinite;
}

.token-trail span:nth-child(2) { animation-delay: .4s; }
.token-trail span:nth-child(3) { animation-delay: .8s; }
.token-trail span:nth-child(4) { animation-delay: 1.2s; }

@keyframes drift {
  0%, 100% { transform: translateY(0); opacity: .72; }
  50% { transform: translateY(-6px); opacity: 1; }
}

.section {
  max-width: 1180px;
  margin: 0 auto;
  padding: 4.6rem 0 0.6rem;
  scroll-margin-top: 1.2rem;
}

.section-head {
  max-width: 760px;
  margin-bottom: 1.8rem;
}

.eyebrow {
  margin: 0 0 0.55rem;
  color: var(--red);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.section-head h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  letter-spacing: 0;
}

.section-head p {
  margin: 0.8rem 0 0;
  color: var(--muted);
  font-size: 1.02rem;
}

.grid {
  display: grid;
  gap: 1rem;
}

.grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.card, .metric-card, .lit-card, .wide-panel {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 253, 248, 0.88);
  box-shadow: 0 16px 42px rgba(17, 24, 39, 0.06);
}

.card {
  padding: 1.35rem;
}

.card h3, .lit-card h3, .wide-panel h3, .metric-card h3 {
  margin: 0 0 0.65rem;
  color: var(--ink);
  font-size: 1.15rem;
}

.card p, .lit-card p, .wide-panel p, .metric-card p {
  margin: 0;
  color: var(--muted);
}

.pill {
  display: inline-flex;
  align-items: center;
  margin: 0.18rem 0.24rem 0.18rem 0;
  padding: 0.34rem 0.62rem;
  border-radius: 999px;
  background: #F0E8DA;
  color: #3A4050;
  font-size: 0.86rem;
  font-weight: 700;
}

.flow {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.flow span {
  display: inline-flex;
  align-items: center;
  min-height: 2.35rem;
  padding: 0.5rem 0.68rem;
  border-radius: 999px;
  background: #F3F0E8;
  color: var(--ink);
  font-size: 0.9rem;
  font-weight: 800;
}

.flow span.token {
  background: rgba(140, 21, 21, 0.1);
  color: var(--red);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.metric-card {
  padding: 1.25rem;
}

.metric-card strong {
  display: block;
  margin: 0.3rem 0;
  color: var(--navy);
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  line-height: 1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.metric-card span {
  color: var(--red);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
}

.wide-panel {
  padding: 1.4rem;
  box-sizing: border-box;
  width: 100%;
}

.budget-panel {
  max-width: 1180px;
  margin: 1rem auto 0;
}

.bar-row {
  margin: 1.05rem 0;
}

.bar-label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.42rem;
  color: var(--ink);
}

.bar-label strong {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.bar-track {
  overflow: hidden;
  height: 0.84rem;
  border-radius: 999px;
  background: #ECE7DB;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
}

.budget-note {
  margin-top: 0.8rem;
  padding: 1rem;
  border-left: 4px solid var(--red);
  background: rgba(140, 21, 21, 0.06);
  color: var(--muted);
}

.lit-card {
  padding: 1.25rem;
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}

.lit-card:focus, .lit-card:hover {
  outline: none;
  transform: translateY(-3px);
  border-color: rgba(140, 21, 21, 0.32);
  box-shadow: 0 22px 56px rgba(17, 24, 39, 0.1);
}

.lit-card .details {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height .24s ease, opacity .24s ease;
}

.lit-card:focus .details,
.lit-card:hover .details {
  max-height: 520px;
  opacity: 1;
  margin-top: 0.8rem;
}

.lit-card ul {
  margin: 0.65rem 0 0;
  padding-left: 1.05rem;
  color: var(--muted);
}

.footer {
  margin-top: 4rem;
  padding: 1.5rem 0 0;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

.anchor {
  display: block;
  height: 1px;
  scroll-margin-top: 1.2rem;
}

@media (max-width: 900px) {
  .block-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .grid-3, .grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-2 { grid-template-columns: 1fr; }
  .side-nav {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    width: auto;
    margin-bottom: 1rem;
    padding: 0.85rem;
    border-radius: 22px;
  }
  .navlinks {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.35rem;
  }
  .navlinks a { min-height: 2.65rem; }
  .nav-foot { display: none; }
  .hero { min-height: auto; }
  .hero-profile { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .block-container { padding-left: 1rem; padding-right: 1rem; }
  .hero { padding: 3.4rem 1.1rem 3.3rem; }
  .hero-inner { padding: 0 1rem; }
  .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .navlinks { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .navlinks a { font-size: 0.82rem; padding: 0.42rem 0.5rem; }
  .nav-label small { display: none; }
  .hero-profile { grid-template-columns: 1fr; }
  .token-trail span { max-width: 100%; }
  .lit-card .details { max-height: none; opacity: 1; margin-top: 0.8rem; }
}
</style>
"""
)

html(
    f"""
<aside class="side-nav">
  <a class="brand" href="#top">
    <span class="brand-mark">G</span>
    <span class="brand-text"><strong>GRIP Insight</strong><small>Reading Map</small></span>
  </a>
  <div class="navlinks">
    <a href="#overview"><span class="nav-index">01</span><span class="nav-label"><strong>概览</strong><small>Overview</small></span></a>
    <a href="#problem"><span class="nav-index">02</span><span class="nav-label"><strong>问题</strong><small>Problem</small></span></a>
    <a href="#method"><span class="nav-index">03</span><span class="nav-label"><strong>方法</strong><small>Method</small></span></a>
    <a href="#training"><span class="nav-index">04</span><span class="nav-label"><strong>训练</strong><small>Training</small></span></a>
    <a href="#experiments"><span class="nav-index">05</span><span class="nav-label"><strong>实验</strong><small>Experiments</small></span></a>
    <a href="#reflection"><span class="nav-index">06</span><span class="nav-label"><strong>思考</strong><small>Reflection</small></span></a>
    <a href="#review"><span class="nav-index">07</span><span class="nav-label"><strong>综述</strong><small>Literature</small></span></a>
    <a href="#fit"><span class="nav-index">08</span><span class="nav-label"><strong>契合</strong><small>Research Fit</small></span></a>
    <a href="#conclusion"><span class="nav-index">09</span><span class="nav-label"><strong>总结</strong><small>Conclusion</small></span></a>
  </div>
  <div class="nav-foot"><span class="nav-foot-line"></span><p>Self-triggered information planning.</p></div>
</aside>
<span id="top" class="anchor"></span>
<section class="hero">
  <div class="hero-inner">
    <div class="hero-kicker">Interactive Research Reading Portfolio</div>
    <h1>GRIP Insight</h1>
    <h2>从“被动检索”到“自触发信息规划”</h2>
    <p>
      本页面基于论文《Retrieval as Generation: A Unified Framework with Self-Triggered Information Planning》，
      以交互式方式重构其研究动机、方法框架、实验发现与个人思考。
    </p>
    <p><strong>The future of RAG is not retrieving more, but knowing when and why to retrieve.</strong></p>
    <div class="hero-profile">
      <div class="profile-item"><span>姓名</span><strong>{APPLICANT["name"]}</strong></div>
      <div class="profile-item"><span>学校</span><strong>{APPLICANT["school"]}</strong></div>
      <div class="profile-item"><span>方向</span><strong>{APPLICANT["direction"]}</strong></div>
      <div class="profile-item"><span>邮箱</span><strong>{APPLICANT["email"]}</strong></div>
    </div>
    <div class="token-trail">
      <span>[INTERMEDIARY]</span>
      <span>[RETRIEVE]</span>
      <span>[ANSWER]</span>
      <span>[SOLVED]</span>
    </div>
  </div>
</section>
"""
)

html(
    f"""
<span id="overview" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Overview</p>
    <h2>论文概览</h2>
    <p>这篇工作把 RAG 的核心从“检索器外挂”推进到“生成过程中的信息规划”。</p>
  </div>
  <div class="grid grid-3">
    {card("Paper", "Retrieval as Generation: A Unified Framework with Self-Triggered Information Planning。论文定位于 ACL 2026，聚焦开放域问答中的自触发检索。", "01")}
    {card("Core Question", "模型什么时候应该检索、应该检索什么、什么时候应该停止？这三个问题共同构成了检索增强生成的控制难题。", "02")}
    {card("Key Insight", "GRIP 将检索控制嵌入自回归解码过程，让检索从外部流程变成可学习、可解释、可终止的生成行为。", "03")}
  </div>
  <p style="margin-top:1rem;">
    {pill("RAG")} {pill("Information Planning")} {pill("Self-Triggered Retrieval")} {pill("Open-domain QA")}
  </p>
</section>
"""
)

html(
    f"""
<span id="problem" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Problem</p>
    <h2>问题定义：检索不是一次性前处理</h2>
    <p>传统 RAG 往往把检索放在生成之前，GRIP 则把检索视为推理过程中可被模型主动调度的动作。</p>
  </div>
  <div class="grid grid-2">
    <article class="card">
      <p class="eyebrow">Traditional RAG</p>
      <h3>Question → One-shot Retrieval → Generation</h3>
      <ul>
        {list_items(["信息缺口在推理中逐步暴露", "检索时机依赖外部启发式", "查询改写与终止判断难统一", "错误难归因，策略难训练"])}
      </ul>
    </article>
    <article class="card">
      <p class="eyebrow">GRIP</p>
      <h3>Question → Reasoning State → Retrieve → Integrate → Stop</h3>
      <ul>
        {list_items(["检索行为进入生成轨迹", "控制符统一表达状态", "检索深度随任务自适应", "终止机制可学习，轨迹更可解释"])}
      </ul>
    </article>
  </div>
</section>
"""
)

control_cards = [
    ("[INTERMEDIARY]", "阶段性理解", "显式记录当前推理状态与信息缺口。"),
    ("[RETRIEVE]", "触发检索", "生成查询并调用外部检索器。"),
    ("[ANSWER]", "最终回答", "证据足够后进入答案生成。"),
    ("[SOLVED]", "终止轨迹", "问题已解决，停止继续检索和生成。"),
]

html(
    f"""
<span id="method" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Method</p>
    <h2>方法框架：把检索写进解码语言</h2>
    <p>GRIP 的关键不是新增一个复杂检索器，而是给语言模型一组可学习的控制符，使它能在生成轨迹中表达“我还缺什么证据”。</p>
  </div>
  <div class="grid grid-4">
    {"".join(card(token, desc, label) for token, label, desc in control_cards)}
  </div>
  <article class="wide-panel" style="margin-top:1rem;">
    <h3>Decoding Simulator</h3>
    <p>一次典型轨迹可以被理解为如下闭环：先形成中间理解，再判断证据缺口，主动检索并整合证据，最后在足够确定时回答并终止。</p>
    <div class="flow">
      <span>Question</span>
      <span class="token">[INTERMEDIARY]</span>
      <span class="token">[RETRIEVE]</span>
      <span>Evidence</span>
      <span class="token">[ANSWER]</span>
      <span class="token">[SOLVED]</span>
    </div>
  </article>
</section>
"""
)

html(
    f"""
<span id="training" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Training</p>
    <h2>训练流程：先学轨迹，再学取舍</h2>
    <p>论文采用监督微调与强化学习结合的方式，让模型既会使用控制符，也能抑制无效检索。</p>
  </div>
  <div class="grid grid-2">
    <article class="card">
      <p class="eyebrow">Supervised Fine-Tuning</p>
      <h3>40K structured trajectories</h3>
      <p>覆盖直接回答、需要检索、多跳规划和答案整合等场景，先建立控制符使用的基本语言。</p>
      <p>{pill("Direct Answer")} {pill("Retrieval Needed")} {pill("Multi-hop Planning")} {pill("Answer Integration")}</p>
    </article>
    <article class="card">
      <p class="eyebrow">DAPO Reinforcement Learning</p>
      <h3>5K samples</h3>
      <p>进一步优化答案质量、控制符正确性、检索效率和稳定终止，使模型少检索但不弱推理。</p>
      <p>{pill("Answer similarity")} {pill("Control-token correctness")} {pill("Retrieval efficiency")} {pill("Stable termination")}</p>
    </article>
  </div>
</section>
"""
)

html(
    f"""
<span id="experiments" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Experiments</p>
    <h2>实验评估：更少检索，更强规划</h2>
    <p>GRIP 的价值不只在分数，而在于它以更低检索成本接近强模型水平。</p>
  </div>
  <div class="grid grid-4">
    <article class="metric-card"><span>Average Score</span><strong>{METRICS["grip_score"]:.1f}</strong><p>GRIP 在五个 QA 基准上的平均表现。</p></article>
    <article class="metric-card"><span>Average Retrievals</span><strong>{METRICS["grip_retrievals"]:.2f}</strong><p>平均每个问题仅触发约 1.24 次检索。</p></article>
    <article class="metric-card"><span>Fewer Retrievals</span><strong>{METRICS["fewer_retrievals"]:.1f}%</strong><p>相较 R1-Searcher 的检索次数降低比例。</p></article>
    <article class="metric-card"><span>Performance Level</span><strong>≈ GPT-4o</strong><p>41.0 接近 GPT-4o 的 41.4。</p></article>
  </div>
  <div class="grid grid-2" style="margin-top:1rem;">
    <article class="wide-panel">
      <h3>Performance Score</h3>
      {bar_row("GRIP", METRICS["grip_score"], 45, "#8C1515")}
      {bar_row("GPT-4o", METRICS["gpt4o_score"], 45, "#C9A227")}
      <p>GRIP 平均分达到 41.0，接近 GPT-4o 的 41.4，并超过多个开源 RAG 基线。</p>
    </article>
    <article class="wide-panel">
      <h3>Retrieval Efficiency</h3>
      {bar_row("GRIP", METRICS["grip_retrievals"], 5.2, "#8C1515")}
      {bar_row("R1-Searcher", METRICS["r1_retrievals"], 5.2, "#C9A227")}
      <p>更少检索没有牺牲性能，说明 GRIP 学到的是任务感知的检索深度，而不是机械式深搜堆叠。</p>
    </article>
  </div>
</section>
"""
)

budget = st.slider("检索预算 B", min_value=3, max_value=10, value=3, step=1)
score = interpolate_budget(budget, METRICS["budget3_score"], METRICS["budget10_score"])
retrievals = interpolate_budget(
    budget,
    METRICS["budget3_retrievals"],
    METRICS["budget10_retrievals"],
)

html(
    f"""
<article class="wide-panel budget-panel">
  <p class="eyebrow">Budget Adaptivity Slider</p>
  <h3>模型不会机械耗尽预算</h3>
  <div class="grid grid-2">
    <article class="metric-card"><span>Estimated Score</span><strong>{score:.1f}</strong><p>当前预算 B = {budget}</p></article>
    <article class="metric-card"><span>Actual Retrievals</span><strong>{retrievals:.2f}</strong><p>B=3 到 B=10 线性插值展示。</p></article>
  </div>
  <p class="budget-note">当检索预算 B 从 3 增加到 10 时，模型得分从 41.0 提升到 41.8，实际检索次数仅从 1.24 增至 1.62。它根据问题难度自适应检索，在需要时检索，在足够时停止。</p>
</article>
"""
)

html(
    f"""
<span id="reflection" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Reflection</p>
    <h2>批判性思考</h2>
    <p>这篇论文真正有启发的地方，是把“检索策略”提升为模型内部可学习的认知动作。</p>
  </div>
  <div class="grid grid-2">
    <article class="card">
      <h3>优势</h3>
      <ul>{list_items(["控制接口简洁", "轨迹可解释", "检索深度自适应", "终止机制稳定", "少而准的检索优于深搜堆叠"])}</ul>
    </article>
    <article class="card">
      <h3>局限</h3>
      <ul>{list_items(["仍依赖外部检索器质量", "受 chunk、top-k 和预算设置影响", "奖励主要基于表层重合指标", "实验集中在 QA", "长文生成、企业知识库和高噪声场景验证不足"])}</ul>
    </article>
  </div>
</section>
"""
)

quadrants = [
    {
        "title": "Continuous Pretraining",
        "cn": "持续预训练",
        "traits": ["深度融合", "适合稳定领域知识", "成本高", "可能遗忘"],
        "works": "Don’t Stop Pretraining, DAPT/TAPT, Reading-comprehension-style adaptation",
        "use": "稳定垂直领域模型，语料充足且更新周期较慢的系统。",
        "risk": "训练成本高，可能带来灾难性遗忘和指令能力退化。",
    },
    {
        "title": "Retrieval-Augmented Generation",
        "cn": "检索增强生成",
        "traits": ["更新快", "可追溯", "适合企业知识库", "依赖检索质量"],
        "works": "REALM, RAG, RA-DIT, Self-triggered retrieval",
        "use": "开放域问答、企业知识库、内容经常变化的知识系统。",
        "risk": "检索错误、排序不佳、上下文过长都会影响生成质量。",
    },
    {
        "title": "Knowledge Editing",
        "cn": "知识编辑",
        "traits": ["精准修补", "适合事实更正", "批量编辑不稳定", "作用域可能外溢"],
        "works": "MEND, ROME, SERAC, FFN Memories, Knowledge Neurons",
        "use": "少量事实纠错、合规更新、已知错误知识修复。",
        "risk": "容易出现编辑干扰、作用域外溢和泛化不稳定。",
    },
    {
        "title": "Test-Time Training",
        "cn": "测试时训练",
        "traits": ["实例级适配", "动态性强", "在线反向传播成本高", "部署复杂"],
        "works": "RECKONING, TTT-NN",
        "use": "需要临时吸收上下文信息的实例级知识适配任务。",
        "risk": "在线训练延迟明显，稳定性与安全性评估困难。",
    },
]

lit_html = ""
for item in quadrants:
    lit_html += f"""
    <article class="lit-card" tabindex="0">
      <p class="eyebrow">{item["cn"]}</p>
      <h3>{item["title"]}</h3>
      <p>{" ".join(pill(trait) for trait in item["traits"])}</p>
      <div class="details">
        <p><strong>代表工作：</strong>{item["works"]}</p>
        <p><strong>适用场景：</strong>{item["use"]}</p>
        <p><strong>主要风险：</strong>{item["risk"]}</p>
      </div>
    </article>
    """

html(
    f"""
<span id="review" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Literature Map</p>
    <h2>文献综述地图</h2>
    <p>GRIP 可以放在“参数记忆、非参数记忆、局部编辑、测试时适配”这一组方法谱系中理解。</p>
  </div>
  <div class="grid grid-2">
    {lit_html}
  </div>
</section>
"""
)

html(
    f"""
<span id="fit" class="anchor"></span>
<section class="section">
  <div class="section-head">
    <p class="eyebrow">Research Fit</p>
    <h2>与智能化软件工程方向的契合</h2>
    <p>软件工程智能体面对的是持续变化的代码、文档、Issue、PR、日志与依赖版本。它需要的不只是会回答，而是会判断何时查证、查什么、查到什么程度。</p>
  </div>
  <div class="grid grid-3">
    {card("动态知识需求", "真实开发中的代码库、API 文档、运行日志和历史提交都在变化，静态参数记忆难以长期可靠。")}
    {card("检索即决策能力", "智能体需要主动判断何时查文档、查代码、查日志、查历史提交，而不是被动等待外部流程触发。")}
    {card("可解释工程轨迹", "GRIP 式控制轨迹可以记录为什么检索、检索了什么、如何停止，便于调试、审计和复盘。")}
  </div>
  <article class="wide-panel" style="margin-top:1rem;">
    <h3>后续研究思路</h3>
    <p>{pill("面向软件工程智能体的自触发检索规划")} {pill("代码审查中的证据选择与可信解释")} {pill("企业知识库场景下的动态 RAG")} {pill("多检索器协同的软件缺陷定位")} {pill("长上下文代码任务的证据压缩")}</p>
  </article>
</section>
"""
)

html(
    f"""
<span id="conclusion" class="anchor"></span>
<section class="section">
  <div class="wide-panel">
    <p class="eyebrow">Conclusion</p>
    <h3>总结</h3>
    <p>
      GRIP 的贡献不在于证明“检索越多越好”，而在于揭示更重要的方向：模型应学会管理自身的信息需求。
      它把检索触发、查询生成、证据整合和停止判断统一到生成轨迹中，为可解释、低成本、任务自适应的 RAG 系统提供了清晰范式。
      其不足也提示后续研究需要进一步面向复杂软件工程场景，评估噪声、长上下文、多工具协同和可信验证问题。
    </p>
  </div>
  <div class="footer">
    <strong>{APPLICANT["name"]}</strong> · {APPLICANT["school"]} · {APPLICANT["direction"]} · {APPLICANT["email"]}
  </div>
</section>
"""
)

export const applicant = {
  name: "徐敬研",
  school: "北京工业大学",
  direction: "智能化软件工程",
  email: "jingyanxu_2005@163.com",
};

export const navItems = [
  { label: "Overview 概览", href: "#overview" },
  { label: "Problem 问题", href: "#problem" },
  { label: "Method 方法", href: "#method" },
  { label: "Experiments 实验", href: "#experiments" },
  { label: "Review 综述", href: "#review" },
  { label: "Reflection 思考", href: "#reflection" },
];

export const paper = {
  title: "Retrieval as Generation",
  subtitle: "A Unified Framework with Self-Triggered Information Planning",
  venue: "ACL 2026",
  tags: ["RAG", "Information Planning", "Self-Triggered Retrieval", "Open-domain QA"],
};

export const overviewCards = [
  {
    index: "01",
    title: "Paper",
    body: ["Retrieval as Generation", "A Unified Framework with Self-Triggered Information Planning", "ACL 2026"],
  },
  {
    index: "02",
    title: "Core Question",
    body: ["模型什么时候应该检索？", "应该检索什么？", "什么时候应该停止？"],
  },
  {
    index: "03",
    title: "Key Insight",
    body: ["GRIP 将检索控制嵌入自回归解码过程，让检索从外部流程变成可学习的生成行为。"],
  },
];

export const traditionalRag = {
  title: "Traditional RAG",
  steps: ["Question", "One-shot Retrieval", "Generation"],
  notes: ["信息缺口在推理中逐步暴露", "检索时机依赖外部启发式", "查询改写与终止判断难统一", "错误难归因", "策略难训练"],
};

export const gripFlow = {
  title: "GRIP",
  steps: ["Question", "Generate reasoning state", "Self-trigger retrieval", "Refine query", "Integrate evidence", "Stop when solved"],
  notes: ["检索行为进入生成轨迹", "控制符统一表达状态", "检索深度随任务自适应", "终止机制可学习", "轨迹更可解释"],
};

export const controlTokens = [
  {
    token: "[INTERMEDIARY]",
    label: "阶段性理解",
    description: "表示模型当前的中间推理状态，帮助显式记录信息缺口。",
    color: "#3B82F6",
  },
  {
    token: "[RETRIEVE]",
    label: "触发检索",
    description: "触发外部检索，并生成新的查询。",
    color: "#8C1515",
  },
  {
    token: "[ANSWER]",
    label: "最终回答",
    description: "表示模型已经具备足够证据，可以进入最终回答。",
    color: "#C9A227",
  },
  {
    token: "[SOLVED]",
    label: "终止轨迹",
    description: "表示问题已经解决，生成过程结束。",
    color: "#10B981",
  },
];

export const decodingSteps = [
  {
    label: "Question",
    content: "What evidence is still missing?",
  },
  {
    label: "[INTERMEDIARY]",
    content: "The model identifies a missing fact in the current reasoning state.",
  },
  {
    label: "[RETRIEVE]",
    content: "query = \"targeted evidence for the missing fact\"",
  },
  {
    label: "Evidence",
    content: "Retrieved passages are folded back into the context.",
  },
  {
    label: "[ANSWER]",
    content: "The model integrates evidence and generates the final answer.",
  },
  {
    label: "[SOLVED]",
    content: "The trajectory terminates.",
  },
];

export const trainingCards = [
  {
    title: "Supervised Fine-Tuning",
    value: "40K",
    unit: "structured trajectories",
    items: ["Direct Answer", "Retrieval Needed", "Multi-hop Planning", "Answer Integration"],
    description: "先通过结构化轨迹让模型学习控制符的基本使用方式，覆盖直接回答、需要检索、多跳规划和答案整合等场景。",
  },
  {
    title: "DAPO Reinforcement Learning",
    value: "5K",
    unit: "samples",
    items: ["Answer similarity", "Control-token correctness", "Retrieval efficiency", "Stable termination"],
    description: "再通过强化学习优化回答质量、控制符正确性、检索效率和终止稳定性，抑制过度检索并形成更可靠的停止机制。",
  },
];

export const strengths = ["控制接口简洁", "轨迹可解释", "检索深度自适应", "终止机制稳定", "少而准的检索优于深搜堆叠"];

export const limitations = ["仍依赖外部检索器", "受 chunk / top-k / budget 设置影响", "奖励主要基于表层重合指标", "实验集中在 QA", "长文生成、企业知识库、高噪声场景验证不足"];

export const futureWork = ["Evidence Compression", "Trustworthiness Verification", "Multi-Retriever Collaboration", "Robust Cross-Domain Planning"];

export const literatureQuadrants = [
  {
    title: "Continuous Pretraining",
    cn: "持续预训练",
    traits: ["深度融合", "适合稳定领域知识", "成本高", "可能遗忘"],
    works: ["Don’t Stop Pretraining", "DAPT / TAPT", "Reading-comprehension-style adaptation"],
    use: "稳定垂直领域模型，领域语料充足且更新周期较慢的系统。",
    risk: "训练成本高，可能带来灾难性遗忘和指令能力退化。",
  },
  {
    title: "Retrieval-Augmented Generation",
    cn: "检索增强生成",
    traits: ["更新快", "可追溯", "适合企业知识库", "依赖检索质量"],
    works: ["REALM", "RAG", "When Not to Trust Language Models", "RA-DIT", "Self-triggered retrieval"],
    use: "开放域问答、企业知识库、内容经常变化的知识系统。",
    risk: "检索错误、排序不佳、上下文过长都会影响生成质量。",
  },
  {
    title: "Knowledge Editing",
    cn: "知识编辑",
    traits: ["精准修补", "适合事实更正", "批量编辑不稳定", "作用域可能外溢"],
    works: ["MEND", "ROME", "SERAC", "FFN Memories", "Knowledge Neurons"],
    use: "少量事实纠错、合规更新、已知错误知识修复。",
    risk: "容易出现编辑干扰、作用域外溢、泛化不稳定。",
  },
  {
    title: "Test-Time Training",
    cn: "测试时训练",
    traits: ["实例级适配", "动态性强", "在线反向传播成本高", "部署复杂"],
    works: ["RECKONING", "TTT-NN"],
    use: "实例级知识适配，需要临时吸收上下文信息的任务。",
    risk: "在线训练延迟明显，稳定性与安全性评估困难。",
  },
];

export const researchFitCards = [
  {
    title: "软件工程智能体需要动态知识",
    body: "真实开发中的代码库、Issue、PR、API 文档、日志和依赖版本都在持续变化。",
  },
  {
    title: "检索不是附加模块，而是决策能力",
    body: "智能体需要判断何时查文档、查代码、查日志、查历史提交，以及查到什么程度。",
  },
  {
    title: "可解释轨迹利于可信软件工程",
    body: "GRIP 式控制轨迹可以记录为什么检索、检索了什么、如何停止，方便调试、审计和复盘。",
  },
];

export const researchDirections = [
  "面向软件工程智能体的自触发检索规划",
  "代码审查中的证据选择与可信解释",
  "企业知识库场景下的动态 RAG",
  "多检索器协同的软件缺陷定位",
  "面向长上下文代码任务的证据压缩",
];

/* =========================================================================
   VRI Lab — site content.
   Edit this file to update people, topics and papers. No build step needed.
   Photos: put a square image in assets/img/people/<id>.jpg and set photo.
   ========================================================================= */

window.VRI = {
  topics: [
    {
      id: "world-models",
      num: "01",
      title: "World Models",
      blurb: "Agents that imagine the future before they act.",
      leads: ["ali-zia", "ali-cheraghian"],
      scene: "world",
      color: "#22c3b5"
    },
    {
      id: "lwam",
      num: "02",
      title: "Language World Action Models",
      blurb: "From words, to plans, to physical action.",
      leads: ["hamidreza-dastmalchi"],
      scene: "action",
      color: "#3d8bff"
    },
    {
      id: "mllm",
      num: "03",
      title: "Multimodal Large Language Models",
      blurb: "Pixels and tokens, reasoning in one space.",
      leads: ["abdelwahed-khamis"],
      scene: "mllm",
      color: "#7b5cff"
    },
    {
      id: "unified",
      num: "04",
      title: "Unified Large Language Models",
      blurb: "One model to understand and to generate.",
      leads: ["shafin-rahman"],
      scene: "unified",
      color: "#b14dff"
    },
    {
      id: "foundation",
      num: "05",
      title: "Foundation AI Models",
      blurb: "Foundation models for narrow domains, from vision to time series.",
      leads: ["lars-petersson"],
      scene: "foundation",
      color: "#16a3c9"
    }
  ],

  people: [
    {
      id: "lars-petersson",
      name: "Lars Petersson",
      initials: "LP",
      role: "Senior Principal Research Scientist",
      org: "CSIRO Data61",
      place: "Australia",
      focus: "Foundation AI models",
      photo: null,
      links: {
        scholar: "https://scholar.google.com.au/citations?user=32RHN4oAAAAJ",
        web: "https://people.csiro.au/P/L/Lars-Petersson"
      }
    },
    {
      id: "ali-zia",
      name: "Ali Zia",
      initials: "AZ",
      role: "Research Fellow",
      org: "La Trobe University",
      place: "Australia",
      focus: "World models · Topological deep learning",
      photo: "assets/img/people/ali-zia.jpg",
      links: {
        scholar: "https://scholar.google.com/citations?user=BVBJ06QAAAAJ",
        web: "https://www.ali-zia.me",
        github: "https://github.com/alizia369",
        linkedin: "https://www.linkedin.com/in/ali-zia-0411b123/"
      }
    },
    {
      id: "ali-cheraghian",
      name: "Ali Cheraghian",
      initials: "AC",
      role: "Senior AI/ML Scientist",
      org: "Macquarie University",
      place: "Australia",
      focus: "World models · Vision-language models",
      photo: null,
      links: {
        scholar: "https://scholar.google.com/citations?user=QT0EXIkAAAAJ",
        web: "https://alichr.github.io",
        github: "https://github.com/alichr",
        linkedin: "https://www.linkedin.com/in/ali-cheraghian/"
      }
    },
    {
      id: "shafin-rahman",
      name: "Shafin Rahman",
      initials: "SR",
      role: "Associate Professor",
      org: "North South University",
      place: "Bangladesh",
      focus: "Unified large language models",
      photo: null,
      links: {
        scholar: "https://scholar.google.com/citations?user=Pe8C-SUAAAAJ",
        web: "https://sites.google.com/site/rshafin"
      }
    },
    {
      id: "hamidreza-dastmalchi",
      name: "Hamidreza Dastmalchi",
      initials: "HD",
      role: "Researcher",
      org: "York University",
      place: "Canada",
      focus: "Language world action models",
      photo: null,
      links: {
        github: "https://github.com/hamidreza-dastmalchi",
        web: "https://dblp.org/pid/96/9793.html"
      }
    },
    {
      id: "abdelwahed-khamis",
      name: "Abdelwahed Khamis",
      initials: "AK",
      role: "Research Scientist",
      org: "CSIRO Data61",
      place: "Australia",
      focus: "Multimodal LLMs · Radar perception",
      photo: null,
      links: {
        scholar: "https://scholar.google.com.au/citations?user=nj2jJB0AAAAJ",
        web: "https://abdelwahed.github.io",
        linkedin: "https://au.linkedin.com/in/abdelwahed-khamiss"
      }
    }
  ],

  /* Selected work by VRI members. members[] marks whose names to highlight.
     img: a figure from the paper; leave null to draw a generated cover. */
  papers: [
    {
      title: "Topology-Aware Optimal Transport for Source-Free Test-Time Adaptation in Anomaly Segmentation",
      short: "TopoOT",
      venue: "NeurIPS 2026",
      authors: "A. Zia, U. Ali, A. Khamis, M. U. Ramzan, A. Rehman, W. Xiang",
      img: "assets/img/work/topoot.webp",
      links: { arXiv: "https://arxiv.org/abs/2601.20333", code: "https://github.com/alizia369/TopoOT" }
    },
    {
      title: "DTO-KD: Dynamic Trade-off Optimization for Effective Knowledge Distillation",
      short: "DTO-KD",
      venue: "ICLR 2026 · Oral",
      authors: "A. Cheraghian et al.",
      img: null,
      seed: 7,
      links: { page: "https://alichr.github.io" }
    },
    {
      title: "Learning Structurally Consistent Representations for Multi-view Radar Semantic Segmentation",
      short: "HyperRadar",
      venue: "ECCV 2026",
      authors: "A. Zia, M. U. Ramzan, A. Khamis, U. Ali, A. Rehman",
      img: "assets/img/work/hyperradar.webp",
      links: { arXiv: "https://arxiv.org/abs/2606.31609", code: "https://github.com/alizia369/HyperRadar" }
    },
    {
      title: "Fighting Hallucinations with Counterfactuals: Diffusion-Guided Perturbations for LVLM Hallucination Suppression",
      short: "Counterfactuals",
      venue: "CVPR 2026",
      authors: "A. Cheraghian et al.",
      img: null,
      seed: 3,
      links: { page: "https://alichr.github.io" }
    },
    {
      title: "Learning Topology-Aware Representations via Test-Time Adaptation for Anomaly Segmentation",
      short: "TopoTTA",
      venue: "IEEE TPAMI 2026",
      authors: "A. Zia, U. Ali, A. Rehman, U. Ramzan, K. Han, M. Faheem, S. Qureshi, W. Xiang",
      img: "assets/img/work/topotta.webp",
      links: { paper: "https://doi.org/10.1109/TPAMI.2026.3710196", code: "https://github.com/alizia369/TopoTTA", project: "https://topotta.github.io" }
    },
    {
      title: "ETTA: Efficient Test-Time Adaptation for Vision-Language Models through Dynamic Embedding Updates",
      short: "ETTA",
      venue: "BMVC 2025",
      authors: "H. Dastmalchi, A. An, A. Cheraghian",
      img: null,
      seed: 11,
      links: { arXiv: "https://arxiv.org/abs/2508.05898", code: "https://github.com/hamidreza-dastmalchi/ETTA" }
    },
    {
      title: "Test-Time Adaptation of 3D Point Clouds via Denoising Diffusion Models",
      short: "3D-TTA",
      venue: "WACV 2025",
      authors: "H. Dastmalchi, A. An, A. Cheraghian, S. Rahman, S. Ramasinghe",
      img: null,
      seed: 21,
      links: { arXiv: "https://arxiv.org/abs/2411.14495" }
    },
    {
      title: "Topological Deep Learning: A Review of an Emerging Paradigm",
      short: "TDL Review",
      venue: "Artificial Intelligence Review 2024",
      authors: "A. Zia, A. Khamis, J. Nichols, U. B. Tayab, Z. Hayder, et al.",
      img: "assets/img/work/tdl-review.webp",
      links: { paper: "https://link.springer.com/article/10.1007/s10462-024-10710-9", arXiv: "https://arxiv.org/abs/2302.03836" }
    },
    {
      title: "Semantic-aware Knowledge Distillation for Few-Shot Class-Incremental Learning",
      short: "Semantic KD",
      venue: "CVPR 2021",
      authors: "A. Cheraghian, S. Rahman, P. Fang, S. K. Roy, L. Petersson, M. Harandi",
      img: null,
      seed: 5,
      links: { arXiv: "https://arxiv.org/abs/2103.04059" }
    },
    {
      title: "Zero-Shot Object Detection: Joint Recognition and Localization of Novel Concepts",
      short: "ZSD",
      venue: "IJCV 2020",
      authors: "S. Rahman, S. H. Khan, F. Porikli",
      img: null,
      seed: 13,
      links: { page: "https://sites.google.com/site/rshafin" }
    }
  ],

  /* Names to highlight in author lists. */
  memberNames: ["A. Zia", "A. Cheraghian", "S. Rahman", "H. Dastmalchi", "A. Khamis", "L. Petersson"],

  venues: ["CVPR", "ICCV", "ECCV", "NeurIPS", "ICLR", "ICML", "WACV", "BMVC", "TPAMI", "TIP", "TMLR", "Pattern Recognition", "DICTA"],

  activities: [
    { icon: "compass", title: "New directions", owner: "Hamidreza" },
    { icon: "mic", title: "Workshops & tutorials", owner: "Ali Z." },
    { icon: "grant", title: "Grants", owner: "Shafin" },
    { icon: "trophy", title: "Kaggle challenges", owner: "Abdelwahed" },
    { icon: "globe", title: "Website", owner: "Ali C." },
    { icon: "chat", title: "Discord community", owner: "Ali C." },
    { icon: "building", title: "Non-profit institute", owner: "Shafin" }
  ],

  roadmap: [
    { when: "Now – 2027", what: "Launch website & Discord. Start the five 2027 topics. First submissions, workshop, tutorial and Kaggle proposals, grant applications." },
    { when: "2028 – 2029", what: "Establish VRI as a non-profit organisation and research institute." }
  ],

  links: {
    github: "https://github.com/VRI-Lab",
    discord: null
  }
};

/* =========================================================================
   VRI Lab — site content.
   Edit this file to update people, topics and papers. No build step needed.
   Photos: put a square image in assets/img/people/<id>.jpg and set photo.
   ========================================================================= */

window.VRI = {
  mission: "From models to brain: we build visual AI that predicts, grounds, adapts and acts, closing the gap between today's models and the intelligence of the brain.",

  /* Philosophy: each principle pairs a capability with the brain system that inspires it.
     scene = which animation draws on the tile. */
  principles: [
    {
      title: "Prediction",
      text: "World models that imagine consequences, as the hippocampus and cerebellum do.",
      brain: "Hippocampus · Cerebellum",
      scene: "world",
      color: "#22c3b5"
    },
    {
      title: "Grounding",
      text: "Multimodal models that check language against what they see, as association cortex does.",
      brain: "Association cortex",
      scene: "mllm",
      color: "#7b5cff"
    },
    {
      title: "Action",
      text: "Models that turn instructions into plans and movement, through language, planning and motor pathways.",
      brain: "Language · Prefrontal · Motor",
      scene: "action",
      color: "#3d8bff"
    },
    {
      title: "Shared machinery",
      text: "Unified models where perceiving and imagining use the same circuits.",
      brain: "Visual cortex, seeing & imagining",
      scene: "unified",
      color: "#b14dff"
    },
    {
      title: "Specialised senses",
      text: "Foundation models for radar, spectral and time-series data, like dedicated sensory cortex.",
      brain: "Sensory cortices",
      scene: "foundation",
      color: "#16a3c9"
    },
    {
      title: "Adaptation",
      text: "Learning on the fly when conditions shift, as the brain recalibrates without labels.",
      brain: "Recalibration without labels",
      scene: "adapt",
      color: "#2fd39a"
    }
  ],

  approach: [
    { icon: "brain", title: "Brain-inspired, not brain-copied", text: "Principles from neuroscience become engineering targets we can measure." },
    { icon: "flask", title: "Rigorous and open", text: "Strong baselines, honest evaluation, and code released with our papers." },
    { icon: "globe", title: "Built for the real world", text: "Radar, spectral, medical and field data, where models usually break." }
  ],

  people: [
    {
      id: "lars-petersson",
      name: "Lars Petersson",
      initials: "LP",
      role: "Senior Principal Research Scientist",
      org: "CSIRO",
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
      photo: "assets/img/people/ali-cheraghian.jpg",
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
      role: "PhD Candidate",
      org: "York University",
      place: "Canada",
      focus: "Language world action models",
      photo: null,
      links: {
        scholar: "https://scholar.google.ca/citations?user=ewOyJ3MAAAAJ",
        github: "https://github.com/hamidreza-dastmalchi"
      }
    },
    {
      id: "abdelwahed-khamis",
      name: "Abdelwahed Khamis",
      initials: "AK",
      role: "Research Scientist",
      org: "CSIRO",
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
      title: "ATLAS: Learning to Adapt LVLM Attention for Reasoning Video Segmentation",
      short: "ATLAS",
      venue: "WACV 2027",
      authors: "H. Dastmalchi, A. Cheraghian, A. An, A. Khamis, L. Petersson",
      img: null,
      seed: 2,
      links: { arXiv: "https://arxiv.org/abs/2610.24783" }
    },
    {
      title: "Topology-Aware Optimal Transport for Source-Free Test-Time Adaptation in Anomaly Segmentation",
      short: "TopoOT",
      venue: "NeurIPS 2026",
      authors: "A. Zia, U. Ali, A. Khamis, M. U. Ramzan, A. Rehman, W. Xiang",
      img: "assets/img/work/topoot.webp",
      links: { arXiv: "https://arxiv.org/abs/2601.20333", code: "https://github.com/alizia369/TopoOT", project: "https://topoot.github.io" }
    },
    {
      title: "DTO-KD: Dynamic Trade-off Optimization for Effective Knowledge Distillation",
      short: "DTO-KD",
      venue: "ICLR 2026 · Oral",
      authors: "Z. Hayder, A. Cheraghian, L. Petersson, M. Harandi, R. Hartley",
      img: null,
      seed: 7,
      links: { paper: "https://openreview.net/forum?id=QMItTyQW92" }
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
      authors: "H. Dastmalchi, A. An, A. Cheraghian, H. Barzamini",
      img: null,
      seed: 3,
      links: { arXiv: "https://arxiv.org/abs/2603.10470" }
    },
    {
      title: "Learning Topology-Aware Representations via Test-Time Adaptation for Anomaly Segmentation",
      short: "TopoTTA",
      venue: "IEEE TPAMI 2026",
      authors: "A. Zia, U. Ali, A. Rehman, M. U. Ramzan, K. Han, M. Faheem, S. Qureshi, W. Xiang",
      img: "assets/img/work/topotta.webp",
      links: { paper: "https://doi.org/10.1109/TPAMI.2026.3710196", arXiv: "https://arxiv.org/abs/2606.28268", code: "https://github.com/EngrUsmaanAli/TopoTTA", project: "https://topotta.github.io" }
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
      venue: "AI Review 2024",
      authors: "A. Zia, A. Khamis, J. Nichols, U. B. Tayab, Z. Hayder, V. Rolland, E. Stone, L. Petersson",
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
      links: { paper: "https://doi.org/10.1007/s11263-020-01355-6" }
    }
  ],

  /* Names to highlight in author lists. */
  memberNames: ["A. Zia", "A. Cheraghian", "S. Rahman", "H. Dastmalchi", "A. Khamis", "L. Petersson"],

  venues: ["CVPR", "ICCV", "ECCV", "NeurIPS", "ICLR", "ICML", "WACV", "BMVC", "TPAMI", "TIP", "TMLR", "Pattern Recognition", "DICTA"],

  /* Community & resources */
  activities: [
    { icon: "mic", title: "Workshops & tutorials", text: "At DICTA 2027, CVPR, ICCV and ICML." },
    { icon: "trophy", title: "Kaggle challenges", text: "Open benchmarks for the community." },
    { icon: "code", title: "Open code", text: "Implementations released on GitHub.", href: "https://github.com/VRI-Lab" },
    { icon: "chat", title: "Discord community", text: "A place to meet, ask and build together. Launching soon." },
    { icon: "grant", title: "Joint grants", text: "Funding shared research across institutions." },
    { icon: "building", title: "A non-profit institute", text: "Planned for 2028–2029." }
  ],

  news: [
    { tag: "Nov 2026", text: "VRI Lab launches, bringing together researchers from five institutions in Australia, Bangladesh and Canada." },
    { tag: "WACV 2027", text: "ATLAS accepted, with four VRI members as co-authors." },
    { tag: "NeurIPS 2026", text: "TopoOT accepted: topology-aware optimal transport for source-free test-time adaptation in anomaly segmentation." },
    { tag: "ICLR 2026", text: "DTO-KD selected for an oral presentation." }
  ],

  roadmap: [
    { when: "Now – 2027", what: "Launch website & Discord. Start the five 2027 topics. First submissions, workshop, tutorial and Kaggle proposals, grant applications." },
    { when: "2028 – 2029", what: "Establish VRI as a non-profit organisation or institute." }
  ],

  links: {
    github: "https://github.com/VRI-Lab",
    email: "vrilab.research@gmail.com",
    discord: null
  }
};

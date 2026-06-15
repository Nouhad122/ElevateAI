import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Grammar & Spelling',
    description: 'Detects every grammar rule violation and misspelling instantly.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    title: 'AI-Powered Analysis',
    description: 'Gemini AI reads your document in context, not just word by word.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    title: 'Resume & ATS Optimization',
    description: 'Upload your resume and paste any job description. AI scores your ATS match, finds missing keywords, and generates a tailored resume PDF.',
  },
];

const services = [
  {
    badge: 'Document Corrector',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Document Corrector',
    description:
      'Upload any PDF and our AI instantly finds every grammar, spelling, and punctuation mistake — then delivers a fully corrected document.',
    cta: 'Correct My Document',
    href: '/upload',
    stats: [
      { value: '30s', label: 'Avg. time' },
      { value: '99%', label: 'Accuracy' },
      { value: 'Free', label: 'No account' },
    ],
  },
  {
    badge: 'Resume Optimizer',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    title: 'Resume Tailor & ATS Optimizer',
    description:
      'Paste a job description and upload your resume. AI scores ATS compatibility, identifies keyword gaps, and delivers a tailored PDF ready to submit.',
    cta: 'Tailor My Resume',
    href: '/resume-tailor',
    stats: [
      { value: 'ATS', label: 'Score check' },
      { value: 'Keywords', label: 'Gap analysis' },
      { value: 'Free', label: 'No account' },
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      {/* Hero */}
      <section className="text-center py-20 md:py-28">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          Powered by Gemini AI
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
          AI tools that elevate<br />
          <span className="text-blue-600">your professional work</span>
        </h1>
        <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto">
          Correct grammar mistakes in seconds or tailor your resume to any job — all powered by AI, completely free, no sign-up required.
        </p>
      </section>

      {/* Service cards */}
      <section className="grid md:grid-cols-2 gap-6 pb-16">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-3xl ring-1 ring-black/5 shadow-xl shadow-slate-100/80 overflow-hidden flex flex-col"
          >
            <div className="px-8 pt-8 pb-6 flex-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold mb-5 text-blue-600 bg-blue-50 border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-500" />
                {s.badge}
              </span>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {s.icon}
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">{s.title}</h2>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-6">{s.description}</p>

              <div className="grid grid-cols-3 gap-3">
                {s.stats.map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm font-bold text-gray-900">{value}</span>
                    <span className="text-[11px] text-gray-500 mt-0.5">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 pb-8 pt-4">
              <Link to={s.href}>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200/60 transition-all duration-150 cursor-pointer">
                  {s.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-3 gap-6 pb-20">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {f.icon}
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.description}</p>
          </div>
        ))}
      </section>

    </div>
  );
}

import React from 'react';

const InfographicContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 not-prose">
    <h3 className="mb-6 text-center text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h3>
    <div className="flex flex-col items-center justify-around gap-8 md:flex-row">
      {children}
    </div>
  </div>
);

const Step: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center gap-2 text-center max-w-xs">
    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
    <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

export const DailyRoutineInfographic: React.FC = () => (
  <InfographicContainer title="The 3 Pillars of Oral Hygiene">
    <Step 
      icon={<span className="material-symbols-outlined !text-4xl">brush</span>}
      title="1. Brush"
      description="Twice a day for 2 minutes with fluoride toothpaste. Use gentle, circular motions."
    />
     <div className="w-16 border-t-2 border-dashed border-slate-300 dark:border-slate-700 md:hidden"></div>
    <Step 
      icon={<span className="material-symbols-outlined !text-4xl">cleaning_services</span>}
      title="2. Floss"
      description="Once a day to clean between teeth where your brush can't reach."
    />
     <div className="w-16 border-t-2 border-dashed border-slate-300 dark:border-slate-700 md:hidden"></div>
    <Step 
      icon={<span className="material-symbols-outlined !text-4xl">water_drop</span>}
      title="3. Rinse"
      description="Use an antimicrobial mouthwash to reduce plaque and freshen breath."
    />
  </InfographicContainer>
);


const Stage: React.FC<{ title: string; color: string; symptoms: string[]; children: React.ReactNode }> = ({ title, color, symptoms, children }) => (
    <div className="relative flex flex-col items-center gap-3 text-center w-full max-w-[200px]">
        <div className="relative">
            {children}
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white`} style={{ backgroundColor: color }}>
                {title}
            </div>
        </div>
        <ul className="mt-2 list-none space-y-1 text-left text-sm text-slate-600 dark:text-slate-400">
            {symptoms.map(symptom => (
                <li key={symptom} className="flex items-start gap-2">
                    <span className="material-symbols-outlined !text-base text-primary/80 mt-0.5">check_circle</span>
                    <span>{symptom}</span>
                </li>
            ))}
        </ul>
    </div>
);


export const GumDiseaseInfographic: React.FC = () => (
  <InfographicContainer title="Stages of Gum Disease">
    <div className="relative flex w-full flex-col items-start justify-between gap-16 md:flex-row md:items-center md:gap-4">
        {/* Arrow Line */}
        <div className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 border-t-2 border-dashed border-slate-300 dark:border-slate-700 md:block"></div>
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 border-l-2 border-dashed border-slate-300 dark:border-slate-700 md:hidden"></div>

        <Stage title="Healthy Gums" color="#22c55e" symptoms={['Pink and firm', 'No bleeding']}>
            <svg viewBox="0 0 100 80" className="h-24 w-auto drop-shadow-sm"><path d="M10 80 C 10 40, 90 40, 90 80" fill="#fecaca"></path><path d="M20,80 Q50,50 80,80" fill="#fda4af"></path><rect x="35" y="20" width="30" height="60" fill="white" rx="5"></rect></svg>
        </Stage>

        <Stage title="Gingivitis" color="#f97316" symptoms={['Red, swollen', 'Bleeding gums']}>
             <svg viewBox="0 0 100 80" className="h-24 w-auto drop-shadow-sm"><path d="M10 80 C 10 40, 90 40, 90 80" fill="#ef4444"></path><path d="M20,80 Q50,50 80,80" fill="#dc2626"></path><rect x="35" y="20" width="30" height="60" fill="white" rx="5"></rect></svg>
        </Stage>

        <Stage title="Periodontitis" color="#dc2626" symptoms={['Pocket formation', 'Bone loss', 'Loose teeth']}>
             <svg viewBox="0 0 100 80" className="h-24 w-auto drop-shadow-sm"><path d="M10 80 C 10 40, 90 40, 90 80" fill="#b91c1c"></path><path d="M20,80 Q50,70 80,80" fill="#991b1b"></path><rect x="35" y="30" width="30" height="50" fill="white" rx="5"></rect><rect x="30" y="70" width="40" height="5" fill="#44403c" rx="2"></rect></svg>
        </Stage>
    </div>
  </InfographicContainer>
);

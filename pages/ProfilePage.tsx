import React, { useState, useEffect } from 'react';
import type { Page, Article } from '../types';
import { Header } from '../components/Header';
import { DailyRoutineInfographic, GumDiseaseInfographic } from '../components/Infographics';
import { UserIcon } from '../components/icons';


const articles: Article[] = [
    { id: 1, title: "Mastering Your Daily Oral Care Routine", level: "Beginner", readTime: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArdABUbT4u8U__DPQ0Ojwlqv19Oz-c-WNXEKkQ3xhjGzlhCilDklncoHfQBi6-AB0sJgCq72-XMQ1cnJntnEmr8eZdriadx-mbTztB4XuvQ36b2pzTKzARtjOAHotJ8JUuEMpylZRKQF9jd9dCMjLqOMINoifdIKV0SmogOoUbXyk5uNtmR8ocZ7KolcNJ2OcGrtyQ4cw_uxaAYSKg8uLBdEG33ezcXyWIKoUfqL-RpWhyBX7VTVHPogeaAoQdIh0Doyq-TcIhegvH", content: '', infographic: DailyRoutineInfographic },
    { id: 2, title: "Understanding and Preventing Gum Disease", level: "Intermediate", readTime: 8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsR4JHe8oeMXvO1soJkCclxMuhbkmRklB66oZSbnQ_HNev5tHiK7gQdg5TJ2vL3437J55YKICbKyBvMhcwIC3WnwS-QdWjv-pnS1Xkd8Xb3jCBrPjwm2MetjLcqlWhFeyEJLNFes1zOZaA2Pvk6Yr5D6GaGSMX7_ZKDeP7RErNhFXVk9CsGtFUOKEXGfA_wcV6YQxBjFBZct2P2fgcqUTkezN_gFCnGY_5LmH5sz-OMtiInO-UBczW-5hwHjU1suk0cbGRPV6-VjxA", content: '', infographic: GumDiseaseInfographic },
    { id: 3, title: "Early Detection and Prevention of Oral Cancer", level: "Beginner", readTime: 7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlP0jq-7N95S-3Xvot1sIt6fgOp5s6mAv8hF3kdnxsy_SZNcauQ2uqrMTP4OQgyezJpYj1u6WI1RRGEKt_CAVQSIIawdzAOAsvMuCws5kPt-wDUp_J_T8oQ3EHA0vF_PuUUBfhzWI2yugm63jVGz99NYuBg_3E6G0b1LFGOUPXoiILDDjbQCs9dbLoVLXmB9JfbKQFFdCv65b3peo2XpEchA4lVu5imN83g-OXjPxZhWKNlZU5D05iXJIttGUDEk3DMauPQCC7xtnQ", content: '' },
    { id: 4, title: "Oral Health Tips for the Whole Family", level: "Beginner", readTime: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhGRQn-fXeN9U9eIOnvqZGoZS8mgj8-gTjKxI7qGLp_Islhs7UKfDqoRtJroJfw4Tn-ITnQEDYZA50CsClBXgFWmjWJg8FSzBKAl4cTTByybwRw1E7l6cQgzMh4irrf-JwgQDOKAC9L4dnHTP9i7-pK65J1SYaE7QTbuC_2vY_xQApB2JHaxAsr9VssVyUY0BQxPn96C6LVACjrcDmjqbQV_FNAUJzJ6aRBiQkvAkhQNI7-ZSiDbsv3vPV-HSIR8z1IwRk4YfaekG0", content: '' },
    { id: 5, title: "Preventing Cavities and Tooth Decay", level: "Beginner", readTime: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWBijDDXsw5Z1mEGiENHPVMUZii1WRvWPgXTV_mSCMRFe32q9GUoaHCJLMwutVovis25b-D_iD8J3LkcptAMP34dysjedHAwokVVeSF3qJnprZPK-iiJJTBfkpdeyUHIvAPUl3bYPK48027MCYdGxyOkJxXqSOed84U8v7pPFP7_G0eLF5R89J4N4zNzsVcrfAtNY_Ann9DFWQ3ki8BT9p9XnrbiNCr5HXhL8fWyfNfFOyYhDBtScuYu7IMTQPtnhB_8JwmwQDBhA", content: '' }
];

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadSavedArticles = () => {
        try {
            const savedIds: number[] = JSON.parse(localStorage.getItem('savedArticles') || '[]');
            const userSavedArticles = articles.filter(article => savedIds.includes(article.id));
            setSavedArticles(userSavedArticles);
        } catch (error) {
            console.error("Failed to load saved articles for profile:", error);
            localStorage.removeItem('savedArticles');
            setSavedArticles([]);
        }
    };

    loadSavedArticles();
  }, []);
  
  const handleViewSavedArticles = () => {
      localStorage.setItem('initialLearnView', 'saved');
      onNavigate('learn');
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header onNavigate={onNavigate} currentPage="profile" />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">Your Profile</h1>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 text-center">
                  <div className="relative inline-block">
                    <div className="size-24 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <UserIcon className="w-16 h-16" />
                    </div>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">John Doe</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">johndoe@example.com</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-8">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Saved Articles</h3>
                             {savedArticles.length > 0 && (
                                <button onClick={handleViewSavedArticles} className="text-sm font-medium text-primary hover:underline">View All</button>
                             )}
                        </div>
                        {savedArticles.length > 0 ? (
                            <div className="space-y-4">
                                {savedArticles.slice(0, 3).map(article => (
                                     <div key={article.id} className="flex items-center gap-4 cursor-pointer" onClick={handleViewSavedArticles}>
                                        <img src={article.image} alt={article.title} className="size-16 rounded-lg object-cover"/>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-200">{article.title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{article.level} · {article.readTime} min read</p>
                                        </div>
                                     </div>
                                ))}
                            </div>
                        ) : (
                             <div className="text-center py-8">
                                <p className="text-slate-500 dark:text-slate-400">You haven't saved any articles yet.</p>
                                <button onClick={() => onNavigate('learn')} className="mt-4 text-sm font-medium text-primary hover:underline">Browse Articles</button>
                            </div>
                        )}
                    </div>
                     <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Symptom History</h3>
                            <button onClick={() => onNavigate('tracker')} className="text-sm font-medium text-primary hover:underline">View Tracker</button>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">Keep a log of your oral health symptoms to monitor changes over time. Your recent logs will appear here.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
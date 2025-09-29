import React, { useState, useCallback, useEffect } from 'react';
import type { Page, Article } from '../types';
import { Header } from '../components/Header';
import { DailyRoutineInfographic, GumDiseaseInfographic } from '../components/Infographics';

interface ArticleDetailViewProps {
    article: Article;
    onBack: () => void;
    isSaved: boolean;
    onToggleSave: (id: number) => void;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ article, onBack, isSaved, onToggleSave }) => {
    const contentParts = article.content.split('\n\n');
    const firstParagraph = contentParts[0];
    const restOfContent = contentParts.slice(1);

    const fontSizes = ['sm', 'base', 'lg', 'xl'];
    const [fontSize, setFontSize] = useState('base');

    const handleFontSizeChange = useCallback((direction: 'increase' | 'decrease') => {
        const currentIndex = fontSizes.indexOf(fontSize);
        if (direction === 'increase' && currentIndex < fontSizes.length - 1) {
            setFontSize(fontSizes[currentIndex + 1]);
        } else if (direction === 'decrease' && currentIndex > 0) {
            setFontSize(fontSizes[currentIndex - 1]);
        }
    }, [fontSize, fontSizes]);

    const isMinSize = fontSizes.indexOf(fontSize) === 0;
    const isMaxSize = fontSizes.indexOf(fontSize) === fontSizes.length - 1;

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <button onClick={onBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary mb-8 font-medium">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to all articles
                </button>
                <img src={article.image} alt={article.title} className="w-full h-64 md:h-80 object-cover rounded-xl mb-6" />
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">{article.title}</h1>
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8">
                    <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-300`}>{article.level}</span>
                        <span>·</span>
                        <span>{article.readTime} min read</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <button onClick={() => onToggleSave(article.id)} className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${isSaved ? 'text-primary' : ''}`} aria-label={isSaved ? 'Unsave article' : 'Save article'}>
                            <span className="material-symbols-outlined">{isSaved ? 'bookmark' : 'bookmark_border'}</span>
                        </button>
                        <button onClick={() => handleFontSizeChange('decrease')} disabled={isMinSize} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Decrease font size">
                            <span className="material-symbols-outlined">text_decrease</span>
                        </button>
                        <button onClick={() => handleFontSizeChange('increase')} disabled={isMaxSize} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Increase font size">
                            <span className="material-symbols-outlined">text_increase</span>
                        </button>
                    </div>
                </div>
                <div className={`prose dark:prose-invert prose-${fontSize} max-w-none text-slate-700 dark:text-slate-300`}>
                   <p>{firstParagraph}</p>
                   {article.infographic && <article.infographic />}
                   {restOfContent.map((paragraph, index) => {
                     if (paragraph.startsWith('### ')) {
                       return <h3 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('### ', '')}</h3>
                     }
                     return <p key={index}>{paragraph}</p>
                   })}
                </div>
            </div>
        </div>
    );
};

const articles: Article[] = [
    { id: 1, title: "Mastering Your Daily Oral Care Routine", level: "Beginner", readTime: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArdABUbT4u8U__DPQ0Ojwlqv19Oz-c-WNXEKkQ3xhjGzlhCilDklncoHfQBi6-AB0sJgCq72-XMQ1cnJntnEmr8eZdriadx-mbTztB4XuvQ36b2pzTKzARtjOAHotJ8JUuEMpylZRKQF9jd9dCMjLqOMINoifdIKV0SmogOoUbXyk5uNtmR8ocZ7KolcNJ2OcGrtyQ4cw_uxaAYSKg8uLBdEG33ezcXyWIKoUfqL-RpWhyBX7VTVHPogeaAoQdIh0Doyq-TcIhegvH", content: `A strong oral hygiene routine is your first line of defense against common dental problems like cavities and gum disease. It's about more than just a quick brush; it's a consistent, detailed practice that uses the correct techniques and tools to keep your mouth, teeth, and gums healthy. Establishing this routine is one of the best investments you can make in your overall health.

### The Art of Brushing
Brushing is the cornerstone of oral hygiene, but technique is everything. The goal is to remove plaque—a sticky film of bacteria—without damaging your gums or enamel.

Technique: Most dental professionals recommend the Bass technique. Hold your toothbrush at a 45-degree angle to the gums. Use gentle, short, circular strokes to clean the outer and inner surfaces of your teeth. For the chewing surfaces, use a firm back-and-forth motion. Don't forget to brush your tongue to remove bacteria that cause bad breath. The entire process should take two full minutes. To ensure you're not rushing, try using a timer or an electric toothbrush with a built-in timer.

Tools: Choose a soft-bristled toothbrush that fits your mouth comfortably. Hard bristles can damage tooth enamel and irritate the gums. Whether you choose a manual or electric toothbrush is a matter of personal preference, though many find electric brushes more effective at plaque removal due to their rotating or vibrating heads. Replace your toothbrush or brush head every three to four months, or sooner if the bristles become frayed. A worn-out toothbrush won't clean your teeth effectively.

Toothpaste: Always use a toothpaste that contains fluoride. Fluoride is a natural mineral that strengthens tooth enamel and helps reverse the early stages of tooth decay. There are many varieties available—for tartar control, sensitivity, whitening, etc. Choose one that suits your specific needs.

### The Necessity of Flossing
Flossing is not optional; it's as crucial as brushing. It cleans the approximately 35% of your tooth surface that your toothbrush can't reach, specifically between the teeth and under the gumline.

Technique: Use about 45cm of floss. Wrap most of it around one middle finger, and a small amount around the other. Gently guide the floss between your teeth. When you reach the gumline, curve it into a 'C' shape against one tooth and slide it gently into the space between the gum and the tooth. Scrape the side of the tooth, moving the floss away from the gum. Use a clean section of floss for each tooth.

Tools: If traditional floss is difficult for you to use, there are alternatives. Floss picks are disposable and easy to handle. Water flossers use a stream of pressurized water to remove plaque and food particles. Interdental brushes are small, specially designed brushes that fit between the teeth. Find the tool that you will use consistently.

### Rinsing with Mouthwash
An antimicrobial or fluoride mouthwash can be a beneficial final step. It can help reduce plaque, prevent or reduce gingivitis, slow the development of tartar, and freshen your breath. However, mouthwash is a supplement to, not a replacement for, brushing and flossing. Swish it around your mouth for 30-60 seconds as per the product instructions.

By dedicating just a few minutes each morning and night to this comprehensive routine, you can prevent most dental issues and maintain a healthy, confident smile for life.`, infographic: DailyRoutineInfographic },
    { id: 2, title: "Understanding and Preventing Gum Disease", level: "Intermediate", readTime: 8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsR4JHe8oeMXvO1soJkCclxMuhbkmRklB66oZSbnQ_HNev5tHiK7gQdg5TJ2vL3437J55YKICbKyBvMhcwIC3WnwS-QdWjv-pnS1Xkd8Xb3jCBrPjwm2MetjLcqlWhFeyEJLNFes1zOZaA2Pvk6Yr5D6GaGSMX7_ZKDeP7RErNhFXVk9CsGtFUOKEXGfA_wcV6YQxBjFBZct2P2fgcqUTkezN_gFCnGY_5LmH5sz-OMtiInO-UBczW-5hwHjU1suk0cbGRPV6-VjxA", content: `Periodontal (gum) disease is a serious infection that damages the soft tissue and, without treatment, can destroy the bone that supports your teeth. It's a leading cause of tooth loss in adults, yet it often develops silently, with few symptoms in its early stages. Understanding the disease's progression, risk factors, and prevention strategies is key to protecting your oral health.

### Stage 1: Gingivitis
Gum disease begins with plaque, a sticky, colorless film of bacteria that constantly forms on your teeth. If plaque is not removed by daily brushing and flossing, it produces toxins that can irritate the gum tissue, causing gingivitis.

Gingivitis is the earliest and mildest form of periodontal disease. Hallmarks of this stage include gums that are red, swollen, and bleed easily, especially during brushing or flossing. You might also notice some tenderness or persistent bad breath. The good news is that at this stage, the disease is completely reversible. The bone and connective tissue holding the teeth in place have not yet been affected. Professional treatment (a thorough cleaning) and a diligent home care routine can usually restore your gums to a healthy state.

### Stage 2: Periodontitis
If gingivitis is left untreated, it can advance to periodontitis. At this stage, the inner layer of the gum and bone pull away from the teeth and form pockets. These small spaces between teeth and gums collect debris and can become infected.

The body's immune system fights the bacteria as the plaque spreads and grows below the gumline. Toxins produced by the bacteria and the body's "good" enzymes involved in fighting infections start to break down the bone and connective tissue that hold teeth in place. As the disease progresses, the pockets deepen and more gum tissue and bone are destroyed. This can lead to teeth becoming loose, and eventually, they may need to be removed. Symptoms of periodontitis include swollen, bright red or purplish gums; gums that feel tender when touched; new spaces developing between your teeth; persistent bad breath; a bad taste in your mouth; painful chewing; and changes in the way your teeth fit together when you bite.

### Key Risk Factors
While plaque is the primary cause, several other factors can increase your risk of developing gum disease:

Smoking/Tobacco Use: This is one of the most significant risk factors. Smoking weakens your immune system, making it harder to fight off a gum infection. It also makes treatment less effective.

Diabetes: People with diabetes are at a higher risk for developing infections, including gum disease.

Hormonal Changes: Fluctuations in hormones during puberty, pregnancy, and menopause can make gums more sensitive and susceptible to gingivitis.

Medications: Some drugs can reduce the flow of saliva, which has a protective effect on the mouth. A dry mouth allows plaque to build up more easily.

Genetics: Some people are simply more genetically prone to severe gum disease.

### Prevention and Treatment
Prevention is your most powerful tool. This involves a robust daily routine of brushing twice a day and flossing daily to control plaque. It is also essential to have regular dental check-ups and professional cleanings, typically once or twice a year. During a cleaning, your dentist or hygienist will remove plaque and tartar (hardened plaque) that you can't remove at home.

If periodontitis develops, treatment will depend on the severity. Early-stage treatment often involves a deep-cleaning procedure called scaling and root planing. Scaling means scraping off tartar from above and below the gumline. Root planing gets rid of rough spots on the tooth root where germs gather and helps remove bacteria that contribute to the disease. In more advanced cases, surgical treatments may be necessary. By understanding the risks and committing to preventative care, you can significantly reduce your chances of developing this damaging disease.`, infographic: GumDiseaseInfographic },
    { id: 3, title: "Early Detection and Prevention of Oral Cancer", level: "Beginner", readTime: 7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlP0jq-7N95S-3Xvot1sIt6fgOp5s6mAv8hF3kdnxsy_SZNcauQ2uqrMTP4OQgyezJpYj1u6WI1RRGEKt_CAVQSIIawdzAOAsvMuCws5kPt-wDUp_J_T8oQ3EHA0vF_PuUUBfhzWI2yugm63jVGz99NYuBg_3E6G0b1LFGOUPXoiILDDjbQCs9dbLoVLXmB9JfbKQFFdCv65b3peo2XpEchA4lVu5imN83g-OXjPxZhWKNlZU5D05iXJIttGUDEk3DMauPQCC7xtnQ", content: `Oral cancer is a serious disease that can affect any part of the mouth and surrounding tissues. While it can be life-threatening, it is highly treatable if detected early. This makes regular self-examinations and professional screenings absolutely essential for your health and peace of mind.

### What is Oral Cancer?
Oral cancer includes cancers of the lips, tongue, cheeks, floor of the mouth, hard and soft palate, sinuses, and pharynx (throat). Most oral cancers are squamous cell carcinomas, which begin in the flat, scale-like cells that line the mouth and throat. Early detection dramatically increases the chances of successful treatment.

### How to Perform a Monthly Self-Exam
A thorough self-exam takes only a few minutes and can be a lifesaver. Using a bright light and a mirror, follow these steps:

1. Face and Neck: Look at your face and neck in the mirror. Check for any lumps, bumps, or swellings that are only on one side. Press along the sides and front of your neck to feel for any tenderness or lumps.

2. Lips: Pull your lips up and down to look for any sores or color changes on the inside.

3. Cheeks: Open your mouth and pull your cheeks out, one side at a time, to inspect the inside surface for any red, white, or dark patches.

4. Roof of the Mouth: Tilt your head back and open your mouth wide to see the roof of your mouth. Feel for any lumps or unusual spots.

5. Tongue: Stick out your tongue and look at all surfaces—top, bottom, and sides. Gently pull your tongue to each side to get a clear view. Look for any swelling, color changes, or sores.

6. Floor of the Mouth: Look at the floor of your mouth and underneath your tongue. Press gently with one finger to feel for any lumps or swellings.

### Signs and Symptoms to Watch For
Be vigilant for any of the following symptoms. If they persist for more than two weeks, see a dentist or doctor immediately.

• A sore, ulcer, or irritation in the mouth that does not heal.
• Red or white patches (leukoplakia or erythroplakia).
• Pain, tenderness, or numbness anywhere in the mouth or on the lips.
• A lump, thickening, rough spot, crust, or small eroded area.
• Difficulty chewing, swallowing, speaking, or moving the jaw or tongue.
• A change in the way your teeth fit together when you bite down.

### Major Risk Factors
While oral cancer can affect anyone, certain factors significantly increase your risk:

Tobacco Use: This is the single largest risk factor. All forms of tobacco—cigarettes, cigars, pipes, and smokeless tobacco—dramatically increase your risk.

Alcohol Consumption: Heavy alcohol use is another major risk factor. The combination of tobacco and alcohol is particularly dangerous.

Human Papillomavirus (HPV): Certain strains of HPV are a known cause of cancers in the back of the throat (oropharyngeal cancer).

Sun Exposure: Frequent and prolonged exposure to the sun can cause cancer on the lips.

Poor Diet: A diet low in fruits and vegetables may increase your risk.

### The Role of Your Dentist
Regular dental check-ups are your best defense. During a routine exam, your dentist will perform a thorough oral cancer screening, looking and feeling for any abnormalities. They are trained to spot the subtle, early signs of the disease. If they find anything suspicious, they will discuss the next steps with you, which may involve a referral to a specialist for a biopsy. Prevention and early detection are key—don't underestimate the power of a simple check-up.` },
    { id: 4, title: "Oral Health Tips for the Whole Family", level: "Beginner", readTime: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhGRQn-fXeN9U9eIOnvqZGoZS8mgj8-gTjKxI7qGLp_Islhs7UKfDqoRtJroJfw4Tn-ITnQEDYZA50CsClBXgFWmjWJg8FSzBKAl4cTTByybwRw1E7l6cQgzMh4irrf-JwgQDOKAC9L4dnHTP9i7-pK65J1SYaE7QTbuC_2vY_xQApB2JHaxAsr9VssVyUY0BQxPn96C6LVACjrcDmjqbQV_FNAUJzJ6aRBiQkvAkhQNI7-ZSiDbsv3vPV-HSIR8z1IwRk4YfaekG0", content: `Good oral health is a lifelong journey, and establishing healthy habits starts from birth. Each stage of life brings unique dental needs and challenges. Here’s a guide to help you care for your family's smiles, from infants to seniors.

### Infants (0-1 Year)
Oral care begins before the first tooth even appears. After each feeding, gently wipe your baby’s gums with a clean, damp, soft cloth or a piece of gauze. This removes bacteria and helps them get used to having their mouth cleaned. When the first tooth emerges, start brushing with a soft-bristled infant toothbrush and a tiny smear of fluoride toothpaste (the size of a grain of rice). Schedule their first dental visit by their first birthday or within six months after the first tooth erupts. This "well-baby" check-up allows the dentist to spot any potential problems early and helps your child become comfortable in a dental setting. To prevent baby bottle tooth decay, never put your baby to bed with a bottle of milk, formula, or juice.

### Toddlers and Preschoolers (1-5 Years)
As more teeth come in, you can start using a pea-sized amount of fluoride toothpaste (around age 3). Supervise your children closely to make sure they spit out the toothpaste rather than swallowing it. Make brushing fun! Use a colorful toothbrush, play a two-minute song, or turn it into a game. Begin to introduce flossing as soon as two teeth touch. This is also a critical time to establish a healthy diet low in sugar. Limit sugary snacks and drinks, especially between meals.

### School-Aged Children (6-12 Years)
As your child's permanent teeth arrive, they can take on more responsibility for their own brushing, but supervision is still recommended to ensure they're doing a thorough job. This is a crucial time to consider dental sealants. Sealants are thin, protective coatings applied to the chewing surfaces of the back teeth (molars) to prevent decay in the deep grooves. If your child plays sports, a custom-fitted mouthguard is essential to protect their teeth from injury.

### Teenagers (13-18 Years)
Teenagers face unique challenges. Orthodontic treatment (braces) is common, requiring extra diligence in cleaning around brackets and wires. Wisdom teeth may begin to emerge, which can cause pain or crowding and should be monitored by a dentist. Teens also have more control over their diet, so it's important to reinforce the risks of sugary sodas and snacks. This is also the age to discuss the serious oral health risks associated with tobacco, vaping, and oral piercings, which can cause everything from gum disease to cracked teeth and cancer.

### Adults and Older Adults
For adults, the focus is on maintenance and preventing gum disease and decay. A consistent routine of brushing and flossing is key. As we age, new issues can arise. Many medications cause dry mouth (xerostomia), which significantly increases the risk of cavities because saliva helps neutralize acid and wash away food. Staying hydrated and discussing solutions with your dentist is important. Gum recession can also expose the roots of teeth, making them more vulnerable to decay and sensitivity. If you have dentures, bridges, or implants, they require special care to keep them clean and the surrounding tissues healthy. Regular dental visits remain critical for everyone to catch problems early and maintain oral health for a lifetime.` },
    { id: 5, title: "Preventing Cavities and Tooth Decay", level: "Beginner", readTime: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWBijDDXsw5Z1mEGiENHPVMUZii1WRvWPgXTV_mSCMRFe32q9GUoaHCJLMwutVovis25b-D_iD8J3LkcptAMP34dysjedHAwokVVeSF3qJnprZPK-iiJJTBfkpdeyUHIvAPUl3bYPK48027MCYdGxyOkJxXqSOed84U8v7pPFP7_G0eLF5R89J4N4zNzsVcrfAtNY_Ann9DFWQ3ki8BT9p9XnrbiNCr5HXhL8fWyfNfFOyYhDBtScuYu7IMTQPtnhB_8JwmwQDBhA", content: `Tooth decay, or cavities (also known as dental caries), is one of the most common chronic diseases worldwide, but it is almost entirely preventable. Understanding how cavities form is the first step toward effectively preventing them.

### How a Cavity Develops
Your mouth is a dynamic environment, home to hundreds of types of bacteria. Some of these are harmful. The process of tooth decay begins when these harmful bacteria feed on the sugars and starches from the food and drinks you consume. This process creates acids.

These acids attack the hard, protective outer layer of your tooth, the enamel. This acid attack causes the enamel to lose minerals, a process called demineralization. Your body has a natural defense system: your saliva. Saliva contains minerals like calcium and phosphate that help the enamel repair itself by replenishing lost minerals, a process called remineralization.

A cavity forms when the cycle of demineralization happens more frequently than remineralization. Over time, the repeated acid attacks weaken and destroy the enamel, creating a small hole—a cavity. If left untreated, the decay can progress through the deeper layers of the tooth (dentin and pulp), causing pain, infection, and eventually, tooth loss.

### The Power of Fluoride
Fluoride is a natural mineral that is a cornerstone of cavity prevention. It works in two ways: it integrates into the tooth structure as it's developing to make the enamel more resistant to acid attacks, and it helps speed up the remineralization process to repair the very early stages of decay. Using a fluoride toothpaste is one of the most effective ways to ensure your teeth get the topical fluoride they need to stay strong. Many communities also have fluoridated tap water, which provides a constant, low-level exposure that benefits the entire population.

### The Role of Diet
What you eat and how often you eat it play a massive role in cavity development. Every time you eat or drink something sugary, the bacteria in your mouth produce acid for about 20 minutes. Therefore, frequent snacking on sugary or starchy foods throughout the day exposes your teeth to repeated acid attacks.

To protect your teeth, limit sugary drinks like sodas, sports drinks, and juices. Be mindful of sticky foods like sweets, dried fruit, and chips that can cling to teeth. It's best to consume these foods as part of a main meal rather than as snacks, as your mouth produces more saliva during a meal, which helps rinse away food particles and neutralize acids. A balanced diet rich in fruits, vegetables, and calcium-rich foods like milk and cheese will promote better oral health.

### Sealants for Extra Protection
For children and teenagers, dental sealants offer an excellent layer of protection. A sealant is a thin, plastic coating painted onto the chewing surfaces of the back teeth (molars and premolars). These teeth have deep grooves and pits that are difficult to clean and are where most cavities in children occur. The sealant acts as a barrier, "sealing out" plaque and food and preventing decay from starting.

By combining a smart diet, a diligent daily hygiene routine with fluoride, and regular visits to your dentist for check-ups and cleanings, you can win the battle against tooth decay.` }
];

interface LearnPageProps {
  onNavigate: (page: Page) => void;
}

const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedArticles');
      if (saved) {
        setSavedArticleIds(JSON.parse(saved));
      }
      
      const initialView = localStorage.getItem('initialLearnView');
      if (initialView === 'saved') {
          setActiveTab('saved');
          localStorage.removeItem('initialLearnView');
      }
    } catch (error) {
      console.error("Failed to load saved articles:", error);
    }
  }, []);

  const handleToggleSave = (id: number) => {
    setSavedArticleIds(prev => {
        const newSavedIds = prev.includes(id) 
            ? prev.filter(savedId => savedId !== id)
            : [...prev, id];
        try {
            localStorage.setItem('savedArticles', JSON.stringify(newSavedIds));
        } catch (error) {
            console.error("Failed to save articles:", error);
        }
        return newSavedIds;
    });
  };

  const getLevelColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'green';
      case 'intermediate': return 'yellow';
      default: return 'gray';
    }
  };

  const articlesToShow = activeTab === 'all' 
    ? articles
    : articles.filter(article => savedArticleIds.includes(article.id));
  
  const renderArticleList = () => (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">Learn About Oral Health</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Your comprehensive guide to a healthier smile.</p>
        </div>
        <div className="relative mb-8">
            <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"> search </span>
            <input className="w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary" placeholder="Search for articles..." type="search"/>
        </div>
        <div>
            <div className="mb-6 border-b border-slate-200 dark:border-slate-800">
                <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('all')} className={`whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium ${activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200'}`}>All Articles</button>
                    <button onClick={() => setActiveTab('saved')} className={`whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium ${activeTab === 'saved' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200'}`}>Saved Articles ({savedArticleIds.length})</button>
                </nav>
            </div>
            <div className="grid gap-8">
            {articlesToShow.length > 0 ? articlesToShow.map((article) => {
                const isSaved = savedArticleIds.includes(article.id);
                return (
                    <div key={article.id} className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-primary/10 sm:flex-row">
                        <div onClick={() => setSelectedArticle(article)} className="absolute inset-0 z-0 cursor-pointer"></div>
                        <div className="aspect-video sm:aspect-square sm:w-1/3">
                            <img alt={article.title} className="h-full w-full object-cover" src={article.image} />
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-6 sm:p-4">
                            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{article.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <span className={`inline-flex items-center gap-1.5 rounded-full bg-${getLevelColor(article.level)}-100 px-2 py-1 text-xs font-medium text-${getLevelColor(article.level)}-800 dark:bg-${getLevelColor(article.level)}-900/50 dark:text-${getLevelColor(article.level)}-300`}>{article.level}</span>
                                <span>·</span>
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleToggleSave(article.id); }} className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 transition-colors ${isSaved ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`} aria-label={isSaved ? 'Unsave article' : 'Save article'}>
                            <span className="material-symbols-outlined">{isSaved ? 'bookmark' : 'bookmark_border'}</span>
                        </button>
                    </div>
                )
            }) : (
                <div className="text-center py-16">
                    <p className="text-slate-500 dark:text-slate-400">You haven't saved any articles yet.</p>
                </div>
            )}
            </div>
        </div>
        </div>
    </div>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header onNavigate={onNavigate} currentPage="learn" />
      <main className="flex-1">
        {selectedArticle ? (
            <ArticleDetailView 
                article={selectedArticle} 
                onBack={() => setSelectedArticle(null)}
                isSaved={savedArticleIds.includes(selectedArticle.id)}
                onToggleSave={handleToggleSave}
            />
        ) : (
            renderArticleList()
        )}
      </main>
    </div>
  );
};

export default LearnPage;
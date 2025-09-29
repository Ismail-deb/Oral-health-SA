import React, { useState, useMemo } from 'react';
import type { Page, DirectoryResource } from '../types';
import { Header } from '../components/Header';

const resources: DirectoryResource[] = [
    { 
        id: "mp-chc-1", 
        name: "Mitchells Plain Community Health Centre", 
        address: "8 AZ Berman Dr, Mitchells Plain, Cape Town, 7785", 
        province: "Western Cape",
        category: "Community Health Center", 
        type: "Public Service", 
        hours: "Mon-Fri, 7:30am-4pm", 
        services: "General check-ups, cleanings, fillings, extractions, emergency care.", 
        phone: "(021) 392-5161", 
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXWc5K_lQ2h4b8k8p1e8f2s5k7h8j1a7h6d5c4b3a2g1f0e9d8c7b6a5a4b3c2d1e0f9e8d7c6b5a4b3c2d1e0f9e8d7c6b5a4b3" 
    },
    {
        id: "uwc-mp-1",
        name: "UWC Oral Health Centre - Mitchells Plain",
        address: "Melomed Centre, Symphony Walk, Town Centre, Mitchells Plain, Cape Town, 7785",
        province: "Western Cape",
        category: "Public Dental Clinic",
        type: "University Training Clinic",
        hours: "Mon-Fri, 8:30am-4pm",
        services: "Student-led check-ups, cleanings, fillings, extractions under supervision.",
        phone: "(021) 392-2450",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADemzRHULXlT3gNkH1Xkwo2fwqzhFwFxy5eZmGyMPAjOeWLQGA9YoJ7rCQv5oonqfjZdjIabyg_MbP-YaklGw1NBzHbM6igEzVoiWxtBP-d2qbqp7HusjIDzmEof2kjZR6BGXKd07fzboIbUMaU00pVMg-1BaIEak24IW4bRPSespHuKw4GPq3Op3r7LG2ZE9LJp42uIzqef1R0kao3Hy80U7zYE0e6Va-RMYbRfaPwNLoRWkhyfDpUaJjOxrmr8ThaNrzoXbMYlK0"
    },
    { 
        id: "cmjah-clinic-1", 
        name: "Charlotte Maxeke Johannesburg Academic Hospital (Dental Clinic)", 
        address: "Parktown, Johannesburg, 2193", 
        province: "Gauteng",
        category: "Public Dental Clinic", 
        type: "Public Hospital", 
        hours: "Referral-based", 
        services: "Specialized dental services, oral surgery, orthodontics, routine care.", 
        phone: "(011) 488-4911", 
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB66GFg32JY1wP_xoc3cJkXXPvM_TK2wPWvgcZ8vCroZ1DugYy5hZKTgD0wSWQR0L1JM-KDea7unneQVaWpsWqtyZvwfDPE5KzDcmu7sabEY9RPFGNwaTd-YmZEKgEOrVUsKZJs97LbV-kUhU2YJva_2U-_qOsg9uP5NvF2U460U11FdYZ1pahPowBL3dQzpFmBmV-hGKhntVSH-G1MHlI5N52Wo9_Qz8iT_y-W6v_CKaseMP-XZ_k0AJ0qAu9BuwAkdyut8EdZjwyk" 
    },
    {
        id: "tygerberg-ohc-1",
        name: "UWC Oral Health Centre (Tygerberg Hospital)",
        address: "Francie Van Zijl Dr, Tygerberg Hospital, Cape Town, 7505",
        province: "Western Cape",
        category: "Public Dental Clinic",
        type: "University Training Hospital",
        hours: "Mon-Fri, 8am-4pm",
        services: "Comprehensive dental care, specialist consultations, student-led clinics.",
        phone: "(021) 937-3000",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9_Z8Y7X6W5V4U3T2R1Q0P9O8N7M6L5K4J3I2H1G0F9E8D7C6B5A4"
    },
    {
        id: "kdhc-clinic-1",
        name: "King Dinuzulu Hospital Complex (Dental Clinic)",
        address: "Springfield, Durban, 4091",
        province: "KwaZulu-Natal",
        category: "Public Dental Clinic",
        type: "Public Hospital",
        hours: "Mon-Fri, 7:30am-4pm",
        services: "Emergency dental, extractions, fillings, and pediatric dentistry.",
        phone: "(031) 242-6000",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y2q1Q3Z4r5t6U7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8"
    },
    {
        id: "cmh-clinic-1",
        name: "Cecilia Makiwane Hospital (Dental Department)",
        address: "Billie Rd, Mdantsane Unit 4, Mdantsane, 5219",
        province: "Eastern Cape",
        category: "Public Dental Clinic",
        type: "Public Hospital",
        hours: "Mon-Fri, 8am-4pm",
        services: "General dentistry, extractions, and oral health screenings.",
        phone: "(043) 708-2111",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-z-y_x-w_v-u_t-s_r-q_p-o_n-m_l-k_j-i_h-g_f-e_d-c_b-a"
    },
    {
        id: "pah-clinic-1",
        name: "Pelonomi Academic Hospital (Oral Health Centre)",
        address: "Ashbury, Bloemfontein, 9301",
        province: "Free State",
        category: "Public Dental Clinic",
        type: "Public Hospital",
        hours: "Mon-Fri, 7:30am-4pm",
        services: "Comprehensive dental care including minor oral surgery.",
        phone: "(051) 405-1911",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB66GFg32JY1wP_xoc3cJkXXPvM_TK2wPWvgcZ8vCroZ1DugYy5hZKTgD0wSWQR0L1JM-KDea7unneQVaWpsWqtyZvwfDPE5KzDcmu7sabEY9RPFGNwaTd-YmZEKgEOrVUsKZJs97LbV-kUhU2YJva_2U"
    },
    {
        id: "pph-clinic-1",
        name: "Polokwane Provincial Hospital (Dental Clinic)",
        address: "Cnr, Dorp St, Hospital Park, Polokwane, 0699",
        province: "Limpopo",
        category: "Public Dental Clinic",
        type: "Public Hospital",
        hours: "Mon-Fri, 7:30am-4pm",
        services: "General and emergency dental services for the Limpopo province.",
        phone: "(015) 287-5000",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXWc5K_lQ2h4b8k8p1e8f2s5k7h8j1a7h6d5c4b3a2g1f0e9d8c7b6a5a4b3c2d1e0f9e8d7c6b5a4b3"
    },
    {
        id: "rfh-clinic-1",
        name: "Rob Ferreira Hospital (Dental Clinic)",
        address: "Sonheuwel, Mbombela, 1201",
        province: "Mpumalanga",
        category: "Public Dental Clinic",
        type: "Public Hospital",
        hours: "Mon-Fri, 7am-4pm",
        services: "Provides essential dental care, including extractions and fillings.",
        phone: "(013) 741-6100",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y2q1Q3Z4r5t6U7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8"
    },
    {
        id: "jsth-clinic-1",
        name: "Job Shimankana Tabane Hospital (Dental Clinic)",
        address: "Cnr Heystek and, Bosch St, Rustenburg, 0299",
        province: "North West",
        category: "Public Dental Clinic",
        type: "Public Hospital",
        hours: "Mon-Fri, 8am-4pm",
        services: "Public dental services for the Bojanala Platinum District.",
        phone: "(014) 590-5100",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-z-y_x-w_v-u_t-s_r-q_p-o_n-m_l-k_j-i_h-g_f-e_d-c_b-a"
    },
    {
        id: "rmsh-clinic-1",
        name: "Robert Mangaliso Sobukwe Hospital (Dental Clinic)",
        address: "144 Du Toitspan Rd, Memorial Road Area, Kimberley, 8301",
        province: "Northern Cape",
        category: "Public Dental Clinic",
        type: "Public Hospital",
        hours: "Mon-Fri, 8am-4pm",
        services: "Dental and oral health services for the Northern Cape.",
        phone: "(053) 802-9111",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB66GFg32JY1wP_xoc3cJkXXPvM_TK2wPWvgcZ8vCroZ1DugYy5hZKTgD0wSWQR0L1JM-KDea7unneQVaWpsWqtyZvwfDPE5KzDcmu7sabEY9RPFGNwaTd-YmZEKgEOrVUsKZJs97LbV-kUhU2YJva_2U"
    },
];

const categories = ['All', 'Public Dental Clinic', 'Community Health Center', 'Emergency Dental Service', 'NGO Healthcare Provider'];
const provinces = [
    'All Provinces', 
    'Eastern Cape', 
    'Free State', 
    'Gauteng', 
    'KwaZulu-Natal', 
    'Limpopo', 
    'Mpumalanga', 
    'North West', 
    'Northern Cape', 
    'Western Cape'
];

interface DirectoryPageProps {
  onNavigate: (page: Page) => void;
}

const DirectoryPage: React.FC<DirectoryPageProps> = ({ onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeProvince, setActiveProvince] = useState('All Provinces');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResources = useMemo(() => {
        return resources.filter(resource => {
            const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
            const matchesProvince = activeProvince === 'All Provinces' || resource.province === activeProvince || resource.province === 'Nationwide';
            const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  resource.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  resource.services.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesProvince && matchesSearch;
        });
    }, [activeCategory, activeProvince, searchTerm]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header onNavigate={onNavigate} currentPage="directory" />
            <main className="flex-1">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Oral Health Resource Directory</h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Find dental care resources near you in South Africa.</p>
                        </div>
                        <div className="relative mb-8">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">search</span>
                            <input
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 py-3 pl-12 pr-4 text-base focus:border-primary focus:ring-primary"
                                placeholder="Enter city, service, or clinic name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="province-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Province</label>
                                <select 
                                    id="province-filter"
                                    value={activeProvince}
                                    onChange={e => setActiveProvince(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 py-2.5 pl-3 pr-10 text-base focus:border-primary focus:ring-primary"
                                >
                                    {provinces.map(province => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                <select 
                                    id="category-filter"
                                    value={activeCategory}
                                    onChange={e => setActiveCategory(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 py-2.5 pl-3 pr-10 text-base focus:border-primary focus:ring-primary"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {filteredResources.length > 0 ? (
                                filteredResources.map(res => (
                                    <div key={res.id} className="bg-white dark:bg-gray-900/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="md:col-span-2">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{res.name}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">{res.address}</p>
                                                    <div className="flex flex-wrap gap-2 text-xs mb-4">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-medium ${res.isHelpline ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'}`}>
                                                            {res.type}
                                                        </span>
                                                        {res.hours && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 px-2 py-1 font-medium text-blue-700 dark:text-blue-300">
                                                                {res.hours}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">{res.services}</p>
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        <a href={`tel:${res.phone.replace(/\s/g, '')}`} className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${res.isHelpline ? 'bg-red-600 hover:bg-red-500 focus:ring-red-500/50' : 'bg-primary hover:bg-primary/90 focus:ring-primary/50'}`}>
                                                            <span className="material-symbols-outlined text-base">call</span>
                                                            Call Now
                                                        </a>
                                                        {!res.isHelpline && (
                                                            <a 
                                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${res.name}, ${res.address}`)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                                            >
                                                                <span className="material-symbols-outlined text-base">place</span>
                                                                View on Map
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-full h-40 md:h-full bg-cover bg-center rounded-lg" style={{ backgroundImage: `url("${res.image}")` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">No resources found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DirectoryPage;
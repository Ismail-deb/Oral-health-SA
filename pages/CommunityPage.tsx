import React, { useState, useEffect, useMemo } from 'react';
import type { Page, CommunityPost, CommunityReply } from '../types';
import { Header } from '../components/Header';
import { UserIcon } from '../components/icons';

interface CommunityPageProps {
  onNavigate: (page: Page) => void;
}

// --- MOCK DATA & CONFIG ---

const CURRENT_USER = {
    id: 'user-1',
    name: 'John Doe',
    avatar: null 
};

const initialPosts: CommunityPost[] = [
    {
        id: 'post-1',
        authorId: 'user-2',
        authorName: 'Jane Smith',
        authorAvatar: 'AI_AVATAR',
        title: "Does anyone have tips for dealing with sensitive teeth?",
        content: "Lately, drinking cold water has been really painful. I'm using sensitive toothpaste but it's not helping much. Any advice would be appreciated before I see my dentist next week!",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        views: 0,
        replies: [
            {
                id: 'reply-1',
                authorId: 'user-1',
                authorName: 'John Doe',
                authorAvatar: null,
                content: "I had the same issue! My dentist recommended avoiding acidic foods and drinks for a while, which seemed to help. Hope you feel better soon.",
                createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
                updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
            }
        ]
    },
    {
        id: 'post-2',
        authorId: 'user-1',
        authorName: 'John Doe',
        authorAvatar: null,
        title: "Just had my wisdom teeth removed - recovery tips?",
        content: "The procedure went well, but I'm pretty sore. What did everyone eat during their recovery? I'm already tired of soup!",
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        views: 0,
        replies: []
    }
];

// --- HELPER FUNCTIONS & COMPONENTS ---

function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " year ago" : " years ago");
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " month ago" : " months ago");
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " day ago" : " days ago");
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " hour ago" : " hours ago");
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " minute ago" : " minutes ago");
    return Math.floor(seconds) + " seconds ago";
}

const AuthorAvatar: React.FC<{ avatar: string | null; name: string; size?: string }> = ({ avatar, name, size = 'size-10' }) => {
    if (avatar) {
        return <img src={avatar} alt={name} className={`${size} rounded-full object-cover`} />;
    }
    return (
        <div className={`${size} rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400`}>
            <UserIcon className="w-3/5 h-3/5" />
        </div>
    );
};

// --- MAIN COMPONENT ---

const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [aiAvatar, setAiAvatar] = useState('');

    const [editingPost, setEditingPost] = useState<Partial<CommunityPost> | null>(null);
    const [editingReply, setEditingReply] = useState<CommunityReply | null>(null);
    const [newReplyContent, setNewReplyContent] = useState('');

    useEffect(() => {
        const storedAiAvatar = localStorage.getItem('aiAssistantAvatar');
        if (storedAiAvatar) setAiAvatar(storedAiAvatar);

        try {
            const savedPosts = localStorage.getItem('communityPosts');
            if (savedPosts) {
                setPosts(JSON.parse(savedPosts));
            } else {
                const postsWithAvatar = initialPosts.map(p => ({
                    ...p,
                    authorAvatar: p.authorAvatar === 'AI_AVATAR' ? storedAiAvatar || '' : p.authorAvatar
                }));
                setPosts(postsWithAvatar);
            }
        } catch (e) {
            console.error("Failed to load posts:", e);
            setPosts(initialPosts);
        } finally {
            setIsInitialLoad(false);
        }
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            localStorage.setItem('communityPosts', JSON.stringify(posts));
        }
    }, [posts, isInitialLoad]);

    const handleSelectPost = (postId: string) => {
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, views: p.views + 1 } : p));
        setSelectedPostId(postId);
    };
    
    const handleSavePost = (data: { title: string; content: string }) => {
        if (editingPost?.id) { // Editing existing post
            setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p));
        } else { // Creating new post
            const newPost: CommunityPost = {
                id: `post-${Date.now()}`,
                authorId: CURRENT_USER.id,
                authorName: CURRENT_USER.name,
                authorAvatar: CURRENT_USER.avatar,
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                views: 0,
                replies: []
            };
            setPosts([newPost, ...posts]);
        }
        setEditingPost(null);
    };

    const handleDeletePost = (postId: string) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            setPosts(posts.filter(p => p.id !== postId));
            setSelectedPostId(null);
        }
    };
    
    const handleAddReply = () => {
        if (!newReplyContent.trim() || !selectedPostId) return;
        const newReply: CommunityReply = {
            id: `reply-${Date.now()}`,
            authorId: CURRENT_USER.id,
            authorName: CURRENT_USER.name,
            authorAvatar: CURRENT_USER.avatar,
            content: newReplyContent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setPosts(posts.map(p => p.id === selectedPostId ? { ...p, replies: [...p.replies, newReply] } : p));
        setNewReplyContent('');
    };
    
    const handleSaveReply = (content: string) => {
        if (!editingReply) return;
        setPosts(posts.map(p => ({
            ...p,
            replies: p.replies.map(r => r.id === editingReply.id ? { ...r, content, updatedAt: new Date().toISOString() } : r)
        })));
        setEditingReply(null);
    };

    const handleDeleteReply = (replyId: string) => {
        if (window.confirm("Are you sure you want to delete this reply?")) {
            setPosts(posts.map(p => ({ ...p, replies: p.replies.filter(r => r.id !== replyId) })));
        }
    };

    const selectedPost = useMemo(() => posts.find(p => p.id === selectedPostId), [posts, selectedPostId]);
    
    const filteredPosts = useMemo(() => {
        const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (!searchTerm) return sortedPosts;
        return sortedPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [posts, searchTerm]);


    // --- RENDER LOGIC ---
    if (selectedPost) {
        // --- POST DETAIL VIEW ---
        return (
            <div className="flex flex-col min-h-screen">
                <Header onNavigate={onNavigate} currentPage="community" />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-4xl mx-auto">
                        <button onClick={() => setSelectedPostId(null)} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary mb-6 font-medium">
                            <span className="material-symbols-outlined">arrow_back</span>
                            Back to Forum
                        </button>
                        
                        <div className="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-black/5 dark:border-white/5">
                            <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                            <div className="flex items-center gap-3 mb-4">
                                <AuthorAvatar avatar={selectedPost.authorAvatar === 'AI_AVATAR' ? aiAvatar : selectedPost.authorAvatar} name={selectedPost.authorName} />
                                <div>
                                    <p className="font-semibold">{selectedPost.authorName}</p>
                                    <p className="text-sm text-black/60 dark:text-white/60">
                                        Posted {timeAgo(selectedPost.createdAt)}
                                        {selectedPost.createdAt !== selectedPost.updatedAt && ` · Edited ${timeAgo(selectedPost.updatedAt)}`}
                                    </p>
                                </div>
                                {selectedPost.authorId === CURRENT_USER.id && (
                                    <div className="ml-auto flex items-center gap-2">
                                        <button onClick={() => setEditingPost(selectedPost)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"><span className="material-symbols-outlined">edit</span></button>
                                        <button onClick={() => handleDeletePost(selectedPost.id)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-red-500"><span className="material-symbols-outlined">delete</span></button>
                                    </div>
                                )}
                            </div>
                            <p className="whitespace-pre-wrap leading-relaxed">{selectedPost.content}</p>
                        </div>

                        <h3 className="text-xl font-bold mt-8 mb-4">{selectedPost.replies.length} Replies</h3>
                        <div className="space-y-4">
                            {selectedPost.replies.map(reply => (
                                <div key={reply.id} className="bg-white dark:bg-background-dark/80 p-4 rounded-xl border border-black/5 dark:border-white/5 flex gap-4">
                                    <AuthorAvatar avatar={reply.authorAvatar === 'AI_AVATAR' ? aiAvatar : reply.authorAvatar} name={reply.authorName} />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="font-semibold">{reply.authorName}</span>
                                                <span className="text-sm text-black/60 dark:text-white/60 ml-2">
                                                    Replied {timeAgo(reply.createdAt)}
                                                    {reply.createdAt !== reply.updatedAt && ` · Edited ${timeAgo(reply.updatedAt)}`}
                                                </span>
                                            </div>
                                            {reply.authorId === CURRENT_USER.id && (
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => setEditingReply(reply)} className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"><span className="material-symbols-outlined !text-base">edit</span></button>
                                                    <button onClick={() => handleDeleteReply(reply.id)} className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-red-500"><span className="material-symbols-outlined !text-base">delete</span></button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="mt-1">{reply.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-white dark:bg-background-dark/80 p-4 rounded-xl border border-black/5 dark:border-white/5">
                            <h4 className="font-bold mb-2">Leave a Reply</h4>
                             <textarea value={newReplyContent} onChange={e => setNewReplyContent(e.target.value)} rows={4} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 focus:ring-primary focus:border-primary" placeholder="Write your reply here..."></textarea>
                             <div className="text-right mt-2">
                                <button onClick={handleAddReply} className="bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-primary/90 transition-colors">Submit Reply</button>
                             </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
    
    // --- POST LIST VIEW ---
    return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} currentPage="community" />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold tracking-tight">Community Forum</h2>
            <p className="mt-2 text-lg text-black/60 dark:text-white/60">Connect with others and share your experiences.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50">search</span>
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background-light dark:bg-gray-900 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="Search existing posts" type="text"/>
            </div>
            <button onClick={() => setEditingPost({})} className="w-full md:w-auto flex-shrink-0 bg-primary text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined">add</span>
              <span className="truncate">New Post</span>
            </button>
          </div>
          <div className="space-y-4">
            {filteredPosts.map(post => (
                <div key={post.id} onClick={() => handleSelectPost(post.id)} className="flex items-start gap-4 bg-white dark:bg-background-dark/80 p-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all cursor-pointer">
                    <AuthorAvatar avatar={post.authorAvatar === 'AI_AVATAR' ? aiAvatar : post.authorAvatar} name={post.authorName} />
                    <div className="flex-grow">
                        <p className="font-bold text-lg line-clamp-1">{post.title}</p>
                        <p className="text-sm text-black/60 dark:text-white/60">
                            By {post.authorName} · {timeAgo(post.createdAt)}
                        </p>
                    </div>
                    <div className="flex-shrink-0 text-sm font-medium flex items-center gap-4 text-center">
                       <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-base">forum</span><span>{post.replies.length}</span></div>
                       <div className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-base">visibility</span><span>{post.views}</span></div>
                    </div>
                </div>
            ))}
            {filteredPosts.length === 0 && (
                 <div className="text-center py-16 text-slate-500 dark:text-slate-400">No posts found.</div>
            )}
          </div>
        </div>
      </main>

      {/* Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setEditingPost(null)}>
            <div className="relative w-full max-w-lg bg-background-light dark:bg-background-dark rounded-xl shadow-2xl p-6 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">{editingPost.id ? 'Edit Post' : 'Create New Post'}</h2>
                <form onSubmit={e => { e.preventDefault(); handleSavePost({ title: e.currentTarget.postTitle.value, content: e.currentTarget.postContent.value }); }}>
                    <div className="space-y-4">
                        <input name="postTitle" required defaultValue={editingPost.title || ''} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="Post Title" />
                        <textarea name="postContent" required rows={6} defaultValue={editingPost.content || ''} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="What's on your mind?"></textarea>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={() => setEditingPost(null)} className="px-4 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90">Save Post</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Reply Modal */}
      {editingReply && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setEditingReply(null)}>
            <div className="relative w-full max-w-lg bg-background-light dark:bg-background-dark rounded-xl shadow-2xl p-6 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">Edit Reply</h2>
                <form onSubmit={e => { e.preventDefault(); handleSaveReply(e.currentTarget.replyContent.value); }}>
                    <textarea name="replyContent" required rows={6} defaultValue={editingReply.content || ''} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"></textarea>
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={() => setEditingReply(null)} className="px-4 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90">Save Reply</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
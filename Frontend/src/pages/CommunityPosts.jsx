import { useState } from 'react'
import { Search, User, MapPin, Clock, MessageSquare } from 'lucide-react'
import { mockPosts } from '../data/mockPosts'

function CommunityPosts() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = mockPosts.filter(post =>
    post.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Community Posts</h1>
        <p className="text-gray-600 text-sm md:text-base">Share and view community updates</p>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Search size={18} className="text-primary-blue" />
          Search Posts
        </label>
        <input
          type="text"
          placeholder="Search by user, message, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
        />
      </div>

      {/* Posts Feed */}
      <div className="space-y-5">
        {filteredPosts.length === 0 ? (
          <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg text-center border border-gray-100">
            <MessageSquare size={56} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              {searchTerm ? 'No posts found matching your search.' : 'No posts available yet.'}
            </p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-primary-blue border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-blue to-primary-blue-light rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                    {post.userName.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-primary-blue" />
                      <h3 className="font-bold text-gray-900 text-base md:text-lg">{post.userName}</h3>
                      {post.type && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                          {post.type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">{post.message}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t border-gray-100">
                    <MapPin size={16} className="text-primary-blue" />
                    <span>{post.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommunityPosts

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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Community Posts</h1>
        <p className="text-gray-600 text-sm md:text-base">Share and view community updates</p>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Search size={16} />
          Search Posts
        </label>
        <input
          type="text"
          placeholder="Search by user, message, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
        />
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-md text-center">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No posts found matching your search.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-primary-blue"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-blue to-primary-blue-light rounded-full flex items-center justify-center text-white font-semibold text-lg md:text-xl shadow-md">
                    {post.userName.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-primary-blue" />
                      <h3 className="font-semibold text-gray-800 text-base md:text-lg">{post.userName}</h3>
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

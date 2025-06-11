"use client"

import React, { useState } from 'react'
import { X, Star, Shield, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Review } from '@/lib/reviewData'

interface ReviewPanelProps {
  isOpen: boolean
  onClose: () => void
  reviews: Review[]
  title: string
  subtitle?: string
  showFilters?: {
    sentiment?: boolean
    brand?: boolean
    rating?: boolean
    verified?: boolean
  }
}

export function ReviewPanel({ 
  isOpen, 
  onClose, 
  reviews, 
  title, 
  subtitle,
  showFilters = { sentiment: true, brand: true, rating: true, verified: true }
}: ReviewPanelProps) {
  const [filteredReviews, setFilteredReviews] = useState(reviews)
  const [searchTerm, setSearchTerm] = useState('')
  const [sentimentFilter, setSentimentFilter] = useState<string>('all')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [ratingFilter, setRatingFilter] = useState<string>('all')
  const [verifiedFilter, setVerifiedFilter] = useState<string>('all')

  // Apply filters
  React.useEffect(() => {
    let filtered = [...reviews]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(review => 
              review.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sentiment filter
    if (sentimentFilter !== 'all') {
      filtered = filtered.filter(review => review.sentiment === sentimentFilter)
    }

    // Brand filter
    if (brandFilter !== 'all') {
      filtered = filtered.filter(review => review.brand === brandFilter)
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      if (ratingFilter === 'high') {
        filtered = filtered.filter(review => review.rating >= 4)
      } else if (ratingFilter === 'low') {
        filtered = filtered.filter(review => review.rating <= 2)
      } else if (ratingFilter === 'mid') {
        filtered = filtered.filter(review => review.rating === 3)
      }
    }

    // Verified filter
    if (verifiedFilter !== 'all') {
      filtered = filtered.filter(review => 
        verifiedFilter === 'verified' ? review.verified : !review.verified
      )
    }

    setFilteredReviews(filtered)
  }, [reviews, searchTerm, sentimentFilter, brandFilter, ratingFilter, verifiedFilter])

  // Get unique values for filters
  const uniqueBrands = [...new Set(reviews.map(r => r.brand))].sort()

  // Helper functions
  const getStarRating = (rating: number | string) => {
    if (typeof rating === 'number') {
      return rating;
    }
    if (typeof rating === 'string') {
      const match = rating.match(/(\d+\.?\d*)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-yellow-600'
    }
  }

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800'
      case 'negative': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSentimentFilter('all')
    setBrandFilter('all')
    setRatingFilter('all')
    setVerifiedFilter('all')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                {subtitle && (
                  <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {filteredReviews.length} of {reviews.length} reviews
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="border-b bg-white px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sentiment Filter */}
              {showFilters.sentiment && (
                <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {/* Brand Filter */}
              {showFilters.brand && (
                <Select value={brandFilter} onValueChange={setBrandFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {uniqueBrands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Rating Filter */}
              {showFilters.rating && (
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="high">High (4-5 stars)</SelectItem>
                    <SelectItem value="mid">Medium (3 stars)</SelectItem>
                    <SelectItem value="low">Low (1-2 stars)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Clear Filters */}
            <div className="mt-3 flex justify-between items-center">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
              
              {/* Filter summary */}
              <div className="flex gap-2">
                {sentimentFilter !== 'all' && (
                  <Badge variant="outline" className={getSentimentBadgeColor(sentimentFilter)}>
                    {sentimentFilter}
                  </Badge>
                )}
                {brandFilter !== 'all' && (
                  <Badge variant="outline">{brandFilter}</Badge>
                )}
                {ratingFilter !== 'all' && (
                  <Badge variant="outline">{ratingFilter} rating</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No reviews found matching your filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((review, index) => (
                  <Card key={`${review.id}-${index}`} className="border-l-4 border-l-blue-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base font-medium mb-1">
                            Review #{index + 1}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            {/* Star Rating */}
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                                                      i < getStarRating(review.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1">({review.rating})</span>
                            </div>
                            
                            {/* Verified Badge */}
                            {review.verified && (
                              <div className="flex items-center text-green-600">
                                <Shield className="h-4 w-4 mr-1" />
                                <span className="text-xs">Verified</span>
                              </div>
                            )}
                            
                            {/* Sentiment Badge */}
                            <Badge className={getSentimentBadgeColor(review.sentiment)}>
                              {review.sentiment}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>Anonymous Reviewer</div>
                          <div>{review.date.replace('Reviewed in the United States on ', '')}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">{review.text}</p>
                      
                      <div className="border-t pt-3 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium text-gray-900">{review.brand}</span>
                            <span className="text-gray-500"> - {review.category}</span>
                          </div>
                          <Badge variant="outline">
                            {review.category}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          <strong>Product ID:</strong> {review.productId}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
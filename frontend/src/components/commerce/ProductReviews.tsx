import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    content: "Absolutely love this product! The quality is exceptional and it looks even better in person.",
  },
  {
    id: "2",
    author: "John D.",
    rating: 4,
    date: "1 month ago",
    content: "Great product, well-made and sturdy. Shipping was fast too.",
  },
  {
    id: "3",
    author: "Emily R.",
    rating: 5,
    date: "1 month ago",
    content: "Perfect addition to my home. The craftsmanship is outstanding and it fits perfectly in my space.",
  },
];

export function ProductReviews() {
  const averageRating = 4.7;
  const totalReviews = mockReviews.length;

  return (
    <div className="border-t border-slate-200 pt-12 mt-12">
      <h2 className="text-2xl font-medium mb-6">Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.round(averageRating)
                  ? "text-yellow-400 fill-current"
                  : "text-slate-300"
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium">{averageRating}</span>
        <span className="text-slate-600">({totalReviews} reviews)</span>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{review.author}</span>
              <span className="text-sm text-slate-600">{review.date}</span>
            </div>
            <p className="text-slate-600">{review.content}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium">
        Write a review
      </button>
    </div>
  );
}
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    content: "The quality of these products is exceptional. My living room has never looked better!",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    content: "Fast shipping and excellent customer service. The furniture exceeded my expectations.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    content: "Love the modern aesthetic and sustainable materials. Will definitely order again!",
    date: "3 weeks ago",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-t border-slate-200 py-16 mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-medium text-slate-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Join thousands of happy customers who have transformed their homes with our modern furniture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-stone-50 p-6 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? "text-yellow-400 fill-current"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-900">{testimonial.name}</span>
              <span className="text-slate-500">{testimonial.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 text-yellow-400 fill-current"
              />
            ))}
          </div>
          <span className="font-medium text-lg">4.9</span>
        </div>
        <p className="text-slate-600">Based on 2,451 reviews</p>
      </div>
    </section>
  );
}
import { Star } from "lucide-react"

export const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Marie Ngono",
      avatar: "MN",
      rating: 5,
      date: "May 12, 2023",
      comment:
        "The bus was very comfortable and the driver was professional. I enjoyed my journey from Douala to Yaoundé. The online booking process was simple and straightforward.",
      route: "Douala - Yaoundé",
    },
    {
      id: 2,
      name: "Jean Pierre Kamga",
      avatar: "JK",
      rating: 4,
      date: "April 28, 2023",
      comment:
        "Good service overall. The bus was clean and departed on time. The only issue was the air conditioning which was a bit too cold for my liking.",
      route: "Yaoundé - Bafoussam",
    },
    {
      id: 3,
      name: "Esther Mballa",
      avatar: "EM",
      rating: 5,
      date: "June 3, 2023",
      comment:
        "I've been using TravelEase for my monthly trips to visit family, and I'm always satisfied with their service. The staff is friendly and the buses are well-maintained.",
      route: "Douala - Bamenda",
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Passengers Say</h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.route}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{review.date}</span>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
            View All Reviews
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection


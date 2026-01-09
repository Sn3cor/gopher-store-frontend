import type { Review } from "@/types/review";
import { Star } from "lucide-react";

const ReviewCard = ({ review }: { review: Review }) => {
    return (
        <div className="flex gap-4 rounded-xl border py-4">
            <div className="min-w-0 flex-1 px-4">
                <div className="flex justify-between gap-4 mb-4">
                    <div>
                        <h3 className="mb-1 font-semibold">User: {review.userId}</h3>
                        <p className="text-muted-foreground text-sm"> Review ID: {review.id}</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                            ))}
                            {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                <Star key={i} className="text-muted-foreground size-4" />
                            ))}
                        </div>
                        <span className="text-muted-foreground text-sm whitespace-nowrap">{review.createdAt}</span>
                    </div>
                </div>
                <p>{review.comment}</p>
            </div>
        </div>
    )
}

export default ReviewCard
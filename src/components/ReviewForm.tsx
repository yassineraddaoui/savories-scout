
import React, {useState} from 'react';
import {Star} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast";
import {submitReview} from "@/apis/api.ts";
import {useQueryClient} from "@tanstack/react-query";

interface ReviewFormProps {
    restaurantId: string;
    onReviewSubmit?: () => void;
    className?: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
    restaurantId,
    onReviewSubmit,
    className = ''
}) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {toast} = useToast();
    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (rating === 0) {
            toast({
                title: "Rating required",
                description: "Please select a star rating before submitting",
                variant: "destructive"
            });
            return;
        }

        if (content.trim().length < 10) {
            toast({
                title: "Review too short",
                description: "Please write a more detailed review",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        const reviewData = {
            content: content,
            rating: rating,
            title: title.trim() || undefined,
            photoIds: [], // Add any photo IDs if applicable
        };

        try {
            const response = await submitReview(restaurantId, reviewData);
            console.log("Review submission response:", response);

            if (!response.data) {
                throw new Error(response.error || 'Failed to submit the review');
            }
            
            // Reset form
            setRating(0);
            setTitle('');
            setContent('');

            // Show success toast
            toast({
                title: "Review submitted!",
                description: "Thank you for sharing your experience",
            });

            // Invalidate queries to refetch latest data
            queryClient.invalidateQueries({queryKey: ['reviews', restaurantId]});
            queryClient.invalidateQueries({queryKey: ['restaurant', restaurantId]});

            // Call the callback if provided
            if (onReviewSubmit) {
                onReviewSubmit();
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm border p-5 ${className}`}>
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <div className="flex items-center mb-1">
                        <Label className="mr-2 text-gray-700">Your Rating</Label>
                        <span className="text-red-500">*</span>
                    </div>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="p-1 focus:outline-none"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <Star
                                    className={`h-7 w-7 ${
                                        (hoverRating !== 0 ? star <= hoverRating : star <= rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <Label htmlFor="review-title" className="block mb-1 text-gray-700">
                        Review Title
                    </Label>
                    <Input
                        id="review-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Summarize your experience"
                        className="w-full"
                    />
                </div>

                <div className="mb-4">
                    <div className="flex items-center mb-1">
                        <Label htmlFor="review-content" className="block text-gray-700">
                            Your Review
                        </Label>
                        <span className="text-red-500 ml-1">*</span>
                    </div>
                    <Textarea
                        id="review-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell us about your dining experience, the food, service, ambiance, etc."
                        className="w-full min-h-[150px]"
                    />
                </div>

                <Button 
                    type="submit" 
                    className="bg-food-500 hover:bg-food-600 mt-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
            </form>
        </div>
    );
};

export default ReviewForm;

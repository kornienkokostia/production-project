import { ArticleDetailsCommentsSchema } from "./ArticleDetailsCommentsSchema";
import { articleDetailsPageRecommendationsSchema } from "./ArticleDetailsPageRecommendationsSchema";

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema
  recommendations: articleDetailsPageRecommendationsSchema
}
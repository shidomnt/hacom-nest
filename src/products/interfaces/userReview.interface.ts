export interface UserReview {
  user: string;

  rate: number;

  content: string;

  reply: Array<Omit<UserReview, 'rate'>>;
}

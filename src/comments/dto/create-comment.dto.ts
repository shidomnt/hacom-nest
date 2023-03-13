export class CreateCommentDto {
  product?: string;

  content: string;

  replyTo?: string | undefined;
}

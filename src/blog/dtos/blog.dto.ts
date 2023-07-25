export class CreateBlogDTO {
  title: string;
  description: string;
  author: string;
  category: string;
}

export class BlogIdDTO {
  blogId: string;
}

export class UpdateBlogDTO {
  title: string;
  description?: string;
  author: string;
  category: string;
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
    const files = fs.readdirSync(contentDirectory);
    return files
        .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx?$/, ''));
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        content,
    };
}

// Get all posts sorted by date
export function getAllPosts(): BlogPost[] {
    const slugs = getAllPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .sort((a, b) => (a.date > b.date ? -1 : 1)); // Sort by date descending

    return posts;
}
import { defineCollection, z } from 'astro:content';

const base = z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.string().optional(),
    version: z.string().optional(),
    status: z.enum(['draft','in-progress','published']).default('published'),
    tags: z.array(z.string()).default([]),
    assets: z.array(z.string()).optional(),
});

export const collections = {
    projects: defineCollection({ type: 'content', schema: base }),
    guides: defineCollection({ type: 'content', schema: base }),
    releases: defineCollection({ type: 'content', schema: base.extend({
        checksum: z.string().optional(),
        pdf: z.string().optional(),
    })}),
};

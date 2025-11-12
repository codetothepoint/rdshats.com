type Head = {
    title: string;
    description?: string;
    url: string;
    image?: string;
    type?: 'website' | 'article';
    locale?: string; // e.g., 'en-US'
    updated?: string; // ISO
    published?: string; // ISO
    robots?: string; // e.g., 'index,follow'
};

export function metaData(head: Head) {
    return {
        title: head.title,
        canonical: head.url,
        description: head.description ?? "",
        image: head.image,
        type: head.type ?? "website",
        locale: head.locale ?? "en",
        robots: head.robots ?? "index,follow",
        jsonLd: head.type === "article" ? jsonLdArticle(head) : null,
    };
}

function jsonLdArticle(head: Head) {
    if (head.type !== 'article') return '';
    const data = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: head.title,
        description: head.description ?? '',
        datePublished: head.published ?? undefined,
        dateModified: head.updated ?? head.published ?? undefined,
        inLanguage: head.locale ?? 'en-us',
        mainEntityOfPage: head.url,
    };
    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

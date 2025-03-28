import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WixClient = createClient({
    modules: { items },
    auth: new OAuthStrategy({
        clientId: import.meta.env.WIX_CLIENT_ID,
    }),
});

export default async function fetchArticles({
    count=0,
    featured=false,
    tags = [],
} = {}
    ) {
    let query = WixClient.items.query('Articles');
    
    if (count) {
        query = query.limit(count);
    }

    // TODO: implement this in the db
    if (tags.length) {
        query = query.in('tags', tags);
    }

    if (featured) {
        query = query.eq('featured', true)
    }

    const articles = await query.find()
    return articles.items;
}
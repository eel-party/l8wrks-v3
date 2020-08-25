class tags {
    data() {
        return {
            title: 'tags',
            layout: 'layout',
            pagination: {
                data: 'collections',
                size: 10000,
                alias: 'tags',
                filter: ['all', 'nav', 'item', 'group', 'book', 'show','tagList'],
            },
            permalink: '/tags/',
        };
    }

    render({ tags, collections }) {
        let tagsList = [];
        tags.forEach((tag) => {
            tagsList.push(`
      <li>
          <div class="inline-flex mr-3">
            <svg class="h-4 w-4 mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M0 10V2l2-2h8l10 10-10 10L0 10zm4.5-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>
            <a class="item-tag h-4" href="/tags/${this.slug(tag)}/">${tag}</a>: ${
        collections[tag].length
      }
          ${tag.description ? tag.description : ''}
        </p>
        </div>
        
          
      </li>
    `);
        });

        return `
    <ol class="inline-flex mr-3">
      ${tagsList.join('')}
    </ol>
  `;
    }
}
module.exports = tags;
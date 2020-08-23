class Toast {
  data() {
    return {
      title: 'Toast',
      layout: 'layout',
      pagination: {
        data: 'collections',
        size: 10000,
        alias: 'toast',
        filter: ['all', 'nav', 'book','item', 'group', 'tagList'],
      },
      permalink: '/toast/',
    };
  }

  render({ toast, collections }) {
    let tagsList = [];
    toast.forEach((tag) => {
      tagsList.push(`
      <li>
        <p>
          <a href="/tags/${this.slug(tag)}/">${tag}</a>: ${
        collections[tag].length
      }
          ${tag.description ? tag.description : ''}
        </p>
      </li>
    `);
    });

    return `
    <ol>
      ${tagsList.join('')}
    </ol>
  `;
  }
}
module.exports = Toast;
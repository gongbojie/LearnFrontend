import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing Post");
  }

  async getHtml() {
    console.log(this.params.id);
    return `
      <h1>Viewing Post</h1>
      <p>
        lomore
      </p>
      <p>
        <a href="/posts" data-link>View recent posts</a>
      </p>
    `;
  }
}
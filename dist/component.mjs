(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".component-selector_tool__selector_wrapper select{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:14px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.component-selector_tool__selector_wrapper{margin-bottom:1em}.component-selector_tool__preview_wrapper img{width:100%}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
const o = '<img width="20" height="20" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K">';
class r {
  constructor({ data: e, config: t, api: n }) {
    if (this.api = n, this.config = t, !t.components || !t.components.length)
      throw new Error("You must define one component at least");
    this.nodes = {
      container: null,
      //
      selector: null,
      selector_wrapper: null,
      options: [],
      // preview
      preview_wrapper: null,
      preview: null
    }, this._data = null, this.data = e;
  }
  static get toolbox() {
    return {
      title: "Component selector",
      icon: o
    };
  }
  /**
   * Create element with styles
   * @param {string} tag
   * @param {Array<string>} classes
   * @param {Object} attrs
   */
  makeElement(e, t, n) {
    const i = document.createElement(e);
    if (i.classList.add(...t), n)
      for (const s in n)
        i.setAttribute(s, n[s]);
    return i;
  }
  /**
   * Create class string with tool prefix
   * @param {string} cls
   */
  makeClass(e) {
    return `component-selector_tool__${e}`;
  }
  render() {
    return this.nodes.container = this.makeElement("div", [
      this.makeClass("container"),
      "cdx-block"
    ]), this.nodes.container.appendChild(this.makeSelector()), this.nodes.container;
  }
  set data(e) {
    this._data = Object.assign({}, DEFAULT_DATA, e), setTimeout(() => {
      this.validate() && this.renderPreview();
    }, 0);
  }
  get data() {
    return this._data;
  }
  save() {
    return this.data;
  }
  validate() {
    return !!this.data.component;
  }
  getComponentByName(e) {
    return this.config.components.find((t) => t.name === e);
  }
  changeComponent(e) {
    const t = this.getComponentByName(e.value);
    this.data = {
      component: t.name,
      props: t.props || {}
    };
  }
  /**
   * Create selector element + options and setup listeners
   */
  makeSelector() {
    this.nodes.selector_wrapper = this.makeElement("div", [
      this.makeClass("selector_wrapper")
    ]);
    const e = this.nodes.selector = this.makeElement("select", [
      this.makeClass("selector")
    ]);
    this.nodes.selector_wrapper.appendChild(e);
    for (let t of this.config.components) {
      const n = this.makeElement("option", [this.makeClass("option")], {
        value: t.name
      });
      n.innerText = t.alias || t.name, this.nodes.options.push(n), e.appendChild(n);
    }
    return e.value = this.data.component || this.config.components[0].name, e.addEventListener(
      "change",
      (t) => this.changeComponent(t.target)
    ), this.changeComponent(e), this.nodes.selector_wrapper;
  }
  /**
   * Make wrapper for preview
   */
  makePreviewWrapper() {
    return this.nodes.preview_wrapper = this.makeElement("div", [
      this.makeClass("preview_wrapper")
    ]), this.nodes.preview_wrapper;
  }
  /**
   * Render preview element
   * @param {string} preview
   */
  renderPreview() {
    this.nodes.preview || (this.nodes.container.appendChild(this.makePreviewWrapper()), this.nodes.preview = this.makeElement("img", [this.makeClass("preveiw")]), this.nodes.preview_wrapper.appendChild(this.nodes.preview)), this.nodes.preview.src = this.getComponentByName(
      this.data.component
    ).preview;
  }
}
export {
  r as default
};
